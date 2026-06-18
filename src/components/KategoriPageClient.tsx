"use client";
import { useArticles, ArticleCard } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const catNames: Record<string, string> = {
  nasional: "🇮🇩 Nasional",
  hukum: "⚖️ Hukum",
  ekonomi: "💰 Ekonomi",
  politik: "🏛️ Politik",
  olahraga: "⚽ Olahraga",
  kesehatan: "🏥 Kesehatan",
  teknologi: "💻 Teknologi",
  hiburan: "🎬 Hiburan",
};

export default function KategoriPageClient({ slug }: { slug: string }) {
  const { articles, loading } = useArticles(slug);
  const catName = catNames[slug] || slug;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-5">
        <Link href="/" className="hover:text-teal-brand transition">Beranda</Link>
        <span>›</span>
        <span className="text-gray-500">{catName}</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-extrabold text-dark">{catName}</h1>
        <span className="text-sm text-gray-400 ml-auto">{articles.length} artikel</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="lg:col-span-2">
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-3 border-teal-brand border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
          )}
          {!loading && articles.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-400">Belum ada artikel di kategori ini.</p>
            </div>
          )}
          {!loading && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          )}
        </div>
        <div className="hidden lg:block"><Sidebar /></div>
      </div>
    </div>
  );
}
