"use client";
import { useArticles, FeaturedHero, ArticleCard, ArticleListItem } from "@/lib/api";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const { articles, loading } = useArticles();
  const featured = articles.find((a) => a.status === "published") || articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin w-8 h-8 border-3 border-teal-brand border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Memuat berita...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📰</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h2>
          <p className="text-gray-500 text-sm">Artikel akan muncul di sini setelah admin mempublikasikan berita.</p>
        </div>
      )}

      {/* Featured Hero */}
      {!loading && featured && <FeaturedHero article={featured} />}

      {/* Content */}
      {!loading && articles.length > 0 && (
        <>
          {/* Section header */}
          <div className="section-divider mt-8 sm:mt-10 mb-5">
            <h2>Berita Terkini</h2>
            <div className="line"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
            {/* Articles */}
            <div className="lg:col-span-2 space-y-5">
              {/* Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.slice(0, 4).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>

              {/* List — only show if more than 4 articles */}
              {rest.length > 4 && (
                <>
                  <div className="section-divider mt-6">
                    <h2>Berita Lainnya</h2>
                    <div className="line"></div>
                  </div>
                  <div className="space-y-3">
                    {rest.slice(4).map((a) => (
                      <ArticleListItem key={a.id} article={a} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar — desktop only */}
            <div className="hidden lg:block">
              <Sidebar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
