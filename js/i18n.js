/* ── i18n dictionary v2 ──────────────────────────────────────── */
const I18N = {
  en: {
    dir: "ltr", lang: "en",
    brand: "Mahbod BemaniCham",
    nav_work: "Projects", nav_stack: "Skills", nav_about: "About", nav_contact: "Contact",
    switch_language: "Switch language", skip_to_index: "Skip to projects",
    status_open: "Open to internships & collaborations",
    hero_title: 'electrical engineering, from ideas to <em>working systems</em>.',
    hero_lede: `Electrical engineering undergraduate at Amirkabir University of Technology (Tehran Polytechnic).
            I enjoy turning ideas into systems I can build, test, and debug — from ESP32-based data acquisition
            and VHDL/FPGA projects to Qt desktop applications and Django services.
            I have also worked as a teaching assistant for Electromagnetics and Digital Logic Design.`,
    meta_loc: "Tehran, Iran",
    meta_degree: "B.Sc. Electrical Engineering · Control",
    view_index: "View projects",
    count_repos: "Public repositories", count_stars: "Stars", count_followers: "Followers", count_since: "On GitHub since",
    work_title: "projects",
    work_note: `This section is connected directly to GitHub. Each entry is a real repository with its code, documentation, and development history available to explore.
          New repositories are picked up automatically and added to the list.`,
    badge_syncing: "syncing…", badge_live: "connected to GitHub", badge_offline: "showing last snapshot",
    search_ph: "Search projects…", sort_label: "sort",
    sort_pushed: "Recently updated", sort_stars: "Most starred", sort_name: "Name A→Z",
    chip_all: "all", loading_msg: "loading projects from GitHub…",
    empty_msg: "No projects match this filter.",
    err_msg: "GitHub could not be reached — showing the last saved snapshot.",
    flag_new: "new", rel_updated: "updated", sync_pending: "waiting for first sync",
    sync_note_fmt: "auto-synced from GitHub · {d}",
    copy_email: "copy", copied_email: "email copied ✓",
    footer_text: "Mahbod BemaniCham — Electrical Engineering, Control, Amirkabir University of Technology (Tehran Polytechnic), Tehran. 2026.",
    footer_hint: "? for shortcuts · ~ for terminal", back_to_top: "Back to top",

    plate_label: "Current path",
    plate_claim: 'I would rather <em>build</em> something and test it than just talk about building it.',
    studying: "Education",
    studying_value: "B.Sc. Electrical Engineering, Control — Amirkabir University of Technology",
    ta: "Teaching assistant",
    ta_value: "Electromagnetics with Dr. Askarpour and Digital Logic Design with Dr. Pourfard, across two semesters",
    focus: "Focus",
    focus_value: "Embedded systems and data acquisition, control, VHDL and FPGA, Qt desktop applications, and Django web services",

    tools_title: "what i actually work with",
    tools_note: `This list is based on hands-on experience, not just familiarity with a technology.
          If I have only read about something, it is deliberately left out.`,
    tools_caption: "Tools I use", tools_layer: "Area", tools_tools: "Tools", tools_used: "Used in",
    tool_silicon: "Hardware", tool_silicon_used: "Smart parking, door lock, Hamming projects",
    tool_hdl: "Digital design", tool_hdl_used: "Packet processor, digital logic lab",
    tool_firmware: "Firmware", tool_firmware_used: "Embedded systems projects",
    tool_application: "Software", tool_application_used: "Qt applications and web services",
    tool_data: "Data & infrastructure", tool_data_used: "Parking telemetry and shop backend",
    tool_bench: "Development & testing", tool_bench_used: "Development, debugging, and testing",

    about_title: "about me",
    about_p1: `I am an electrical engineering undergraduate at Amirkabir University of Technology. A large part of what I have learned has come from projects that did not work on the first try —
            a servo that kept jittering until I found the right PWM setup, a decoder that worked in simulation but failed on the board,
            and a Django service that somehow managed to stop running every night. For me, those failures are part of the engineering process.`,
    about_p2: `I like practical work and systems whose behavior can be seen, measured, and tested. Two semesters as a teaching assistant in Electromagnetics and Digital Logic Design
            also taught me something beyond the technical material: explaining a concept to someone else is a fast way to discover the parts of your own understanding that are still incomplete.
            My degree is focused on <strong>Control</strong>, while I continue to build practical experience in <strong>Electronics</strong>.`,
    about_p3: `This page is not meant to be a list of impressive-sounding claims. It is a collection of projects and experiences I have actually worked on — things I have built, broken, fixed, and learned from.
            If a project catches your attention, its repository contains the code and development history.`,

    internships_title: "internship & current research",
    int_p1: "<strong>SCADA Security &amp; Substation Automation — Modje Niroo Internship:</strong><br />I am currently completing an engineering internship at <strong>Modje Niroo</strong>, working on the study, analysis, and documentation of power substations, DCS architectures, and SCADA telemetry in Iran's power grid.",
    int_p2: "My current work focuses on <strong>IEC 61850</strong>, <strong>DNP3</strong>, <strong>IEC 60870-5-104</strong>, and <strong>Modbus</strong>. This includes studying GOOSE retransmission latency under heavy traffic, RTU marshalling logic, FEP gateway mapping, and building risk matrices for cybersecurity threats in industrial dispatch systems.",

    webdesigns_title: "web development",
    webdesigns_note: "A few web interfaces and systems I have designed and built.",
    w1_title: "Mahgol Resin Online Store",
    w1_desc: `A production e-commerce system connected to a Telegram bot for order management and notifications. The project includes a custom purple-and-gold interface,
            asynchronous order processing with Celery, and database-driven inventory management.`,
    w1_side: "Production store · Live",
    w2_title: "Metis Web Application",
    w2_desc: `A modern web application built with Next.js and TypeScript, with a responsive interface using Tailwind CSS. Deployed on Vercel with an automated CI/CD workflow.`,
    w2_side: "Live application · Vercel",

    contact_title: "get in touch",
    contact_note: "I check Telegram every day. For a direct conversation, send me a message there.",
    contact_telegram: "Telegram", contact_dm: "(DMs are open)",
    contact_github: "GitHub", contact_linkedin: "LinkedIn", contact_email: "Email",

    pal_ph: "Type a command or search…",
    grp_navigate: "navigate", grp_projects: "projects", grp_theme: "theme", grp_language: "language", grp_links: "links", grp_actions: "actions",
    act_open_term: "Open terminal", act_shortcuts: "Keyboard shortcuts", act_copy_email: "Copy email address",

    sc_title: "keyboard shortcuts", sc_palette: "Open command palette", sc_search: "Focus project filter",
    sc_theme: "Change color theme", sc_lang: "Switch EN / فارسی", sc_term: "Open/close terminal", sc_help: "Open this dialog", sc_esc: "Close overlays",
    sc_close: "close",

    toast_theme: "theme → {v}", toast_lang: "language → {v}", toast_hack: "HACK MODE enabled. Konami approved.",
    term_welcome: [
      'mahbod-os v2 — interactive terminal',
      'Type "help" to see the available commands.'
    ],
    term_help_rows: [
      "help              show available commands",
      "whoami            introduce the person behind this site",
      "ls                list projects",
      "cat <repo>        show a project's README summary",
      "open <repo>       open the repository on GitHub",
      "stats             show live GitHub stats",
      "theme [name]      cobalt | paper | crt | ember",
      "lang [en|fa]      switch language",
      "goto <section>    jump to work|stack|about|contact",
      "contact           show contact options",
      "clear             clear the terminal",
      "exit              close the terminal"
    ],
    term_unknown: "Unknown command: {v} — try \"help\"",
    term_bye: "Goodbye."
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
    meta_loc: "تهران، ایران", meta_degree: "کارشناسی مهندسی برق · گرایش کنترل", view_index: "مشاهده پروژه‌ها",
    count_repos: "مخزن عمومی", count_stars: "ستاره‌ها", count_followers: "دنبال‌کننده", count_since: "عضویت در گیت‌هاب از",
    work_title: "پروژه‌ها",
    work_note: `این بخش مستقیماً به گیت‌هاب متصل است. هر پروژه یک مخزن واقعی است و می‌توانید کد، مستندات و روند توسعهٔ آن را ببینید.
          با اضافه‌شدن مخزن جدید، اطلاعات آن هم به‌صورت خودکار در این فهرست به‌روزرسانی می‌شود.`,
    badge_syncing: "در حال همگام‌سازی…", badge_live: "متصل به گیت‌هاب", badge_offline: "نمایش آخرین نسخه", search_ph: "جست‌وجوی پروژه‌ها…", sort_label: "مرتب‌سازی",
    sort_pushed: "آخرین به‌روزرسانی", sort_stars: "بیشترین ستاره", sort_name: "نام الفبایی", chip_all: "همه", loading_msg: "در حال دریافت پروژه‌ها از گیت‌هاب…",
    empty_msg: "پروژه‌ای با این فیلتر پیدا نشد.", err_msg: "اتصال به گیت‌هاب برقرار نشد؛ آخرین اطلاعات ذخیره‌شده نمایش داده می‌شود.", flag_new: "جدید", rel_updated: "به‌روزرسانی شد",
    sync_pending: "در انتظار نخستین همگام‌سازی", sync_note_fmt: "همگام‌سازی خودکار از گیت‌هاب · {d}", copy_email: "کپی", copied_email: "ایمیل کپی شد ✓",
    footer_text: "مهبد بمانی‌چم — مهندسی برق، گرایش کنترل، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران). ۱۴۰۵.", footer_hint: "؟ برای میانبرها · ~ برای ترمینال", back_to_top: "بازگشت به بالا",
    plate_label: "مسیر فعلی", plate_claim: 'ترجیح می‌دهم چیزی را <em>بسازم</em> و امتحانش کنم، تا اینکه فقط دربارهٔ ساختنش حرف بزنم.',
    studying: "تحصیل", studying_value: "کارشناسی مهندسی برق، گرایش کنترل — دانشگاه صنعتی امیرکبیر", ta: "دستیار آموزشی",
    ta_value: "الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پورفرد، در دو نیم‌سال جداگانه", focus: "حوزهٔ تمرکز",
    focus_value: "سیستم‌های نهفته و جمع‌آوری داده، کنترل، VHDL و FPGA، اپلیکیشن‌های دسکتاپ Qt و سرویس‌های وب جنگو",
    tools_title: "ابزارهایی که واقعاً با آن‌ها کار کرده‌ام", tools_note: `این فهرست بر اساس تجربهٔ عملی نوشته شده، نه صرفاً چیزهایی که اسمشان را می‌دانم.
          ابزارهایی که فقط مطالعه‌شان کرده‌ام، عمداً در این بخش نیامده‌اند.`,
    tools_caption: "مجموعه ابزارهای مورد استفاده", tools_layer: "حوزه", tools_tools: "ابزارها", tools_used: "کاربرد",
    tool_silicon: "سخت‌افزار", tool_silicon_used: "پارکینگ هوشمند، قفل در و پروژه‌های Hamming", tool_hdl: "طراحی دیجیتال", tool_hdl_used: "پردازندهٔ بسته و آزمایشگاه مدار منطقی",
    tool_firmware: "فریم‌ور", tool_firmware_used: "پروژه‌های سیستم‌های نهفته", tool_application: "نرم‌افزار", tool_application_used: "اپلیکیشن‌های Qt و سرویس‌های وب",
    tool_data: "داده و زیرساخت", tool_data_used: "تله‌متری پارکینگ و بک‌اند فروشگاه", tool_bench: "توسعه و آزمایش", tool_bench_used: "توسعه، دیباگ و تست پروژه‌ها",
    about_title: "درباره من",
    about_p1: `من دانشجوی کارشناسی مهندسی برق دانشگاه صنعتی امیرکبیر هستم. بخش بزرگی از چیزهایی که یاد گرفته‌ام، نتیجهٔ پروژه‌هایی است که در تلاش اول درست کار نکرده‌اند؛ از سروویی که تا پیدا کردن تنظیم درست PWM مدام می‌لرزید، تا دیکدری که در شبیه‌سازی درست بود اما روی برد جواب نمی‌داد، و یک سرویس جنگو که ظاهراً بدون دلیل، هر شب از کار می‌افتاد. برای من، همین خطاها بخش مهمی از فرایند یادگیری‌اند.`,
    about_p2: `به کار عملی و ساختن سیستم‌هایی علاقه دارم که بتوان نتیجهٔ کارشان را واقعاً دید و آزمایش کرد. دو نیم‌سال دستیاری آموزشی در درس‌های الکترومغناطیس و مدارهای منطقی، علاوه بر تجربهٔ فنی، یک چیز مهم‌تر به من یاد داد: وقتی مجبور می‌شوی یک مفهوم را برای شخص دیگری توضیح بدهی، خیلی سریع متوجه می‌شوی کدام بخش از فهم خودت هنوز کامل نیست. مسیر تحصیلی من در مهندسی برق روی <strong>گرایش کنترل</strong> متمرکز است و در کنار آن، <strong>الکترونیک</strong> را به‌صورت عملی دنبال می‌کنم.`,
    about_p3: `این صفحه قرار نیست رزومه‌ای پر از ادعا باشد. اینجا فهرستی از پروژه‌ها و تجربه‌های واقعی من است؛ چیزهایی که ساخته‌ام، خراب شده‌اند، اصلاحشان کرده‌ام و از آن‌ها یاد گرفته‌ام. اگر پروژه‌ای برایتان جالب بود، کد و تاریخچهٔ تغییراتش در مخزن همان پروژه در دسترس است.`,
    internships_title: "کارآموزی و پژوهش فعلی",
    int_p1: "<strong>امنیت SCADA و اتوماسیون پست برق — کارآموزی موج نیرو:</strong><br />در حال گذراندن کارآموزی مهندسی در <strong>موج نیرو</strong> هستم و روی مطالعه، تحلیل و مستندسازی پست‌های برق، سیستم‌های DCS و معماری تله‌متری SCADA در شبکهٔ برق ایران کار می‌کنم.",
    int_p2: "تمرکز فعلی من روی پروتکل‌های <strong>IEC 61850</strong>، <strong>DNP3</strong>، <strong>IEC 60870-5-104</strong> و <strong>Modbus</strong> است. بخشی از این کار شامل بررسی تأخیر ارسال مجدد پیام‌های GOOSE در ترافیک سنگین، منطق مارشالینگ RTU، نگاشت گیت‌وی FEP و تهیهٔ ماتریس ریسک برای تهدیدهای سایبری در سامانه‌های دیسپاچینگ صنعتی است.",
    webdesigns_title: "طراحی و توسعهٔ وب", webdesigns_note: "چند نمونه از رابط‌ها و سامانه‌های وبی که طراحی و پیاده‌سازی کرده‌ام.",
    w1_title: "فروشگاه آنلاین مهگل رزین", w1_desc: `یک فروشگاه اینترنتی تولیدی با اتصال به ربات تلگرام برای مدیریت و اطلاع‌رسانی سفارش‌ها. این پروژه شامل رابط کاربری اختصاصی با پالت بنفش و طلایی، پردازش ناهمگام سفارش‌ها با Celery و مدیریت موجودی بر پایهٔ داده‌های لحظه‌ای پایگاه داده است.`,
    w1_side: "فروشگاه در حال استفاده · زنده", w2_title: "اپلیکیشن وب متیس", w2_desc: `یک اپلیکیشن وب مدرن با Next.js و TypeScript، با رابط واکنش‌گرا و Tailwind CSS که روی Vercel مستقر شده و فرایند CI/CD خودکار دارد.`, w2_side: "اپلیکیشن زنده · استقرار روی Vercel",
    contact_title: "ارتباط با من", contact_note: "تلگرام را هر روز بررسی می‌کنم؛ برای ارتباط مستقیم می‌توانید همان‌جا پیام بدهید.", contact_telegram: "تلگرام", contact_dm: "(پیام مستقیم باز است)", contact_github: "گیت‌هاب", contact_linkedin: "لینکدین", contact_email: "ایمیل",
    pal_ph: "یک فرمان بنویسید یا جست‌وجو کنید…", grp_navigate: "ناوبری", grp_projects: "پروژه‌ها", grp_theme: "پوسته", grp_language: "زبان", grp_links: "لینک‌ها", grp_actions: "عملیات",
    act_open_term: "باز کردن ترمینال", act_shortcuts: "میانبرهای صفحه‌کلید", act_copy_email: "کپی نشانی ایمیل", sc_title: "میانبرهای صفحه‌کلید", sc_palette: "باز کردن فهرست فرمان‌ها", sc_search: "رفتن به فیلتر پروژه‌ها", sc_theme: "تغییر پوستهٔ رنگی", sc_lang: "تغییر EN / فارسی", sc_term: "باز/بستن ترمینال", sc_help: "باز کردن این پنجره", sc_esc: "بستن پنجره‌ها", sc_close: "بستن",
    toast_theme: "پوسته ← {v}", toast_lang: "زبان ← {v}", toast_hack: "HACK MODE فعال شد. کونامی هم راضی است.", term_welcome: ['mahbod-os v2 — ترمینال تعاملی', 'برای دیدن فهرست فرمان‌ها، help را بنویسید.'],
    term_help_rows: ["help              نمایش فهرست فرمان‌ها", "whoami            معرفی صاحب این سایت", "ls                نمایش فهرست پروژه‌ها", "cat <repo>        نمایش خلاصه README یک پروژه", "open <repo>       باز کردن مخزن در گیت‌هاب", "stats             نمایش آمار زندهٔ گیت‌هاب", "theme [name]      cobalt | paper | crt | ember", "lang [en|fa]      تغییر زبان", "goto <section>    رفتن به work|stack|about|contact", "contact           نمایش راه‌های ارتباطی", "clear             پاک کردن صفحه", "exit              بستن ترمینال"],
    term_unknown: 'فرمان ناشناخته است: {v} — «help» را امتحان کنید', term_bye: "خدانگهدار."
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
  document.querySelectorAll(".lang-opt").forEach(o => o.classList.toggle("is-active", o.dataset.l === lang));
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
