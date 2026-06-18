"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/insight/api.php/api";

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

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_name: string;
  category_slug: string;
  category_icon: string;
  category_color: string;
  author_name: string;
  image: string;
  tags: string;
  status: string;
  views: number;
  created_at: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr.replace(" ", "T"));
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function CatBadge({ slug, name }: { slug: string; name: string }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-semibold text-white uppercase tracking-wide ${catColors[slug] || "bg-teal-600"}`}>
      {name}
    </span>
  );
}

export function FeaturedHero({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}/`} className="block group relative rounded-2xl overflow-hidden h-[320px] sm:h-[380px] md:h-[450px]">
      {article.image ? (
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-teal-brand to-dark"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
        <CatBadge slug={article.category_slug} name={article.category_name} />
        <h1 className="text-white text-lg sm:text-xl md:text-3xl font-extrabold leading-tight mt-2 sm:mt-3 mb-2 sm:mb-3 group-hover:text-orange-brand-light transition-colors max-w-3xl">
          {article.title}
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed max-w-2xl line-clamp-2 hidden sm:block">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-3 sm:mt-4">
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-400">
            <span>✍️ {article.author_name}</span>
            <span className="hidden sm:inline">📅 {formatDate(article.created_at)}</span>
          </div>
          <span className="text-xs text-orange-brand font-medium group-hover:translate-x-1 transition-transform">Baca →</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}/`} className="block group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-44 overflow-hidden">
        {article.image ? (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl">📰</div>
        )}
        <div className="absolute top-3 left-3">
          <CatBadge slug={article.category_slug} name={article.category_name} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-teal-brand transition-colors line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50">
          <span>{article.author_name}</span>
          <span>{formatDate(article.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}/`} className="flex gap-4 group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative w-28 md:w-36 shrink-0 overflow-hidden">
        {article.image ? (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl">📰</div>
        )}
      </div>
      <div className="py-4 pr-5 flex flex-col justify-center flex-1 min-w-0">
        <CatBadge slug={article.category_slug} name={article.category_name} />
        <h3 className="font-semibold text-sm text-gray-900 leading-snug group-hover:text-teal-brand transition-colors line-clamp-2 mb-1 mt-1.5">
          {article.title}
        </h3>
        <span className="text-[11px] text-gray-400">{formatDate(article.created_at)}</span>
      </div>
    </Link>
  );
}

// Fetch hook
export function useArticles(category?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    
    fetch(`${API_BASE}/articles?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setArticles(data.articles);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  return { articles, loading };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${API_BASE}/articles/slug/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setArticle(data.article);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return { article, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  return categories;
}
