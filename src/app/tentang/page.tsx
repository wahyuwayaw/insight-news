import Link from "next/link";

export default function Tentang() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-teal-brand transition">Beranda</Link>
        <span>›</span>
        <span className="text-gray-600">Tentang</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h1 className="text-3xl font-extrabold text-dark mb-2">Tentang Insight News</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-brand to-orange-brand rounded-full mb-6"></div>

          <div className="prose prose-gray max-w-none space-y-4 text-gray-600 text-[15px] leading-relaxed">
            <p>
              <strong className="text-dark">Insight News</strong> adalah portal berita digital yang menyajikan informasi aktual, tajam, dan terpercaya dari seluruh Indonesia dan dunia.
            </p>
            <p>
              Didirikan dengan visi menjadi sumber informasi utama bagi masyarakat Indonesia, kami berkomitmen menghadirkan jurnalisme berkualitas yang mengedepankan akurasi, keberimbangan, dan kedalaman analisis.
            </p>
            <p>
              Tim redaksi kami terdiri dari jurnalis berpengalaman yang tersebar di berbagai kota besar di Indonesia. Kami meliput berbagai topik mulai dari politik, ekonomi, hukum, olahraga, kesehatan, teknologi, hingga hiburan.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-3">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "🎯", title: "Akurat", desc: "Setiap berita diverifikasi sebelum dipublikasikan" },
                { icon: "⚖️", title: "Berimbang", desc: "Menyajikan berbagai sudut pandang secara objektif" },
                { icon: "🔍", title: "Mendalam", desc: "Analisis tuntas di balik setiap peristiwa" },
              ].map((v) => (
                <div key={v.title} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h3 className="font-bold text-dark text-sm">{v.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-dark mt-8 mb-3">Hubungi Kami</h2>
            <div className="bg-teal-brand/5 border border-teal-brand/20 rounded-lg p-4 space-y-2 text-sm">
              <p>📧 Email: <strong>redaksi@insightnews.id</strong></p>
              <p>📞 Telepon: <strong>+62 21 1234 5678</strong></p>
              <p>📍Alamat: Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
