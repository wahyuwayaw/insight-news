import Link from "next/link";
import { categories } from "@/data/articles";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-12 sm:mt-16 safe-area">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <div className="text-teal-brand font-black text-2xl leading-none">INSIGHT</div>
            <div className="text-orange-brand font-black text-2xl leading-none">NEWS</div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Portal berita terpercaya yang menyajikan informasi aktual, tajam, dan terverifikasi dari seluruh Indonesia dan dunia.
          </p>
          <div className="flex gap-2">
            {[
              { name: "F", label: "Facebook" },
              { name: "T", label: "Twitter" },
              { name: "I", label: "Instagram" },
              { name: "Y", label: "YouTube" },
            ].map((s) => (
              <a key={s.name} href="#" className="w-9 h-9 bg-dark-light hover:bg-teal-brand rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition text-xs font-bold" title={s.label}>
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider mb-5 text-teal-brand">Kategori</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/kategori/${cat.slug}/`} className="text-gray-400 hover:text-orange-brand text-sm transition">
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider mb-5 text-teal-brand">Kontak</h3>
          <div className="space-y-2.5 text-gray-400 text-sm">
            <p>📧 redaksi@insightnews.id</p>
            <p>📞 +62 21 1234 5678</p>
            <p>📍 Jakarta, Indonesia</p>
          </div>
          <div className="mt-5">
            <Link href="/tentang/" className="text-orange-brand hover:text-orange-brand-light text-sm font-medium transition">
              Tentang Kami →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-1">
          <p>© 2026 Insight News. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
