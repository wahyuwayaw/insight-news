import Link from "next/link";
import { Article } from "@/data/articles";

const catColors: Record<string, string> = {
  nasional: "bg-teal-brand",
  hukum: "bg-red-500",
  ekonomi: "bg-emerald-500",
  politik: "bg-violet-500",
  olahraga: "bg-orange-500",
  kesehatan: "bg-pink-500",
  teknologi: "bg-blue-500",
  hiburan: "bg-amber-500",
};

export function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}/`} className="block group relative rounded-2xl overflow-hidden h-[400px] md:h-[450px]">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
      />
      {/* Strong gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-semibold text-white mb-3 tracking-wide uppercase ${catColors[article.categorySlug] || "bg-teal-brand"}`}>
          {article.category}
        </span>
        <h1 className="text-white text-xl md:text-3xl font-extrabold leading-tight mb-3 group-hover:text-orange-brand-light transition-colors max-w-3xl">
          {article.title}
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed max-w-2xl line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✍</span>
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">📅</span>
            {article.date}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}/`} className="block group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-44 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold text-white uppercase tracking-wide ${catColors[article.categorySlug] || "bg-teal-brand"}`}>
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[15px] text-gray-900 leading-snug group-hover:text-teal-brand transition-colors line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}/`} className="flex gap-4 group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative w-28 md:w-36 shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
        />
      </div>
      <div className="py-4 pr-5 flex flex-col justify-center flex-1 min-w-0">
        <span className={`inline-block w-fit px-2 py-0.5 rounded text-[9px] font-semibold text-white mb-1.5 uppercase tracking-wide ${catColors[article.categorySlug] || "bg-teal-brand"}`}>
          {article.category}
        </span>
        <h3 className="font-semibold text-sm text-gray-900 leading-snug group-hover:text-teal-brand transition-colors line-clamp-2 mb-1">
          {article.title}
        </h3>
        <span className="text-[11px] text-gray-400">{article.date}</span>
      </div>
    </Link>
  );
}
