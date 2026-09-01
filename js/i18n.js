/* ── i18n dictionary v2 ──────────────────────────────────────── */
const I18N = {
  en: {
    dir: "ltr", lang: "en",
    brand: "Mahbod BemaniCham",
    nav_work: "Work", nav_stack: "Stack", nav_about: "About", nav_contact: "Contact",
    switch_language: "Switch language", skip_to_index: "Skip to the index",
    status_open: "Open to internships & collaborations",
    hero_title: 'electrical engineering, built with <em>precision</em>.',
    hero_lede: `Undergraduate at Amirkabir University of Technology (Tehran Polytechnic).
            I work at the seam where firmware meets hardware — ESP32 data acquisition,
            VHDL on FPGA, Qt desktop applications, Django services. Teaching assistant
            for Electromagnetics and Digital Logic Design.`,
    meta_loc: "Tehran, Iran",
    meta_degree: "B.Sc. Electrical Engineering (Control Major · Electronics Minor)",
    view_index: "Browse the live index",
    count_repos: "Public repositories", count_stars: "Stars earned",
    count_followers: "Followers", count_since: "On GitHub since",
    work_title: "the index",
    work_note: `Every entry below is a repository you can open and read. This section is
          wired directly to GitHub — when a new repository appears, its card is generated
          automatically from the top of its README.`,
    badge_syncing: "syncing…", badge_live: "live · github api", badge_offline: "snapshot mode",
    search_ph: "Filter repositories…", sort_label: "sort",
    sort_pushed: "Recently pushed", sort_stars: "Most starred", sort_name: "Name A→Z",
    chip_all: "all",
    loading_msg: "syncing repositories from GitHub…",
    empty_msg: "no repositories match this filter.",
    err_msg: "github unreachable — showing last synced snapshot.",
    flag_new: "new",
    rel_updated: "updated",
    sync_pending: "snapshot pending first sync",
    sync_note_fmt: "auto-synced from GitHub · {d}",
    copy_email: "copy", copied_email: "email copied ✓",
    footer_text: "Mahbod BemaniCham — Electrical Engineering (Control major, Electronics minor), Amirkabir University of Technology (Tehran Polytechnic), Tehran. 2026.",
    footer_hint: "press ? for shortcuts · ~ for terminal",
    back_to_top: "Back to top",

    plate_label: "Live Environment",
    plate_claim: 'I would rather build the thing than <em>write</em> about building it.',
    studying: "Studying",
    studying_value: "B.Sc. Electrical Engineering (Control Major · Electronics Minor), Amirkabir University of Technology (Tehran Polytechnic)",
    ta: "Teaching assistant",
    ta_value: "Electromagnetics (Dr. Askarpour) and Digital Logic Design (Dr. Pourfard), separate semesters",
    focus: "Focus",
    focus_value: "Embedded data acquisition, VHDL on FPGA, Qt desktop applications, Django web services",

    tools_title: "what i actually use",
    tools_note: `Grouped by where it sits in a build, not by how confident it sounds.
          Anything I have only read about is not on this list.`,
    tools_caption: "Working tool set", tools_layer: "Layer", tools_tools: "Tools", tools_used: "Used in",
    tool_silicon: "Silicon", tool_silicon_used: "Parking DAQ, door lock, Hamming",
    tool_hdl: "Hardware description", tool_hdl_used: "Packet processor, logic lab",
    tool_firmware: "Firmware", tool_firmware_used: "All embedded builds",
    tool_application: "Application", tool_application_used: "Qt Deep Dive, web services",
    tool_data: "Data", tool_data_used: "Parking telemetry, shop backend",
    tool_bench: "Bench", tool_bench_used: "Every project above",

    about_title: "about",
    about_p1: `I am an electrical engineering undergraduate at Amirkabir University of
            Technology. Most of what I know came from projects that did not work the
            first time — a servo that jittered until the PWM channel was right, a
            decoder that passed simulation and failed on the board, a Django worker
            that died quietly every night at three.`,
    about_p2: `I prefer hardware you can touch and courses you can teach. Two semesters
            as an undergraduate teaching assistant — Electromagnetics with
            Dr. Askarpour, Digital Logic Design with Dr. Pourfard — taught me that
            explaining a concept twice is the fastest way to find the hole in your own
            understanding of it. My academic path is anchored on a <strong>Control Systems</strong>
            major, actively reinforced with an <strong>Electronics</strong> minor.`,
    about_p3: `This page is an index, not a pitch. If something here is relevant to you,
            the repository is one click away and the commit history is honest about
            how long it took.`,

    internships_title: "internships & active research",
    int_p1: `<strong>SCADA Security &amp; Substation Automation (Modje Niroo Internship):</strong><br />
            I am currently passing an engineering internship at <strong>Modje Niroo</strong>,
            actively analyzing, studying, and documenting conventional substations, DCS
            (Distributed Control Systems), and national SCADA telemetry layouts in Iran's power grid.`,
    int_p2: `My current research focuses on the <strong>IEC 61850</strong>, <strong>DNP3</strong>,
            <strong>IEC 60870-5-104</strong>, and <strong>Modbus</strong> protocol chains. Specifically,
            I am compiling detailed technical logs on GOOSE message retransmission latency under heavy
            traffic spikes, RTU marshalling logic, FEP gateway mapping, and compiling risk matrices
            for potential cybersecurity threat vectors on industrial dispatching.`,

webdesigns_title: "web designs",
    webdesigns_note: `Selected web interfaces and storefront systems I have engineered.`,
    w1_title: "Mahgol Resin E-Commerce Storefront",
    w1_desc: `A high-performance production e-commerce engine integrated with an active Telegram notification bot for seamless purchase workflows. Features a royal purple and gold theme customized to match the brand's exact design palette, asynchronous order dispatching with Celery, and real-time database-driven product inventory management.`,
    w1_side: "Production-grade storefront · Live",
    w2_title: "Metis Web Application",
    w2_desc: `A modern web application built with Next.js and TypeScript, featuring a responsive design with Tailwind CSS. Deployed on Vercel with automatic CI/CD pipeline.`,
    w2_side: "Live application · Vercel deployment",

    contact_title: "get in touch",
    contact_note: "Telegram is checked daily. Drop a direct message there.",
    contact_telegram: "Telegram", contact_dm: "(DMs are open — fast response)",
    contact_github: "GitHub", contact_linkedin: "LinkedIn", contact_email: "Email",

    pal_ph: "Type a command or search…",
    grp_navigate: "navigate", grp_projects: "repositories", grp_theme: "theme",
    grp_language: "language", grp_links: "links", grp_actions: "actions",
    act_open_term: "Open terminal", act_shortcuts: "Keyboard shortcuts",
    act_copy_email: "Copy email address",

    sc_title: "keyboard shortcuts",
    sc_palette: "Open command palette", sc_search: "Focus repository filter",
    sc_theme: "Cycle color theme", sc_lang: "Toggle EN / فارسی",
    sc_term: "Toggle terminal", sc_help: "This dialog", sc_esc: "Close overlays",
    sc_close: "close",

    toast_theme: "theme → {v}", toast_lang: "language → {v}",
    toast_hack: "HACK MODE engaged. konami respected.",
    term_welcome: [
      'mahbod-os v2 — interactive shell',
      'type "help" for commands.'
    ],
    term_help_rows: [
      "help              this list",
      "whoami            who is behind this site",
      "ls                list repositories",
      "cat <repo>        print a repo's readme summary",
      "open <repo>       open repo on github",
      "stats             live github numbers",
      "theme [name]      cobalt | paper | crt | ember",
      "lang [en|fa]      switch language",
      "goto <section>    scroll to work|stack|about|contact",
      "contact           ways to reach me",
      "clear             clear the screen",
      "exit              close terminal"
    ],
    term_unknown: "command not found: {v} — try \"help\"",
    term_bye: "bye."
  },

  fa: {
    dir: "rtl", lang: "fa",
    brand: "مهبد بمانی‌چم",
    nav_work: "نمونه‌کارها", nav_stack: "ابزارها", nav_about: "درباره", nav_contact: "تماس",
    switch_language: "تغییر زبان", skip_to_index: "رفتن به فهرست",
    status_open: "آمادهٔ کارآموزی و همکاری",
    hero_title: 'مهندسی برق، ساخته‌شده با <em>دقت</em>.',
    hero_lede: `دانشجوی کارشناسی دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران).
            من در مرزِ اتصال فریم‌ور به سخت‌افزار کار می‌کنم — جمع‌آوری داده با ESP32،
            طراحی FPGA با VHDL، اپلیکیشن‌های دسکتاپ Qt و سرویس‌های جنگو.
            دستیار آموزشی درس الکترومغناطیس و مدارهای منطقی بوده‌ام.`,
    meta_loc: "تهران، ایران",
    meta_degree: "کارشناسی مهندسی برق (گرایش کنترل · ماینور الکترونیک)",
    view_index: "مشاهدهٔ فهرست زنده",
    count_repos: "مخزن عمومی", count_stars: "ستاره‌های دریافتی",
    count_followers: "دنبال‌کننده", count_since: "عضو گیت‌هاب از",
    work_title: "فهرست پروژه‌ها",
    work_note: `هر مورد در این فهرست یک مخزن است که می‌توانید بازش کنید و بخوانید. این بخش مستقیماً به گیت‌هاب وصله — هر ریپوی جدیدی اضافه شود، کارتش به‌صورت خودکار از ابتدای README همان ریپو ساخته می‌شود.`,
    badge_syncing: "در حال همگام‌سازی…", badge_live: "زنده · گیت‌هاب", badge_offline: "حالت اسنپ‌شات",
    search_ph: "فیلتر مخزن‌ها…", sort_label: "ترتیب",
    sort_pushed: "جدیدترین پوش", sort_stars: "بیشترین ستاره", sort_name: "نام الفبا",
    chip_all: "همه",
    loading_msg: "در حال دریافت مخزن‌ها از گیت‌هاب…",
    empty_msg: "هیچ مخزنی با این فیلتر پیدا نشد.",
    err_msg: "دسترسی به گیت‌هاب ممکن نشد — آخرین اسنپ‌شات نمایش داده می‌شود.",
    flag_new: "جدید",
    rel_updated: "به‌روزرسانی",
    sync_pending: "اسنپ‌شات منتظر اولین همگام‌سازی",
    sync_note_fmt: "همگام‌سازی خودکار از گیت‌هاب · {d}",
    copy_email: "کپی", copied_email: "ایمیل کپی شد ✓",
    footer_text: "مهبد بمانی‌چم — مهندسی برق (گرایش کنترل، حوزه تخصصی الکترونیک)، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)، تهران. ۱۴۰۵.",
    footer_hint: "کلید ؟ برای میانبرها · ~ برای ترمینال",
    back_to_top: "بازگشت به بالا",

    plate_label: "وضعیت فعلی",
    plate_claim: 'ترجیح می‌دهم چیزی را <em>بسازم</em> تا اینکه دربارهٔ ساختنش بنویسم.',
    studying: "تحصیل",
    studying_value: "کارشناسی مهندسی برق، گرایش کنترل، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)",
    ta: "دستیار آموزشی",
    ta_value: "الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پورفرد، در دو نیم‌سال جداگانه",
    focus: "حوزه تمرکز",
    focus_value: "جمع‌آوری داده و سیستم‌های نهفته، VHDL و FPGA، اپلیکیشن‌های دسکتاپ Qt و سرویس‌های وب جنگو",

    tools_title: "ابزارهایی که واقعاً استفاده می‌کنم",
    tools_note: `بر اساس جایگاهشان در پروژه دسته‌بندی شده‌اند، نه بر اساس جذاب بودن نامشان.
          هر چیزی که فقط درباره‌اش خوانده باشم، اینجا نیست.`,
    tools_caption: "مجموعه ابزارهای مورد استفاده", tools_layer: "لایه", tools_tools: "ابزارها", tools_used: "کاربرد",
    tool_silicon: "سخت‌افزار", tool_silicon_used: "پارکینگ هوشمند، قفل درب، همینگ",
    tool_hdl: "توصیف سخت‌افزار", tool_hdl_used: "پردازنده بسته، آزمایشگاه مدار منطقی",
    tool_firmware: "فریم‌ور", tool_firmware_used: "تمام پروژه‌های نهفته",
    tool_application: "نرم‌افزار کاربردی", tool_application_used: "Qt Deep Dive، سرویس‌های وب",
    tool_data: "داده و زیرساخت", tool_data_used: "تله‌متری پارکینگ، بک‌اند فروشگاه",
    tool_bench: "ابزار آزمایش و توسعه", tool_bench_used: "تمام پروژه‌های بالا",

    about_title: "درباره من",
    about_p1: `من دانشجوی کارشناسی مهندسی برق دانشگاه صنعتی امیرکبیر هستم. بیشتر چیزهایی که یاد گرفته‌ام از پروژه‌هایی آمده که بار اول درست کار نکرده‌اند؛ از یک سروو که تا تنظیم درست PWM مدام می‌لرزد، تا دیکدری که در شبیه‌سازی سالم بود اما روی برد شکست می‌خورد، و حتی یک ورکر جنگو که هر شب بی‌سروصدا از کار می‌افتاد.`,
    about_p2: "من سخت‌افزاری را دوست دارم که بتوانم نتیجه‌اش را از نزدیک ببینم و درسی را که بتوانم آموزش بدهم. دو نیم‌سال دستیاری آموزشی در درس‌های الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پورفرد به من یاد داد که وقتی چیزی را برای دیگری توضیح می‌دهی، خیلی زود متوجه می‌شوی کجای فهم خودت هنوز جای کار دارد. مسیر تحصیلی من روی گرایش <strong>کنترل</strong> است و در کنار آن، حوزه <strong>الکترونیک</strong> را هم جدی دنبال می‌کنم.",
    about_p3: "این صفحه قرار نیست یک تبلیغ اغراق‌آمیز از من باشد؛ یک فهرست واقعی از چیزهایی است که ساخته‌ام و رویشان کار کرده‌ام. اگر پروژه‌ای برایتان جالب بود، مخزن آن یک کلیک فاصله دارد و تاریخچهٔ تغییراتش هم روند واقعی کار را نشان می‌دهد.",

    internships_title: "کارآموزی و پژوهش فعال",
    int_p1: "<strong>امنیت SCADA و اتوماسیون پست برق — کارآموزی موج نیرو:</strong><br />در حال گذراندن کارآموزی مهندسی در <strong>موج نیرو</strong> هستم و روی مطالعه، تحلیل و مستندسازی پست‌های متعارف، سیستم‌های DCS و معماری تله‌متری SCADA در شبکه برق ایران کار می‌کنم.",
    int_p2: "تمرکز پژوهشی فعلی من روی زنجیره پروتکل‌های <strong>IEC 61850</strong>، <strong>DNP3</strong>، <strong>IEC 60870-5-104</strong> و <strong>Modbus</strong> است. در این مسیر، روی مستندسازی تأخیر ارسال مجدد پیام‌های GOOSE در ترافیک سنگین، منطق مارشالینگ RTU، نگاشت گیت‌وی FEP و تهیهٔ ماتریس ریسک برای تهدیدهای سایبری سامانه‌های دیسپاچینگ صنعتی کار می‌کنم.",

    webdesigns_title: "طراحی وب",
    webdesigns_note: "چند رابط وب و فروشگاه که طراحی و پیاده‌سازی کرده‌ام.",
    w1_title: "فروشگاه آنلاین مهگل رزین",
    w1_desc: `موتور فروشگاهی تولیدی پرسرعت با اتصال مستقیم به ربات تلگرام برای گردش خرید بدون درز. تم بنفش سلطنتی و طلایی دقیقاً مطابق پالت برند، ارسال سفارش ناهمگام با Celery، و مدیریت موجودی لحظه‌ای دیتابیس‌محور.`,
    w1_side: "فروشگاه تولیدی · زنده",
    w2_title: "اپلیکیشن وب متیس",
    w2_desc: `یک اپلیکیشن وب مدرن ساخته‌شده با Next.js و TypeScript، با طراحی ریسپانسیو با Tailwind CSS. روی Vercel مستقر شده با خط لوله CI/CD خودکار.`,
    w2_side: "اپلیکیشن زنده · استقرار روی Vercel",

    contact_title: "ارتباط با من",
    contact_note: "تلگرام را روزانه چک می‌کنم؛ همان‌جا پیام بدهید.",
    contact_telegram: "تلگرام", contact_dm: "(پیام مستقیم باز است و معمولاً سریع پاسخ می‌دهم)",
    contact_github: "گیت‌هاب", contact_linkedin: "لینکدین", contact_email: "ایمیل",

    pal_ph: "یک فرمان بنویسید یا جستجو کنید…",
    grp_navigate: "ناوبری", grp_projects: "مخزن‌ها", grp_theme: "پوسته",
    grp_language: "زبان", grp_links: "پیوندها", grp_actions: "کنش‌ها",
    act_open_term: "باز کردن ترمینال", act_shortcuts: "میانبرهای صفحه‌کلید",
    act_copy_email: "کپی نشانی ایمیل",

    sc_title: "میانبرهای صفحه‌کلید",
    sc_palette: "باز کردن کامند پالت", sc_search: "فوکوس روی فیلتر مخزن‌ها",
    sc_theme: "چرخش پوستهٔ رنگی", sc_lang: "تغییر EN / فارسی",
    sc_term: "باز/بستن ترمینال", sc_help: "این پنجره", sc_esc: "بستن پنجره‌ها",
    sc_close: "بستن",

    toast_theme: "پوسته ← {v}", toast_lang: "زبان ← {v}",
    toast_hack: "HACK MODE فعال شد. کونامی محترم.",
    term_welcome: [
      'mahbod-os v2 — شل تعاملی',
      'برای فهرست فرمان‌ها help بنویسید.'
    ],
    term_help_rows: [
      "help              همین فهرست",
      "whoami            چه کسی پشت این سایت است",
      "ls                فهرست مخزن‌ها",
      "cat <repo>        خلاصه README یک مخزن",
      "open <repo>       باز کردن مخزن در گیت‌هاب",
      "stats             آمار زنده گیت‌هاب",
      "theme [name]      cobalt | paper | crt | ember",
      "lang [en|fa]      تغییر زبان",
      "goto <section>    پرش به work|stack|about|contact",
      "contact           راه‌های ارتباطی",
      "clear             پاک کردن صفحه",
      "exit              بستن ترمینال"
    ],
    term_unknown: 'فرمان ناشناخته: {v} — «help» را امتحان کنید',
    term_bye: "خدانگهدار."
  }
};

