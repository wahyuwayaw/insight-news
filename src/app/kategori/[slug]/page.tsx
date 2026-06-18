import KategoriPageClient from "@/components/KategoriPageClient";
import { categories } from "@/data/articles";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <KategoriPageClient slug={slug} />;
}
