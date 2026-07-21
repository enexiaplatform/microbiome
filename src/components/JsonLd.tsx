type JsonLdData = Record<string, unknown> | Array<Record<string, unknown>>;

/** Renders a JSON-LD script tag. Server component. */
export default function JsonLd({ data }: { data: JsonLdData }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
