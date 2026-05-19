'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { GraphData, GraphNode, GraphEdge } from '@/lib/graphData'

// ── Types ──────────────────────────────────────────────────────────────

interface SimNode extends GraphNode {
  x: number
  y: number
  vx: number
  vy: number
  fx?: number | null
  fy?: number | null
}

interface SimEdge {
  source: SimNode
  target: SimNode
  strength: number
}

// ── Color & size constants ─────────────────────────────────────────────

const NODE_COLORS: Record<string, string> = {
  letter:  '#B45309',
  concept: '#2D6A4F',
  company: '#52525B',
  person:  '#1C2333',
}

const NODE_BG: Record<string, string> = {
  letter:  '#FEF3C7',
  concept: '#E9F5EF',
  company: '#F4F4F5',
  person:  '#E8ECF4',
}

function nodeRadius(weight: number): number {
  return 8 + weight * 3.5
}

// ── Force simulation (simple Verlet) ──────────────────────────────────

function runSimulation(
  nodes: SimNode[],
  edges: SimEdge[],
  width: number,
  height: number,
  iterations = 1,
) {
  const alpha = 0.15
  const repulsion = 3500
  const linkStrength = 0.12
  const centerX = width / 2
  const centerY = height / 2

  for (let iter = 0; iter < iterations; iter++) {
    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const dx = b.x - a.x || 0.01
        const dy = b.y - a.y || 0.01
        const dist2 = dx * dx + dy * dy
        const dist = Math.sqrt(dist2)
        const minDist = nodeRadius(a.weight) + nodeRadius(b.weight) + 20
        if (dist < 1) continue
        const force = repulsion / dist2
        const nx = (dx / dist) * force * alpha
        const ny = (dy / dist) * force * alpha
        if (!a.fx) { a.vx -= nx; a.vy -= ny }
        if (!b.fx) { b.vx += nx; b.vy += ny }

        // Collision avoidance
        if (dist < minDist) {
          const overlap = (minDist - dist) / 2
          if (!a.fx) { a.x -= (dx / dist) * overlap * 0.5; a.y -= (dy / dist) * overlap * 0.5 }
          if (!b.fx) { b.x += (dx / dist) * overlap * 0.5; b.y += (dy / dist) * overlap * 0.5 }
        }
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const a = edge.source
      const b = edge.target
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const idealDist = 120
      const delta = dist - idealDist
      const f = delta * linkStrength * edge.strength * alpha
      const nx = (dx / dist) * f
      const ny = (dy / dist) * f
      if (!a.fx) { a.vx += nx; a.vy += ny }
      if (!b.fx) { b.vx -= nx; b.vy -= ny }
    }

    // Centering gravity
    for (const node of nodes) {
      if (node.fx) { node.x = node.fx; node.vy *= 0.4; continue }
      if (node.fy) { node.y = node.fy; node.vx *= 0.4; continue }
      node.vx += (centerX - node.x) * 0.008 * alpha
      node.vy += (centerY - node.y) * 0.008 * alpha
      node.vx *= 0.85
      node.vy *= 0.85
      node.x += node.vx
      node.y += node.vy
    }
  }
}

// ── Main Component ─────────────────────────────────────────────────────

interface ForceGraphProps {
  data: GraphData
  width?: number
  height?: number
  className?: string
}

