import { catalogEntries } from "@/data/catalogs";
import CatalogViewer from "@/components/sections/CatalogViewer";

const uniqueSlugs = [...new Set(catalogEntries.map((c) => c.slug))];

export function generateStaticParams() {
  return uniqueSlugs.map((slug) => ({ slug }));
}

export default function CatalogViewPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CatalogViewer slug={params.slug} />;
}
