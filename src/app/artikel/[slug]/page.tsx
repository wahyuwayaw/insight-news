import ArtikelPageClient from "@/components/ArtikelPageClient";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://20.205.126.179/insight/api.php/api/articles", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success && data.articles) {
      return data.articles.map((a: { slug: string }) => ({ slug: a.slug }));
    }
  } catch (e) {
    console.error("Failed to fetch articles for static params:", e);
  }
  // Fallback: at least generate placeholder
  return [{ slug: "__placeholder__" }];
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArtikelPageClient slug={slug} />;
}
