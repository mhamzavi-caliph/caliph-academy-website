/* Caliph Academy — bilingual (English default, Bahasa Malaysia toggle).
   English lives in the HTML; this file holds Malay and swaps it in on toggle.
   No per-element tagging: we match the innermost element whose normalised
   textContent is a key below, then replace its innerHTML (links/bold preserved). */
(function () {
  var MS = {
    /* ---------- Nav ---------- */
    "Home ▾": 'Utama <span class="nav-caret" aria-hidden="true">▾</span>',
    "Curriculum ▾": 'Kurikulum <span class="nav-caret" aria-hidden="true">▾</span>',
    "About": "Tentang Kami",
    "The Programme": "Program",
    "Curriculum Structure": "Struktur Kurikulum",
    "UK Degree": "Ijazah UK",
    "Careers": "Kerjaya",
    "Admissions": "Kemasukan",
    "Book For College Tour": "Tempah Lawatan Kolej",

    /* ---------- Hero ---------- */
    "✦ Double Diploma • Dual Recognition": "✦ Diploma Berkembar • Pengiktirafan Dua Hala",
    "Double Diploma in Business Administration": 'Diploma Berkembar dalam Pentadbiran <span class="grad">Perniagaan</span>',
    "Two globally trusted qualifications — accredited by the Malaysian Qualifications Agency (MQA) and the London Examinations Board (UK) — plus LOYLA, an exclusive leadership expedition to Oxford & London.":
      "Dua kelayakan yang dipercayai di peringkat global — diiktiraf oleh <strong>Agensi Kelayakan Malaysia (MQA)</strong> dan <strong>London Examinations Board (UK)</strong> — serta <strong>LOYLA</strong>, ekspedisi kepimpinan eksklusif ke Oxford &amp; London.",
    "Apply for December 2026 Intake": "Mohon untuk Ambilan Disember 2026",
    "✦ Discover LOYLA →": "✦ Terokai LOYLA →",
    "📄 Download Brochure": "📄 Muat Turun Brosur",
    "MQAAccredited": "MQA<br>Diiktiraf",
    "LOYLAUK Leadership": "LOYLA<br>Kepimpinan UK",
    "In collaboration with": "Dengan kerjasama",
    "Scroll": "Skrol",

    /* ---------- Partners band ---------- */
    "In partnership & recognition with": "Dengan kerjasama & pengiktirafan",
    "Delivered with UTMSpace Services Sdn Bhd": "Dikendalikan bersama UTMSpace Services Sdn Bhd",
    "UK Degree Partner": "Rakan Ijazah UK",
    "UK Awarding Body": "Badan Penganugerah UK",

    /* ---------- UK degree top highlight ---------- */
    "Our UK Degree Partner": "Rakan Ijazah UK Kami",
    "✦ Continue to the UK": "✦ Sambung ke UK",
    "Top up to a UK Bachelor's Degree — in just one year": "Naik taraf ke Ijazah Sarjana Muda UK — dalam setahun sahaja",
    "Most diploma holders need two more years for a degree. Our graduates top up to a full UK bachelor's degree in a single year at the University of Gloucestershire, England — plus a two-year post-study work visa.":
      "Kebanyakan pemegang diploma memerlukan <strong>dua tahun tambahan</strong> untuk mendapat ijazah. Graduan kami naik taraf ke <strong>ijazah sarjana muda UK</strong> yang penuh dalam setahun sahaja di <strong>University of Gloucestershire</strong>, England — serta visa kerja pasca-pengajian selama dua tahun.",
    "Explore the UK Degree →": "Terokai Ijazah UK →",

    /* ---------- Brand intro ---------- */
    "Welcome to Caliph Academy": "Selamat Datang ke Caliph Academy",
    "Inspiring Future Leaders": "Memupuk Pemimpin Masa Depan",
    "Take a moment to meet Caliph Academy — where knowledge builds the future.":
      "Luangkan seketika untuk mengenali Caliph Academy — di mana ilmu membina masa depan.",

    /* ---------- Accreditation ---------- */
    "Two Awards, One Journey": "Dua Anugerah, Satu Perjalanan",
    "Recognised at home and abroad": "Diiktiraf di dalam dan luar negara",
    "Graduate with dual credentials that open doors across Malaysia's Islamic finance sector and international markets.":
      "Bergraduat dengan dua kelayakan yang membuka peluang merentasi sektor kewangan Islam Malaysia dan pasaran antarabangsa.",
    "Malaysian Qualifications Agency": "Agensi Kelayakan Malaysia (MQA)",
    "Fully accredited under the Malaysian Qualifications Framework (MQF), ensuring your diploma is recognised by employers, public universities and government bodies nationwide.":
      "Diiktiraf sepenuhnya di bawah Kerangka Kelayakan Malaysia (MQF), memastikan diploma anda diiktiraf oleh majikan, universiti awam dan badan kerajaan di seluruh negara.",
    "MQA Approval: MQA/PA18855": "Kelulusan MQA: MQA/PA18855",
    "A parallel UK-benchmarked award — \"Global Qualifications for a Brighter Future\" — giving your credentials international standing and articulation pathways abroad.":
      "Anugerah setanding UK — \"Global Qualifications for a Brighter Future\" — memberi kelayakan anda kedudukan antarabangsa dan laluan sambungan ke luar negara.",

    /* ---------- UTMSpace collaboration ---------- */
    "In Collaboration with UTMSpace Services Sdn Bhd": "Dengan Kerjasama UTMSpace Services Sdn Bhd",
    "You study as a UTMSpace Services Sdn Bhd student": "Anda belajar sebagai pelajar UTMSpace Services Sdn Bhd",
    "Enrol and graduate as a registered UTMSpace Services Sdn Bhd student": "Mendaftar dan bergraduat sebagai pelajar berdaftar UTMSpace Services Sdn Bhd",
    "Study on campus at UTM Kuala Lumpur (Semarak)": "Belajar di kampus UTM Kuala Lumpur (Semarak)",
    "A UTM-recognised diploma, taught by qualified educators": "Diploma diiktiraf UTM, diajar oleh pendidik bertauliah",
    "A real university experience — not just a certificate": "Pengalaman universiti sebenar — bukan sekadar sijil",

    /* ---------- MOU + press ---------- */
    "Our Partnership in Action": "Kerjasama Kami dalam Tindakan",
    "Caliph Academy × UTMSpace Services Sdn Bhd — the MOU signing": "Caliph Academy × UTMSpace Services Sdn Bhd — majlis menandatangani MoU",
    "Watch the memorandum of understanding that brings this Double Diploma to life.": "Saksikan memorandum persefahaman yang menjayakan Diploma Berkembar ini.",
    "As Featured In": "Sebagaimana Dilaporkan",
    "In the news": "Dalam berita",
    "National media covered the Caliph Academy × UTMSpace Services Sdn Bhd strategic partnership.": "Media nasional melaporkan kerjasama strategik Caliph Academy × UTMSpace Services Sdn Bhd.",

    /* ---------- Campus ---------- */
    "Your Campus": "Kampus Anda",
    "Study & live at UTM Kuala Lumpur": "Belajar & tinggal di UTM Kuala Lumpur",
    "A city university campus on Jalan Semarak, in the heart of Kuala Lumpur — with residential colleges, full facilities and a vibrant student life.":
      "Kampus universiti di Jalan Semarak, di tengah-tengah Kuala Lumpur — lengkap dengan kolej kediaman, kemudahan penuh dan kehidupan pelajar yang rancak.",
    "City Campus": "Kampus Bandar",
    "UTM Kuala Lumpur's established campus on Jalan Semarak — minutes from the KL city centre.": "Kampus mantap UTM Kuala Lumpur di Jalan Semarak — beberapa minit dari pusat bandar KL.",
    "On-Campus Hostels": "Asrama Dalam Kampus",
    "Residential colleges — Kediaman Siswa Semarak & Jaya — housing up to 3,000 students.": "Kolej kediaman — Kediaman Siswa Semarak & Jaya — menampung sehingga 3,000 pelajar.",
    "Full Facilities": "Kemudahan Lengkap",
    "Cafeterias, minimarts, laundry, sports facilities, libraries and leisure spaces.": "Kafeteria, minimart, dobi, kemudahan sukan, perpustakaan dan ruang santai.",
    "University Life": "Kehidupan Universiti",
    "Learn within a real, well-known public university environment and community.": "Belajar dalam persekitaran dan komuniti universiti awam yang sebenar dan terkenal.",
    "Accommodation and facilities are provided by UTM Kuala Lumpur; availability and rates are subject to UTM's terms.":
      "Penginapan dan kemudahan disediakan oleh UTM Kuala Lumpur; ketersediaan dan kadar tertakluk pada terma UTM.",

    /* ---------- LOYLA highlight ---------- */
    "✦ A Main Highlight of the Double Diploma": "✦ Sorotan Utama Diploma Berkembar",
    "LOYLA — the London-Oxford Youth Leadership Award": "LOYLA — London-Oxford Youth Leadership Award",
    "Hosted at the prestigious University of Oxford, LOYLA is the unforgettable international chapter of your Double Diploma — a 10-day leadership expedition to Oxford & London. Lead beyond borders. Shape tomorrow's leaders.":
      "Dianjurkan di University of Oxford yang berprestij, LOYLA ialah bab antarabangsa yang tidak dilupakan dalam Diploma Berkembar anda — ekspedisi kepimpinan 10 hari ke Oxford &amp; London. Pimpin tanpa sempadan. Bentuk pemimpin masa depan.",
    "Oxford Seminar": "Seminar Oxford",
    "A leadership seminar at the historic University of Oxford.": "Seminar kepimpinan di University of Oxford yang bersejarah.",
    "Innovation Hunt": "Innovation Hunt",
    "An experiential team challenge at Oxford Westgate.": "Cabaran berpasukan secara pengalaman di Oxford Westgate.",
    "Closing Ceremony": "Majlis Penutup",
    "A group assessment and the official LOYLA closing ceremony.": "Penilaian berkumpulan dan majlis penutup rasmi LOYLA.",
    "Explore London": "Terokai London",
    "Farewell picnic at Malaysia Hall + optional Harry Potter Studio.": "Piknik perpisahan di Malaysia Hall + lawatan pilihan ke Harry Potter Studio.",
    "Explore the LOYLA Journey →": "Terokai Perjalanan LOYLA →",

    /* ---------- Why Caliph ---------- */
    "Why Caliph Academy": "Mengapa Caliph Academy",
    "Built for the future of Islamic finance": "Dibina untuk masa depan kewangan Islam",
    "The Islamic finance industry is growing fast. Our diploma equips you with the Shariah knowledge, business acumen and practical skills to lead it.":
      "Industri kewangan Islam berkembang pesat. Diploma kami melengkapkan anda dengan ilmu Syariah, kebijaksanaan perniagaan dan kemahiran praktikal untuk menerajuinya.",
    "Double Diploma": "Diploma Berkembar",
    "One structured curriculum, two recognised qualifications — maximise the value of your study time.": "Satu kurikulum tersusun, dua kelayakan diiktiraf — memaksimumkan nilai masa pengajian anda.",
    "Shariah-Grounded": "Berteraskan Syariah",
    "Islamic Commercial Law, Usul Fiqh and Qawaid Fiqhiyyah are woven through every semester of business study.": "Islamic Commercial Law, Usul Fiqh dan Qawaid Fiqhiyyah diterapkan dalam setiap semester pengajian perniagaan.",
    "Industry-Ready Skills": "Kemahiran Sedia Industri",
    "Accounting, risk management, marketing and Islamic insurance operations taught with real industry practice.": "Perakaunan, pengurusan risiko, pemasaran dan operasi insurans Islam diajar dengan amalan industri sebenar.",
    "Industrial Training": "Latihan Industri",
    "A dedicated internship semester places you inside real Islamic finance operators and financial institutions.": "Satu semester latihan industri khusus menempatkan anda dalam operator kewangan Islam dan institusi kewangan sebenar.",
    "Full-Time or Part-Time": "Sepenuh Masa atau Separuh Masa",
    "Complete in 2 years full-time (6 semesters) or study part-time over 4 years while you work.": "Tamat dalam 2 tahun sepenuh masa (6 semester) atau belajar separuh masa selama 4 tahun sambil bekerja.",
    "Global Pathways": "Laluan Global",
    "UK-benchmarked recognition supports further study and careers beyond Malaysia's borders.": "Pengiktirafan setanding UK menyokong pengajian lanjutan dan kerjaya melangkaui sempadan Malaysia.",

    /* ---------- KL to London split ---------- */
    "From Kuala Lumpur to London": "Dari Kuala Lumpur ke London",
    "A qualification that travels with you": "Kelayakan yang menemani perjalanan anda",
    "Malaysia is the global hub of the Islamic finance industry, and the United Kingdom remains a benchmark for professional education. Caliph Academy bridges both worlds.":
      "Malaysia ialah hab global industri kewangan Islam, dan United Kingdom kekal sebagai penanda aras pendidikan profesional. Caliph Academy merapatkan kedua-dua dunia.",
    "Locally accredited by MQA for full national recognition": "Diiktiraf tempatan oleh MQA untuk pengiktirafan penuh negara",
    "Internationally awarded through the London Examinations Board": "Dianugerahkan di peringkat antarabangsa melalui London Examinations Board",
    "Curriculum mapped to real Islamic finance industry roles": "Kurikulum dipetakan dengan peranan sebenar industri kewangan Islam",
    "A foundation for advanced diplomas, degrees and professional certification": "Asas untuk diploma lanjutan, ijazah dan pensijilan profesional",
    "See how the double award works →": "Lihat cara anugerah berkembar berfungsi →",
    "Recognised Qualifications": "Kelayakan Diiktiraf",
    "Credits (Full-Time)": "Kredit (Sepenuh Masa)",
    "Industry-Aligned Courses": "Kursus Selari Industri",
    "Shariah-Compliant Focus": "Fokus Patuh Syariah",

    /* ---------- Study your way ---------- */
    "Study Your Way": "Belajar Ikut Cara Anda",
    "Choose the pace that fits your life": "Pilih rentak yang sesuai dengan hidup anda",
    "The same double-diploma outcome, delivered in two flexible structures.": "Hasil diploma berkembar yang sama, ditawarkan dalam dua struktur fleksibel.",
    "Full-Time": "Sepenuh Masa",
    "An immersive route for school leavers and full-time students, including a 10-week industrial training semester.": "Laluan menyeluruh untuk lepasan sekolah dan pelajar sepenuh masa, termasuk semester latihan industri selama 10 minggu.",
    "View Full-Time Structure": "Lihat Struktur Sepenuh Masa",
    "Part-Time": "Separuh Masa",
    "Designed for working professionals in banking, insurance and finance who want to upskill without pausing their career.": "Direka untuk profesional bekerja dalam perbankan, insurans dan kewangan yang mahu meningkatkan kemahiran tanpa menghentikan kerjaya.",
    "View Part-Time Structure": "Lihat Struktur Separuh Masa",

    /* ---------- Motto / CTA ---------- */
    "Knowledge Builds the Future — an education that unites authentic Islamic scholarship with the discipline of modern business.":
      "Ilmu Membina Masa Depan — pendidikan yang menyatukan keilmuan Islam yang tulen dengan disiplin perniagaan moden.",
    "Your double diploma starts here": "Diploma berkembar anda bermula di sini",
    "Join the December 2026 intake and graduate with qualifications recognised in Malaysia and the United Kingdom.": "Sertai ambilan Disember 2026 dan bergraduat dengan kelayakan yang diiktiraf di Malaysia dan United Kingdom.",

    /* ---------- Footer ---------- */
    "Caliph Academy is the appointed Marketing Partner & Centre of Education (COE) for the Double Diploma in Business Administration, delivered with UTMSpace Services Sdn Bhd — uniting Shariah scholarship with modern business education.":
      "Caliph Academy ialah Rakan Pemasaran dan Pusat Pendidikan (COE) yang dilantik untuk Diploma Berkembar dalam Pentadbiran Perniagaan, dikendalikan bersama UTMSpace Services Sdn Bhd — menyatukan keilmuan Syariah dengan pendidikan perniagaan moden.",
    "Explore": "Terokai",
    "Home": "Utama",
    "Curriculum": "Kurikulum",
    "About Us": "Tentang Kami",
    "How to Apply": "Cara Memohon",
    "Entry Requirements": "Syarat Kemasukan",
    "Request Info": "Minta Maklumat",
    "Download Brochure": "Muat Turun Brosur",
    "Accreditation": "Pengiktirafan",
    "Recognised by MQA (Malaysia) and the London Examinations Board (UK).": "Diiktiraf oleh MQA (Malaysia) dan London Examinations Board (UK).",
    "© 2026 Caliph Academy. All rights reserved.": "© 2026 Caliph Academy. Hak cipta terpelihara.",
    "Ilmu Membina Masa Depan — Knowledge Builds the Future": "Ilmu Membina Masa Depan — Knowledge Builds the Future"
  };

  function norm(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  var items = [];
  function collect() {
    items = [];
    var all = document.querySelectorAll("body *");
    var matches = [];
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.closest("[data-i18n-skip]")) continue;
      var k = norm(el.textContent);
      if (k && Object.prototype.hasOwnProperty.call(MS, k)) matches.push(el);
    }
    var set = matches;
    for (var j = 0; j < matches.length; j++) {
      var el2 = matches[j];
      var hasInner = false;
      for (var m = 0; m < set.length; m++) {
        if (set[m] !== el2 && el2.contains(set[m])) { hasInner = true; break; }
      }
      if (!hasInner) items.push({ el: el2, en: el2.innerHTML, key: norm(el2.textContent) });
    }
  }

  function apply(lang) {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      it.el.innerHTML = (lang === "ms" && MS[it.key] !== undefined) ? MS[it.key] : it.en;
    }
    document.documentElement.setAttribute("lang", lang === "ms" ? "ms" : "en");
    var btns = document.querySelectorAll("[data-lang-btn]");
    for (var b = 0; b < btns.length; b++) {
      btns[b].classList.toggle("active", btns[b].getAttribute("data-lang-btn") === lang);
    }
    try { localStorage.setItem("caliphLang", lang); } catch (e) {}
  }

  function init() {
    collect();
    var lang = "en";
    try { lang = localStorage.getItem("caliphLang") || "en"; } catch (e) {}
    if (lang === "ms") apply("ms"); else apply("en");
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-lang-btn]");
      if (t) { e.preventDefault(); apply(t.getAttribute("data-lang-btn")); }
    });
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
