"use client";
import { useArticle, useArticles, ArticleListItem } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState, useEffect } from "react";

const catColors: Record<string, string> = {
  nasional: "bg-teal-600",
  hukum: "bg-red-500",
  ekonomi: "bg-emerald-500",
  politik: "bg-violet-500",
  olahraga: "bg-orange-500",
  kesehatan: "bg-pink-500",
  teknologi: "bg-blue-500",
  hiburan: "bg-amber-500",
};

function textToHtml(text: string): string {
  if (!text) return "";
  // Already HTML
  if (text.includes('<p>') || text.includes('<br')) return text;
  // Convert plain text to HTML paragraphs
  return text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
    .join('');
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr.replace(" ", "T"));
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArtikelPageClient({ slug: propSlug }: { slug: string }) {
  const [slug, setSlug] = useState(propSlug);
  
  useEffect(() => {
    // Read slug from URL if prop is placeholder (static export)
    if (propSlug === '__placeholder__' || !propSlug) {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if (pathParts[0] === 'artikel' && pathParts[1]) {
        setSlug(pathParts[1]);
      }
    }
    // Scroll to top on article load
    window.scrollTo(0, 0);
  }, [propSlug]);
  
  const { article, loading } = useArticle(slug);
  const { articles: allArticles } = useArticles();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-3 border-teal-brand border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400 text-sm">Memuat artikel...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😢</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Artikel Tidak Ditemukan</h2>
        <p className="text-gray-500 text-sm mb-4">Artikel yang kamu cari tidak tersedia atau sudah dihapus.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-teal-brand text-white text-sm rounded-lg hover:bg-teal-brand-dark transition">← Kembali ke Beranda</Link>
      </div>
    );
  }

  const related = allArticles
    .filter((a) => a.category_slug === article.category_slug && a.id !== article.id)
    .slice(0, 3);
  const contentHtml = textToHtml(article.content);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-5">
        <Link href="/" className="hover:text-teal-brand transition">Beranda</Link>
        <span>›</span>
        {article.category_name && (
          <>
            <span className="text-gray-500">{article.category_name}</span>
            <span>›</span>
          </>
        )}
        <span className="text-gray-500 line-clamp-1">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Main article */}
        <article className="lg:col-span-2 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Featured image */}
            {article.image ? (
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-56 sm:h-64 md:h-80 lg:h-[380px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-56 sm:h-64 md:h-80 lg:h-[380px] bg-gradient-to-br from-teal-brand to-dark flex items-center justify-center text-6xl">📰</div>
            )}
            
            {/* Article body */}
            <div className="p-5 sm:p-6 md:p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {article.category_name && (
                  <span className={`px-2.5 py-1 rounded text-[10px] font-semibold text-white uppercase tracking-wide ${catColors[article.category_slug] || "bg-teal-600"}`}>
                    {article.category_name}
                  </span>
                )}
                <span className="text-[11px] text-gray-400">{formatDate(article.created_at)}</span>
                {article.views > 0 && (
                  <span className="text-[11px] text-gray-400">👁 {article.views} views</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-[28px] font-extrabold text-gray-900 leading-tight mb-4 md:mb-5">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-gray-500 text-sm leading-relaxed mb-5 italic border-l-2 border-teal-brand pl-4">
                  {article.excerpt}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pb-5 mb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-brand to-orange-brand flex items-center justify-center text-white font-bold text-sm">
                  {(article.author_name || "A")[0]}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900">{article.author_name || "Admin"}</p>
                  <p className="text-[11px] text-gray-400">Jurnalis</p>
                </div>
              </div>

              {/* Content */}
              {contentHtml ? (
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: contentHtml }} 
                />
              ) : article.content ? (
                // Fallback: render as plain text if textToHtml returned empty
                <div className="article-content">
                  {article.content.split('\n\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">Konten artikel tidak tersedia.</p>
              )}

              {/* Tags */}
              {article.tags && article.tags.trim() && (
                <div className="flex flex-wrap gap-2 mt-8 pt-5 border-t border-gray-100">
                  {article.tags.split(",").filter(t => t.trim()).map((tag) => (
                    <span key={tag.trim()} className="px-3 py-1 bg-gray-50 text-[11px] text-gray-500 rounded-full border border-gray-200">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-8">
              <div className="section-divider">
                <h2>Artikel Terkait</h2>
                <div className="line"></div>
              </div>
              <div className="space-y-3">
                {related.map((a) => <ArticleListItem key={a.id} article={a} />)}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar — desktop only */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
