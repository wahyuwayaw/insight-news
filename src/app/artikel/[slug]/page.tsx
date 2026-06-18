import ArtikelPageClient from "@/components/ArtikelPageClient";

export function generateStaticParams() {
  return [{ slug: "__placeholder__" }];
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArtikelPageClient slug={slug} />;
}
