export function JsonLd({ value }: { value: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }}
    />
  )
}
