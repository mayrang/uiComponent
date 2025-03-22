export default function ItemPage({
  params: { items },
}: {
  params: { items: string[] };
}) {
  const path = ["", ...items].join("/");

  return <div>render {path}</div>;
}
