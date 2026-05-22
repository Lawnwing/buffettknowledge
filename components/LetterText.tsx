'use client'

import { useEffect, useRef } from 'react'

interface LinkEntity {
  name: string
  slug: string
  type: 'concepts' | 'companies' | 'people'
}

interface LetterTextProps {
  html: string
  entities?: LinkEntity[]
  className?: string
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Renders letter fullText HTML and applies keyword auto-linking CLIENT-SIDE ONLY.
 * This avoids SSR/hydration mismatch that occurs when autoLinkHtml runs server-side.
 */
export default function LetterText({ html, entities, className }: LetterTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  // First render: inject raw HTML (matches SSR output exactly — no hydration mismatch)
  // After mount: walk text nodes and inject links via DOM manipulation
  useEffect(() => {
    if (!ref.current || !entities || entities.length === 0) return

    const sorted = [...entities].sort((a, b) => b.name.length - a.name.length)

    // Walk all text nodes, skip those already inside <a>
    const walker = document.createTreeWalker(
      ref.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          // Skip if inside an anchor
          let parent = node.parentElement
          while (parent && parent !== ref.current) {
            if (parent.tagName === 'A') return NodeFilter.FILTER_REJECT
            parent = parent.parentElement
          }
          return NodeFilter.FILTER_ACCEPT
        },
      }
    )

    const textNodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text)
    }

    for (const textNode of textNodes) {
      let current = textNode.textContent || ''
      let changed = false
      let fragment: DocumentFragment | null = null

      for (const entity of sorted) {
        const pattern = new RegExp(
          `(?<![\\w\\u4e00-\\u9fa5-])(${escapeRegExp(entity.name)})(?![\\w\\u4e00-\\u9fa5-])`,
          'gi'
        )
        if (!pattern.test(current)) continue
        changed = true

        // Build a fragment by splitting on matches
        if (!fragment) {
          fragment = document.createDocumentFragment()
          // Re-test with a fresh regex to get indices
          pattern.lastIndex = 0
        }
        const parts = current.split(
          new RegExp(`(?<![\\w\\u4e00-\\u9fa5-])(${escapeRegExp(entity.name)})(?![\\w\\u4e00-\\u9fa5-])`, 'gi')
        )
        // `split` with capture group interleaves: [before, match, before, match, ...]
        // We rebuild current as a plain string first, then replace via DOM after all entities
        // Simpler: do a single-pass DOM replacement at the end
        break // break and do DOM replacement below
      }

      if (!changed) continue

      // Build replacement HTML string for this text node
      let text = textNode.textContent || ''
      for (const entity of sorted) {
        const pattern = new RegExp(
          `(?<![\\w\\u4e00-\\u9fa5-])(${escapeRegExp(entity.name)})(?![\\w\\u4e00-\\u9fa5-])`,
          'gi'
        )
        text = text.replace(
          pattern,
          `<a href="/${entity.type}/${entity.slug}" class="inline-link">$1</a>`
        )
      }

      // Replace text node with a span containing the linked HTML
      const span = document.createElement('span')
      span.innerHTML = text
      textNode.parentNode?.replaceChild(span, textNode)
    }
  }, [html, entities])

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
