/* ── i18n dictionary ──────────────────────────────────────────── */
const I18N = {
  en: {
    dir: "ltr", lang: "en",
    brand: "Mahbod BemaniCham",
    nav_cta: "Contact",
    hero_title: 'electrical engineering, built with <em>precision</em>.',
    hero_lede: `Undergraduate at Amirkabir University of Technology (Tehran Polytechnic).
            I work at the seam where firmware meets hardware — ESP32 data acquisition,
            VHDL on FPGA, Qt desktop applications, Django services. Teaching assistant
            for Electromagnetics and Digital Logic Design.`,
    meta_loc: "Tehran, Iran",
    meta_degree: "B.Sc. Electrical Engineering (Control Major · Electronics Minor)",
    read_index: "Read the index",
    work_title: "selected work",
    work_note: `Every entry below is a repository you can open and read. No screenshots of
          things that do not exist, no metrics I did not measure.`,
    plate_label: "Live Environment",
    plate_claim: 'I would rather build the thing than <em>write</em> about building it.',
    studying: "Studying",
    ta: "Teaching assistant",
    focus: "Focus",
    tools_title: "what i actually use",
    tools_note: `Grouped by where it sits in a build, not by how confident it sounds.
          Anything I have only read about is not on this list.`,
    webdesigns_title: "web designs",
    webdesigns_note: `Selected web interfaces and storefront systems I have engineered. Links are
           active templates; I will wire their full production destinations soon.`,
    about_title: "about",
    internships_title: "internships & active research",
    contact_title: "get in touch",
    contact_note: "Telegram is checked daily. Drop a direct message there."
  },
  fa: {
    dir: "rtl", lang: "fa",
    brand: "ماهبد بمانی‌چم",
    nav_cta: "تماس",
    hero_title: 'مهندسی برق، ساخته‌شده با <em>دقت</em>.',
    hero_lede: `دانشجوی کارشناسی دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران).
            من در مرزِ اتصال فریم‌ور به سخت‌افزار کار می‌کنم — جمع‌آوری داده با ESP32،
            طراحی FPGA با VHDL، اپلیکیشن‌های دسکتاپ Qt و سرویس‌های جنگو.
            دستیار آموزشی درس الکترومغناطیس و مدارهای منطقی بوده‌ام.`,
    meta_loc: "تهران، ایران",
    meta_degree: "کارشناسی مهندسی برق (گرایش کنترل · ماینور الکترونیک)",
    read_index: "مشاهده فهرست",
    work_title: "نمونه‌کارهای منتخب",
    work_note: `هر مورد در این فهرست یک مخزن است که می‌توانید بازش کنید و بخوانید. نه اسکرین‌شات از چیزهایی که وجود ندارند، نه آماری که اندازه نگرفته‌ام.`,
    plate_label: "وضعیت فعلی",
    plate_claim: 'ترجیح می‌دهم چیزی را <em>بسازم</em> تا اینکه دربارهٔ ساختنش بنویسم.',
    studying: "در حال تحصیل",
    ta: "دستیار آموزشی",
    focus: "تمرکز",
    tools_title: "ابزارهایی که واقعاً استفاده می‌کنم",
    tools_note: `بر اساس جایگاهشان در پروژه دسته‌بندی شده‌اند، نه بر اساس جذاب بودن نامشان.
          هر چیزی که فقط درباره‌اش خوانده باشم، اینجا نیست.`,
    webdesigns_title: "طراحی وب",
    webdesigns_note: `رابط‌ها و فروشگاه‌هایی که طراحی و پیاده کرده‌ام. لینک‌ها فعال هستند؛ مقصدهای نهایی را به‌زودی متصل می‌کنم.`,
    about_title: "درباره من",
    internships_title: "کارآموزی و پژوهش فعال",
    contact_title: "ارتباط با من",
    contact_note: "تلگرام را روزانه چک می‌کنم؛ همان‌جا پیام بدهید."
  }
};

function setLang(lang) {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = t.dir;
  document.title = lang === "fa"
    ? "مهبد بمانی‌چم — مهندسی برق، دانشگاه صنعتی امیرکبیر"
    : "Mahbod BemaniCham — Electrical Engineering, Amirkabir University of Technology";

  // text nodes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.innerHTML = t[key];
  });

  // body font switches to Vazirmatn for Persian
  document.body.classList.toggle("fa-mode", lang === "fa");

  // toggle active state on the pill
  document.querySelectorAll(".lang-opt").forEach(o =>
    o.classList.toggle("is-active", o.dataset.l === lang));

  try { localStorage.setItem("site_lang", lang); } catch (e) {}
}

(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem("site_lang"); } catch (e) {}
  setLang(saved || "en");

  document.getElementById("langToggle").addEventListener("click", () => {
    const next = (localStorage.getItem("site_lang") || "en") === "en" ? "fa" : "en";
    setLang(next);
  });
})();