function t(key) {
  const lang = document.documentElement.lang === "fa" ? "fa" : "en";
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}
function fmt(key, vars) {
  let s = t(key);
  Object.keys(vars || {}).forEach(k => { s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]); });
  return s;
}

function setLang(lang) {
  const d = I18N[lang] || I18N.en;
  lang = d.lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = d.dir;
  document.title = lang === "fa"
    ? "مهبد بمانی‌چم — مهندسی برق، دانشگاه صنعتی امیرکبیر"
    : "Mahbod BemaniCham — Electrical Engineering, Amirkabir University of Technology";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (d[key] !== undefined) el.innerHTML = d[key];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (d[key] !== undefined) el.setAttribute("placeholder", d[key]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    if (d[key] !== undefined) el.setAttribute("aria-label", d[key]);
  });

  document.body.classList.toggle("fa-mode", lang === "fa");
  document.querySelectorAll(".lang-opt").forEach(o =>
    o.classList.toggle("is-active", o.dataset.l === lang));

  try { localStorage.setItem("site_lang", lang); } catch (e) {}
  if (window.App && App.onLangChange) App.onLangChange();
}

(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem("site_lang"); } catch (e) {}
  if (!saved) saved = (document.documentElement.lang === "fa" ? "fa" : "en");
  setLang(saved);

  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.addEventListener("click", () => {
    const next = (document.documentElement.lang === "fa") ? "en" : "fa";
    setLang(next);
  });
})();
