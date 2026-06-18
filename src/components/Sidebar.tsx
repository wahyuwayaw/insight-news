"use client";
import Link from "next/link";
import { useArticles, useCategories } from "@/lib/api";

export default function Sidebar() {
  const { articles } = useArticles();
  const categories = useCategories();
  const popular = [...articles].sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <aside className="space-y-5">
      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 focus-within:border-teal-brand transition">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Cari artikel..." className="bg-transparent text-sm ml-2 w-full outline-none text-gray-700 placeholder:text-gray-400" />
        </div>
      </div>

      {/* Popular Posts */}
      {popular.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2 text-gray-800">
            <span className="w-1 h-4 bg-orange-brand rounded-full inline-block"></span>
            Terpopuler
          </h3>
          <div className="space-y-4">
            {popular.map((a, i) => (
              <Link key={a.id} href={`/artikel/${a.slug}/`} className="flex gap-3 group">
                <span className="text-xl font-black text-gray-200 group-hover:text-teal-brand transition w-7 shrink-0 leading-tight">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-800 leading-snug group-hover:text-teal-brand transition line-clamp-2">
                    {a.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2 text-gray-800">
          <span className="w-1 h-4 bg-teal-brand rounded-full inline-block"></span>
          Kategori
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}/`}
              className="px-3 py-1.5 bg-gray-50 hover:bg-teal-brand hover:text-white text-[11px] font-medium text-gray-600 rounded-full border border-gray-200 hover:border-teal-brand transition"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
