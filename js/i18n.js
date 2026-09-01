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
    nav_work: "پروژه‌ها", nav_stack: "مهارت‌ها", nav_about: "درباره من", nav_contact: "ارتباط",
    switch_language: "تغییر زبان", skip_to_index: "رفتن به فهرست پروژه‌ها",
    status_open: "آماده برای کارآموزی و همکاری",
    hero_title: 'مهندسی برق؛ از ایده تا <em>پیاده‌سازی</em>.',
    hero_lede: `دانشجوی مهندسی برق دانشگاه صنعتی امیرکبیر هستم و بیشتر از حرف‌زدن دربارهٔ ایده‌ها، به ساختن و آزمایش‌کردنشان علاقه دارم.
            روی پروژه‌هایی در حوزهٔ سیستم‌های نهفته، جمع‌آوری داده با ESP32، طراحی دیجیتال و FPGA با VHDL،
            اپلیکیشن‌های دسکتاپ Qt و سرویس‌های وب با جنگو کار می‌کنم.
            تجربهٔ دستیاری آموزشی در درس‌های الکترومغناطیس و مدارهای منطقی را هم داشته‌ام.`,
    meta_loc: "تهران، ایران",
    meta_degree: "کارشناسی مهندسی برق · گرایش کنترل",
    view_index: "مشاهده پروژه‌ها",
    count_repos: "مخزن عمومی", count_stars: "ستاره‌ها",
    count_followers: "دنبال‌کننده", count_since: "عضویت در گیت‌هاب از",
    work_title: "پروژه‌ها",
    work_note: `این بخش مستقیماً به گیت‌هاب متصل است. هر پروژه یک مخزن واقعی است و می‌توانید کد، مستندات و روند توسعهٔ آن را ببینید.
          با اضافه‌شدن مخزن جدید، اطلاعات آن هم به‌صورت خودکار در این فهرست به‌روزرسانی می‌شود.`,
    badge_syncing: "در حال همگام‌سازی…", badge_live: "متصل به گیت‌هاب", badge_offline: "نمایش آخرین نسخه",
    search_ph: "جست‌وجوی پروژه‌ها…", sort_label: "مرتب‌سازی",
    sort_pushed: "آخرین به‌روزرسانی", sort_stars: "بیشترین ستاره", sort_name: "نام الفبایی",
    chip_all: "همه",
    loading_msg: "در حال دریافت پروژه‌ها از گیت‌هاب…",
    empty_msg: "پروژه‌ای با این فیلتر پیدا نشد.",
    err_msg: "اتصال به گیت‌هاب برقرار نشد؛ آخرین اطلاعات ذخیره‌شده نمایش داده می‌شود.",
    flag_new: "جدید",
    rel_updated: "به‌روزرسانی شد",
    sync_pending: "در انتظار نخستین همگام‌سازی",
    sync_note_fmt: "همگام‌سازی خودکار از گیت‌هاب · {d}",
    copy_email: "کپی", copied_email: "ایمیل کپی شد ✓",
    footer_text: "مهبد بمانی‌چم — مهندسی برق، گرایش کنترل، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران). ۱۴۰۵.",
    footer_hint: "؟ برای میانبرها · ~ برای ترمینال",
    back_to_top: "بازگشت به بالا",

    plate_label: "مسیر فعلی",
    plate_claim: 'ترجیح می‌دهم چیزی را <em>بسازم</em> و امتحانش کنم، تا اینکه فقط دربارهٔ ساختنش حرف بزنم.',
    studying: "تحصیل",
    studying_value: "کارشناسی مهندسی برق، گرایش کنترل — دانشگاه صنعتی امیرکبیر",
    ta: "دستیار آموزشی",
    ta_value: "الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پورفرد، در دو نیم‌سال جداگانه",
    focus: "حوزهٔ تمرکز",
    focus_value: "سیستم‌های نهفته و جمع‌آوری داده، کنترل، VHDL و FPGA، اپلیکیشن‌های دسکتاپ Qt و سرویس‌های وب جنگو",

    tools_title: "ابزارهایی که واقعاً با آن‌ها کار کرده‌ام",
    tools_note: `این فهرست بر اساس تجربهٔ عملی نوشته شده، نه صرفاً چیزهایی که اسمشان را می‌دانم.
          ابزارهایی که فقط مطالعه‌شان کرده‌ام، عمداً در این بخش نیامده‌اند.`,
    tools_caption: "مجموعه ابزارهای مورد استفاده", tools_layer: "حوزه", tools_tools: "ابزارها", tools_used: "کاربرد",
    tool_silicon: "سخت‌افزار", tool_silicon_used: "پارکینگ هوشمند، قفل در و پروژه‌های Hamming",
    tool_hdl: "طراحی دیجیتال", tool_hdl_used: "پردازندهٔ بسته و آزمایشگاه مدار منطقی",
    tool_firmware: "فریم‌ور", tool_firmware_used: "پروژه‌های سیستم‌های نهفته",
    tool_application: "نرم‌افزار", tool_application_used: "اپلیکیشن‌های Qt و سرویس‌های وب",
    tool_data: "داده و زیرساخت", tool_data_used: "تله‌متری پارکینگ و بک‌اند فروشگاه",
    tool_bench: "توسعه و آزمایش", tool_bench_used: "توسعه، دیباگ و تست پروژه‌ها",

    about_title: "درباره من",
    about_p1: `من دانشجوی کارشناسی مهندسی برق دانشگاه صنعتی امیرکبیر هستم. بخش بزرگی از چیزهایی که یاد گرفته‌ام، نتیجهٔ پروژه‌هایی است که در تلاش اول درست کار نکرده‌اند؛
            از سروویی که تا پیدا کردن تنظیم درست PWM مدام می‌لرزید، تا دیکدری که در شبیه‌سازی درست بود اما روی برد جواب نمی‌داد،
            و یک سرویس جنگو که ظاهراً بدون دلیل، هر شب از کار می‌افتاد. برای من، همین خطاها بخش مهمی از فرایند یادگیری‌اند.`,
    about_p2: `به کار عملی و ساختن سیستم‌هایی علاقه دارم که بتوان نتیجهٔ کارشان را واقعاً دید و آزمایش کرد. دو نیم‌سال دستیاری آموزشی در درس‌های الکترومغناطیس و مدارهای منطقی،
            علاوه بر تجربهٔ فنی، یک چیز مهم‌تر به من یاد داد: وقتی مجبور می‌شوی یک مفهوم را برای شخص دیگری توضیح بدهی، خیلی سریع متوجه می‌شوی کدام بخش از فهم خودت هنوز کامل نیست.
            مسیر تحصیلی من در مهندسی برق روی <strong>گرایش کنترل</strong> متمرکز است و در کنار آن، <strong>الکترونیک</strong> را به‌صورت عملی دنبال می‌کنم.`,
    about_p3: `این صفحه قرار نیست رزومه‌ای پر از ادعا باشد. اینجا فهرستی از پروژه‌ها و تجربه‌های واقعی من است؛ چیزهایی که ساخته‌ام، خراب شده‌اند، اصلاحشان کرده‌ام و از آن‌ها یاد گرفته‌ام.
            اگر پروژه‌ای برایتان جالب بود، کد و تاریخچهٔ تغییراتش در مخزن همان پروژه در دسترس است.`,

    internships_title: "کارآموزی و پژوهش فعلی",
    int_p1: "<strong>امنیت SCADA و اتوماسیون پست برق — کارآموزی موج نیرو:</strong><br />در حال گذراندن کارآموزی مهندسی در <strong>موج نیرو</strong> هستم و روی مطالعه، تحلیل و مستندسازی پست‌های برق، سیستم‌های DCS و معماری تله‌متری SCADA در شبکهٔ برق ایران کار می‌کنم.",
    int_p2: "تمرکز فعلی من روی پروتکل‌های <strong>IEC 61850</strong>، <strong>DNP3</strong>، <strong>IEC 60870-5-104</strong> و <strong>Modbus</strong> است. بخشی از این کار شامل بررسی تأخیر ارسال مجدد پیام‌های GOOSE در ترافیک سنگین، منطق مارشالینگ RTU، نگاشت گیت‌وی FEP و تهیهٔ ماتریس ریسک برای تهدیدهای سایبری در سامانه‌های دیسپاچینگ صنعتی است.",

    webdesigns_title: "طراحی و توسعهٔ وب",
    webdesigns_note: "چند نمونه از رابط‌ها و سامانه‌های وبی که طراحی و پیاده‌سازی کرده‌ام.",
    w1_title: "فروشگاه آنلاین مهگل رزین",
    w1_desc: `یک فروشگاه اینترنتی تولیدی با اتصال به ربات تلگرام برای مدیریت و اطلاع‌رسانی سفارش‌ها. این پروژه شامل رابط کاربری اختصاصی با پالت بنفش و طلایی،
            پردازش ناهمگام سفارش‌ها با Celery و مدیریت موجودی بر پایهٔ داده‌های لحظه‌ای پایگاه داده است.`,
    w1_side: "فروشگاه در حال استفاده · زنده",
    w2_title: "اپلیکیشن وب متیس",
    w2_desc: `یک اپلیکیشن وب مدرن با Next.js و TypeScript، با رابط واکنش‌گرا و Tailwind CSS که روی Vercel مستقر شده و فرایند CI/CD خودکار دارد.`,
    w2_side: "اپلیکیشن زنده · استقرار روی Vercel",

    contact_title: "ارتباط با من",
    contact_note: "تلگرام را هر روز بررسی می‌کنم؛ برای ارتباط مستقیم می‌توانید همان‌جا پیام بدهید.",
    contact_telegram: "تلگرام", contact_dm: "(پیام مستقیم باز است)",
    contact_github: "گیت‌هاب", contact_linkedin: "لینکدین", contact_email: "ایمیل",

    pal_ph: "یک فرمان بنویسید یا جست‌وجو کنید…",
    grp_navigate: "ناوبری", grp_projects: "پروژه‌ها", grp_theme: "پوسته", grp_language: "زبان", grp_links: "لینک‌ها", grp_actions: "عملیات",
    act_open_term: "باز کردن ترمینال", act_shortcuts: "میانبرهای صفحه‌کلید", act_copy_email: "کپی نشانی ایمیل",

    sc_title: "میانبرهای صفحه‌کلید",
    sc_palette: "باز کردن فهرست فرمان‌ها", sc_search: "رفتن به فیلتر پروژه‌ها",
    sc_theme: "تغییر پوستهٔ رنگی", sc_lang: "تغییر EN / فارسی",
    sc_term: "باز/بستن ترمینال", sc_help: "باز کردن این پنجره", sc_esc: "بستن پنجره‌ها",
    sc_close: "بستن",

    toast_theme: "پوسته ← {v}", toast_lang: "زبان ← {v}",
    toast_hack: "HACK MODE فعال شد. کونامی هم راضی است.",
    term_welcome: [
      'mahbod-os v2 — ترمینال تعاملی',
      'برای دیدن فهرست فرمان‌ها، help را بنویسید.'
    ],
    term_help_rows: [
      "help              نمایش فهرست فرمان‌ها",
      "whoami            معرفی صاحب این سایت",
      "ls                نمایش فهرست پروژه‌ها",
      "cat <repo>        نمایش خلاصه README یک پروژه",
      "open <repo>       باز کردن مخزن در گیت‌هاب",
      "stats             نمایش آمار زندهٔ گیت‌هاب",
      "theme [name]      cobalt | paper | crt | ember",
      "lang [en|fa]      تغییر زبان",
      "goto <section>    رفتن به work|stack|about|contact",
      "contact           نمایش راه‌های ارتباطی",
      "clear             پاک کردن صفحه",
      "exit              بستن ترمینال"
    ],
    term_unknown: 'فرمان ناشناخته است: {v} — «help» را امتحان کنید',
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