export function ForceGraph({ data, width = 900, height = 580, className = '' }: ForceGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simNodes = useRef<SimNode[]>([])
  const simEdges = useRef<SimEdge[]>([])
  const animRef = useRef<number>(0)
  const dragNode = useRef<SimNode | null>(null)
  const panOffset = useRef({ x: 0, y: 0 })
  const panStart = useRef<{ x: number; y: number } | null>(null)
  const scale = useRef(1)
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: SimNode } | null>(null)
  const router = useRouter()

  // ── Filter state ─────────────────────────────────────────────────────
  const [activeTypes, setActiveTypes] = useState<Set<string>>(
    new Set(['letter', 'concept', 'company', 'person'])
  )

  const toggleType = (type: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) { if (next.size > 1) next.delete(type) }
      else next.add(type)
      return next
    })
  }

  // ── Initialize simulation ─────────────────────────────────────────────
  useEffect(() => {
    const cx = width / 2
    const cy = height / 2

    simNodes.current = data.nodes
      .filter((n) => activeTypes.has(n.type))
      .map((n) => ({
        ...n,
        x: cx + (Math.random() - 0.5) * 300,
        y: cy + (Math.random() - 0.5) * 300,
        vx: 0,
        vy: 0,
      }))

    const nodeMap = new Map(simNodes.current.map((n) => [n.id, n]))

    simEdges.current = data.edges
      .map((e) => {
        const s = nodeMap.get(e.source)
        const t = nodeMap.get(e.target)
        if (!s || !t) return null
        return { source: s, target: t, strength: e.strength }
      })
      .filter(Boolean) as SimEdge[]

    // Warm-up iterations
    for (let i = 0; i < 200; i++) {
      runSimulation(simNodes.current, simEdges.current, width, height, 1)
    }
  }, [data, width, height, activeTypes])

  // ── Drawing ────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(panOffset.current.x, panOffset.current.y)
    ctx.scale(scale.current, scale.current)

    // Draw edges
    for (const edge of simEdges.current) {
      const { source: s, target: t } = edge
      const alpha = 0.15 + edge.strength * 0.25
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(t.x, t.y)
      ctx.strokeStyle = `rgba(100, 116, 139, ${alpha})`
      ctx.lineWidth = edge.strength > 0.7 ? 1.5 : 1
      ctx.stroke()
    }

    // Draw nodes
    for (const node of simNodes.current) {
      const r = nodeRadius(node.weight)
      const color = NODE_COLORS[node.type]
      const bg = NODE_BG[node.type]
      const isHovered = hoveredNode?.id === node.id

      // Shadow for hovered
      if (isHovered) {
        ctx.shadowColor = color
        ctx.shadowBlur = 14
      }

      // Circle fill
      ctx.beginPath()
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = isHovered ? 2.5 : 1.5
      ctx.stroke()
      ctx.shadowBlur = 0

      // Label (only for concepts/people/companies; letters show the year number inside)
      if (node.type === 'letter') {
        ctx.fillStyle = color
        ctx.font = `bold ${r < 14 ? 9 : 10}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(node.year ?? node.label).slice(2), node.x, node.y)
      } else if (r > 13 || isHovered) {
        const maxChars = Math.floor(r * 1.6)
        const label = node.label.length > maxChars
          ? node.label.slice(0, maxChars - 1) + '…'
          : node.label
        ctx.fillStyle = color
        ctx.font = `${isHovered ? 600 : 500} 10px system-ui, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText(label, node.x, node.y + r + 3)
      }
    }

    ctx.restore()
  }, [hoveredNode])

  // ── Animation loop ─────────────────────────────────────────────────────
  useEffect(() => {
    let tick = 0
    const loop = () => {
      // Slow down after warm-up
      if (tick < 600 || tick % 2 === 0) {
        runSimulation(simNodes.current, simEdges.current, width, height, 1)
      }
      tick++
      draw()
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw, width, height])

  // ── Hit test ───────────────────────────────────────────────────────────
  const hitTest = useCallback((clientX: number, clientY: number): SimNode | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const x = (clientX - rect.left - panOffset.current.x) / scale.current
    const y = (clientY - rect.top - panOffset.current.y) / scale.current
    for (const node of [...simNodes.current].reverse()) {
      const r = nodeRadius(node.weight)
      const dx = x - node.x
      const dy = y - node.y
      if (dx * dx + dy * dy <= r * r) return node
    }
    return null
  }, [])

  // ── Mouse events ───────────────────────────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragNode.current) {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      dragNode.current.fx = (e.clientX - rect.left - panOffset.current.x) / scale.current
      dragNode.current.fy = (e.clientY - rect.top - panOffset.current.y) / scale.current
      return
    }
    if (panStart.current) {
      panOffset.current.x += e.clientX - panStart.current.x
      panOffset.current.y += e.clientY - panStart.current.y
      panStart.current = { x: e.clientX, y: e.clientY }
      return
    }
    const hit = hitTest(e.clientX, e.clientY)
    setHoveredNode(hit)
    if (hit) {
      const canvas = canvasRef.current!
      const rect = canvas.getBoundingClientRect()
      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, node: hit })
    } else {
      setTooltip(null)
    }
  }, [hitTest])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const hit = hitTest(e.clientX, e.clientY)
    if (hit) {
      dragNode.current = hit
    } else {
      panStart.current = { x: e.clientX, y: e.clientY }
    }
  }, [hitTest])

  const onMouseUp = useCallback(() => {
    if (dragNode.current) {
      dragNode.current.fx = null
      dragNode.current.fy = null
      dragNode.current = null
    }
    panStart.current = null
  }, [])

  const onClick = useCallback((e: React.MouseEvent) => {
    const hit = hitTest(e.clientX, e.clientY)
    if (hit) router.push(hit.href)
  }, [hitTest, router])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY * 0.001
    scale.current = Math.max(0.4, Math.min(3, scale.current + delta))
  }, [])

  const cursor = hoveredNode ? 'pointer' : panStart.current ? 'grabbing' : 'grab'

  return (
    <div className={`relative select-none ${className}`}>
      {/* Legend / filter pills */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
        {([
          { type: 'letter',  label: 'Letters' },
          { type: 'concept', label: 'Concepts' },
          { type: 'company', label: 'Companies' },
          { type: 'person',  label: 'People' },
        ] as const).map(({ type, label }) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
            style={{
              backgroundColor: activeTypes.has(type) ? NODE_BG[type] : '#F4F4F5',
              color: activeTypes.has(type) ? NODE_COLORS[type] : '#A1A1AA',
              borderColor: activeTypes.has(type) ? NODE_COLORS[type] : '#E4E4E7',
              opacity: activeTypes.has(type) ? 1 : 0.5,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeTypes.has(type) ? NODE_COLORS[type] : '#D4D4D8' }}
            />
            {label}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ cursor, touchAction: 'none' }}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={onClick}
        onWheel={onWheel}
        className="rounded-xl w-full"
      />

      {/* Hint */}
      <div className="absolute bottom-3 right-3 text-xs" style={{ color: '#A1A1AA' }}>
        Drag nodes · Scroll to zoom · Click to open
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-20 px-3 py-2 rounded-lg text-xs shadow-lg max-w-[180px]"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 8,
            backgroundColor: '#1C2333',
            color: '#E8ECF4',
            border: `1px solid ${NODE_COLORS[tooltip.node.type]}`,
          }}
        >
          <div className="font-medium">{tooltip.node.label}</div>
          <div className="mt-0.5 capitalize" style={{ color: '#8B9BB4' }}>
            {tooltip.node.type}
            {tooltip.node.year ? ` · ${tooltip.node.year}` : ''}
          </div>
        </div>
      )}
    </div>
  )
}
