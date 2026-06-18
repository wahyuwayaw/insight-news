import Link from "next/link";
import { categories } from "@/data/articles";

export default function Header() {
  return (
    <header className="safe-area">
      {/* Top Bar — hidden on mobile */}
      <div className="bg-dark text-white text-[11px] py-1.5 hidden md:block border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span className="text-gray-500">
            {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
          <div className="flex gap-4 items-center text-gray-500">
            <a href="#" className="hover:text-teal-brand transition">Facebook</a>
            <a href="#" className="hover:text-teal-brand transition">Twitter</a>
            <a href="#" className="hover:text-teal-brand transition">Instagram</a>
            <a href="#" className="hover:text-teal-brand transition">YouTube</a>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="bg-dark py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div>
              <div className="text-teal-brand font-black text-xl sm:text-[28px] leading-none tracking-tight">INSIGHT</div>
              <div className="text-orange-brand font-black text-xl sm:text-[28px] leading-none tracking-tight">NEWS</div>
            </div>
          </Link>
          <div className="hidden lg:block">
            <div className="bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 flex items-center gap-2 w-[380px]">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Cari berita..." className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker — scrollable */}
      <div className="bg-teal-brand-dark text-white text-[11px] py-1.5 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker">
            {[
              "🔥 Proyek Infrastruktur Rp50T Resmi Diluncurkan",
              "📈 Rupiah Menguat ke Rp15.200/USD",
              "⚽ Timnas Indonesia Lolos 16 Besar Piala Asia",
              "🎬 Film Indonesia Raih Penghargaan di Cannes",
              "💉 Vaksin Malaria Buatan Indonesia Siap Uji Fase 3",
              "🔥 Proyek Infrastruktur Rp50T Resmi Diluncurkan",
              "📈 Rupiah Menguat ke Rp15.200/USD",
              "⚽ Timnas Indonesia Lolos 16 Besar Piala Asia",
              "🎬 Film Indonesia Raih Penghargaan di Cannes",
              "💉 Vaksin Malaria Buatan Indonesia Siap Uji Fase 3",
            ].map((t, i) => (
              <span key={i} className="mx-6 sm:mx-8 opacity-90">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
              <Link href="/" className="px-4 py-3.5 text-[13px] font-semibold text-teal-brand border-b-2 border-teal-brand whitespace-nowrap">
                Beranda
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategori/${cat.slug}/`}
                  className="px-3 py-3.5 text-[13px] font-medium text-gray-500 hover:text-teal-brand border-b-2 border-transparent hover:border-teal-brand transition whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/tentang/" className="px-3 py-3.5 text-[13px] font-medium text-gray-500 hover:text-teal-brand border-b-2 border-transparent hover:border-teal-brand transition whitespace-nowrap">
                Tentang
              </Link>
            </div>
            {/* Mobile nav */}
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="lg:hidden w-full">
      <details className="group">
        <summary className="flex items-center justify-between py-3 cursor-pointer list-none">
          <div className="flex items-center gap-2">
            <div className="text-teal-brand font-black text-lg leading-none">INSIGHT</div>
            <div className="text-orange-brand font-black text-lg leading-none">NEWS</div>
          </div>
          <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="pb-4 space-y-0.5">
          <Link href="/" className="block px-3 py-2.5 text-sm font-semibold text-teal-brand bg-teal-brand/5 rounded-lg">🏠 Beranda</Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}/`}
              className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link href="/tentang/" className="block px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition">ℹ️ Tentang</Link>
        </div>
      </details>
    </div>
  );
}
