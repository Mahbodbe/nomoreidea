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
  
  p1_title: "Smart Parking DAQ System &amp; IoT Control",
  p1_desc: `End-to-end data-acquisition and control system for a multi-storey car park: RFID and ANPR two-factor vehicle authentication, ultrasonic and Hall-effect cross-verified occupancy sensing, PID-driven servo barrier with an active IR break-beam anti-pinch trigger, and live telemetry to a web dashboard and a Telegram bot. Instrumentation and Measurement course project, built with Erfan Ashkesh and Mani Mohammadi.`,
  p1_side: "Team of three · AUT",
  p2_title: "Hardware Packet Processor with Hamming ECC",
  p2_desc: `A modular RTL packet engine: SIPO/PISO serialisation layers, an ALU execution core, an 8×32 RAM block, and a finite-state control unit, wrapped in a Hamming encoder/decoder that flags, isolates and repairs single-bit inversions in transit. Digital design and control-unit architecture were my half; verification and the ECC pipeline were Parsa Bishe's.`,
  p2_side: "Two authors · digital design lead",
  p3_title: "Learning Qt",
  p3_desc: `The foundational groundwork before entering production-grade system designs. Focuses on learning Qt core layouts, widgets, signals and slots, custom dialog interactions, and compiles a complete, fully functional bilingual task manager (ToDo) with a custom, handcrafted Cyber Dark QSS stylesheet, as well as multi-document word processors and data managers. Exercises worked from <em>Getting Started with Qt 5</em>.`,
  p3_side: "Bilingual documentation · Foundation",
  p4_title: "Qt Deep Dive",
  p4_desc: `A fourteen-chapter engineering log through modern Qt desktop architecture, rebuilt rather than transcribed.
              <strong>Chapter 1 (ToDo)</strong> — a component-driven task manager running on pointer-to-member signals with lambda event capture;
              <strong>Chapter 2 (SysInfo)</strong> — a cross-platform hardware monitor reading
              <code class="mono">/proc/stat</code>, <code class="mono">GetSystemTimes</code>, and Mach host statistics behind a unified polymorphic singleton with live Qt Charts visualizations;
              <strong>Chapter 3 (gallery-core)</strong> — a modular database-driven shared library containing domain models, a secure Meyers-singleton DatabaseManager, and thread-safe Model/View adapters.`,
  p4_side: "In progress · 3 of 14 chapters · Dual-Screenshot",
  p5_title: "Smart Door Lock System",
  p5_desc: `An access-control build assembled module by module rather than all at once: MFRC522 RFID read/write and card identification, PIR presence detection at the door, an optical break-beam barrier for entry and exit tracking, and relay-switched electric lock actuation. Each module has its own test phase in the repository before integration.`,
  p5_side: "Phased hardware build",
  w1_title: "Mahgol Resin E-Commerce Storefront",
  w1_desc: `A high-performance production e-commerce engine integrated with an active Telegram notification bot for seamless purchase workflows. Features a royal purple and gold theme customized to match the brand's exact design palette, asynchronous order dispatching with Celery, and real-time database-driven product inventory management.`,
  w1_side: "Production-grade storefront · Template active",
  w2_title: "Minimalist Portfolio &amp; Project Index",
  w2_desc: `A pristine, high-contrast digital index engineered with pure CSS custom properties, flexible responsive column-collapsing, and verified with zero-issue CDP automation. Optimized to serve as a fast-loading central portal for engineering logs, academic coursework, and live software demos.`,
  w2_side: "Custom UI template · Ready to route",
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
  int_p1: `<strong>SCADA Security &amp; Substation Automation (Modje Niroo Internship):</strong><br />
            I am currently passing an engineering internship at <strong>Modje Niroo</strong>,
            actively analyzing, studying, and documenting conventional substations, DCS
            (Distributed Control Systems), and national SCADA telemetry layouts in Iran's power grid.`,
  int_p2: `My current research focuses on the <strong>IEC 61850</strong>, <strong>DNP3</strong>,
            <strong>IEC 60870-5-104</strong>, and <strong>Modbus</strong> protocol chains. Specifically,
            I am compiling detailed technical logs on GOOSE message retransmission latency under heavy
            traffic spikes, RTU marshalling logic, FEP gateway mapping, and compiling risk matrices
            for potential cybersecurity threat vectors on industrial dispatching.`,

  contact_note: "Telegram is checked daily. Drop a direct message there."
  },
  fa: {
    dir: "rtl", lang: "fa",
    brand: "مهبد بمانی‌چم",
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
  
  p1_title: "سیستم جمع‌آوری داده پارکینگ هوشمند و کنترل IoT",
  p1_desc: `سیستم جامع جمع‌آوری داده و کنترل برای یک پارکینگ چندطبقه: احراز هویت دومرحله‌ای خودرو با RFID و پلاک‌خوانی (ANPR)، سنسورهای اشغال‌سنج اولتراسونیک و اثر هال با راستی‌آزمایی متقاطع، بازوی باریر سروو با کنترل PID و تریگر ایمنی ضدِ‌گیرش مادون قرمز، و تله‌متری زنده روی داشبورد وب و ربات تلگرام. پروژه درس ابزار اندازه‌گیری، ساخته‌شده با عرفان آشکش و مانی محمدی.`,
  p1_side: "تیم سه‌نفره · امیرکبیر",

  p2_title: "پردازنده سخت‌افزاری بسته با تصحیح خطای همینگ",
  p2_desc: `موتور بستهٔ RTL ماژولار: لایه‌های سریال‌سازی SIPO/PISO، هسته اجرایی ALU، بلوک RAM ۸×۳۲، و یونیت کنترل حالت-محدود، همه در قالب انکودر/دیکودر همینگ که خطاهای تک‌بیتی حین انتقال را علامت‌گذاری، ایزوله و ترمیم می‌کند. طراحی دیجیتال و معماری یونیت کنترل سهم من بود؛ وریفیکیشن و پایپ‌لاین ECC کار پارسا بیشه.`,
  p2_side: "دو نویسنده · سرپرست طراحی دیجیتال",

  p3_title: "یادگیری Qt",
  p3_desc: `زمین بازی قبل از ورود به طراحی‌های تولیدی: چیدمان ویجت‌ها، سیگنال و اسلات، تعامل دیالوگ‌ها، و ساخت یک تسک‌منیجر دوزبانه کامل با استایل دست‌ساز Cyber Dark QSS، به‌همراه پردازنده‌های چندسندی و مدیریت داده. تمرین‌ها از کتاب <em>Getting Started with Qt 5</em> کار شده‌اند.`,
  p3_side: "داکیومنت دوزبانه · پایه",

  p4_title: "Qt Deep Dive",
  p4_desc: `لاگ مهندسی چهارده‌فصلی معماری مدرن دسکتاپ کیوت — بازسازی از صفر نه رونویسی.
              <strong>فصل ۱ (ToDo)</strong> — تسک‌منیجر کامپوننت‌محور روی سیگنال‌های اشاره‌گر-به-عضو با کپچر لامبدا؛
              <strong>فصل ۲ (SysInfo)</strong> — مانیتور سخت‌افزار چندسکویی خواندن
              <code class="mono">/proc/stat</code> و <code class="mono">GetSystemTimes</code> و آمار هاست Mach پشت یک سینگلتون چندریختی با نمودارهای زندهٔ Qt Charts؛
              <strong>فصل ۳ (gallery-core)</strong> — کتابخانهٔ اشتراکی دیتابیس‌محور شامل مدل‌های دامنه، DatabaseManager سینگلتون امن، و آداپتورهای Model/View ترید-سیف.`,
  p4_side: "در حال انجام · ۳ از ۱۴ فصل · دو اسکرین‌شات",

  p5_title: "قفل درب هوشمند",
  p5_desc: `ساخت سیستم کنترل دسترسی ماژولار — نه همه با هم: خواندن/نوشتن و شناسایی کارت MFRC522 RFID، تشخیص حضور PIR پشت در، بریک‌بین نوری برای شمارش ورود/خروج، و فعال‌سازی قفل برقی با رله. هر ماژول فاز تست مستقل خودش را در مخزن دارد، قبل از یکپارچه‌سازی.`,
  p5_side: "ساخت سخت‌افزار مرحله‌ای",

  w1_title: "فروشگاه آنلاین مهگل رزین",
  w1_desc: `موتور فروشگاهی تولیدی پرسرعت با اتصال مستقیم به ربات تلگرام برای گردش خرید بدون درز. تم بنفش سلطنتی و طلایی دقیقاً مطابق پالت برند، ارسال سفارش ناهمگام با Celery، و مدیریت موجودی لحظه‌ای دیتابیس‌محور.`,
  w1_side: "فروشگاه تولیدی · قالب فعال",

  w2_title: "پورتفولیوی مینیمال و ایندکس پروژه",
  w2_desc: `ایندکس دیجیتال پرکنتراست ساخته‌شده با متغیرهای CSS خالص، فروپاشی ستون ریسپانسیو، و راستی‌آزمایی صفر-خطا با اتوماسیون CDP. بهینه برای پرتال مرکزیِ لاگ‌های مهندسی، coursework دانشگاهی و دموهای نرم‌افزار.`,
  w2_side: "قالب UI اختصاصی · آماده اتصال",

  tools_note: `بر اساس جایگاهشان در پروژه دسته‌بندی شده‌اند، نه بر اساس جذاب بودن نامشان.
          هر چیزی که فقط درباره‌اش خوانده باشم، اینجا نیست.`,

  about_p1: `من دانشجوی کارشناسی مهندسی برق دانشگاه صنعتی امیرکبیر هستم. بیشتر چیزهایی که می‌دانم از پروژه‌هایی آمده که بار اول جواب ندادند — سروویی که تا کانال PWM درست نشده بود می‌لرزید، دیکدری که در شبیه‌سازی پاس می‌شد و روی برد خراب می‌کرد، و ورکر جنگویی که هر شب ساعت سه بی‌صدا می‌مرد.`,
  about_p2: `سخت‌افزاری را ترجیح می‌دهم که لمسش کنی و درسی را که بتوانی تدریسش کنی. دو نیم‌سال دستیاری آموزشی — الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پوردرد — یادم داد که توضیح‌دادنِ دوبارهٔ یک مفهوم، سریع‌ترین راه پیدا کردن حفرهٔ فهم خودت است. مسیر تحصیلی‌ام روی گرایش <strong>کنترل</strong> سوار است و با <strong>ماینور الکترونیک</strong> تقویت شده.`,
  about_p3: `این صفحه یک ایندکس است، نه یک پچ‌پچ. اگر چیزی از این‌ها برایتان مهم بود، ریپو یک کلیک فاصله دارد و تاریخچهٔ کامیت‌ها دربارهٔ زمان واقعیِ ساخت صادق است.`,

  int_p1: `<strong>امنیت SCADA و اتوماسیون پست فشارقوی (کارآموزی موج نیرو):</strong><br />
            در حال گذراندن کارآموزی مهندسی در <strong>موج نیرو</strong> هستم؛ تحلیل، مطالعه و مستندسازی پست‌های متعارف، سیستم‌های DCS (کنترل توزیع‌شده) و چیدمان تله‌متری SCADA ملی شبکه برق ایران.`,
  int_p2: `پژوهش فعلی‌ام روی زنجیره پروتکل‌های <strong>IEC 61850</strong>، <strong>DNP3</strong>،
            <strong>IEC 60870-5-104</strong> و <strong>Modbus</strong> است. مشخصاً روی تدوین لاگ‌های فنی تأخیر ارسال مجدد GOOSE زیر ترافیک سنگین، منطق مارشالینگ RTU، نگاشت گیت‌وی FEP و تهیه ماتریس ریسک برای بردارهای تهدید سایبری روی دیسپاچینگ صنعتی کار می‌کنم.`,
  p1_title: "سیستم جمع‌آوری داده پارکینگ هوشمند و کنترل IoT",
  p1_desc: `سیستم جامع جمع‌آوری داده و کنترل برای یک پارکینگ چندطبقه: احراز هویت دومرحله‌ای خودرو با RFID و پلاک‌خوانی (ANPR)، سنسورهای اشغال‌سنج اولتراسونیک و اثر هال با راستی‌آزمایی متقاطع، بازوی باریر سروو با کنترل PID و تریگر ایمنی ضدِ‌گیرش مادون قرمز، و تله‌متری زنده روی داشبورد وب و ربات تلگرام. پروژه درس ابزار اندازه‌گیری، ساخته‌شده با عرفان آشکش و مانی محمدی.`,
  p1_side: "تیم سه‌نفره · امیرکبیر",

  p2_title: "پردازنده سخت‌افزاری بسته با تصحیح خطای همینگ",
  p2_desc: `موتور بستهٔ RTL ماژولار: لایه‌های سریال‌سازی SIPO/PISO، هسته اجرایی ALU، بلوک RAM ۸×۳۲، و یونیت کنترل حالت-محدود، همه در قالب انکودر/دیکودر همینگ که خطاهای تک‌بیتی حین انتقال را علامت‌گذاری، ایزوله و ترمیم می‌کند. طراحی دیجیتال و معماری یونیت کنترل سهم من بود؛ وریفیکیشن و پایپ‌لاین ECC کار پارسا بیشه.`,
  p2_side: "دو نویسنده · سرپرست طراحی دیجیتال",

  p3_title: "یادگیری Qt",
  p3_desc: `زمین بازی قبل از ورود به طراحی‌های تولیدی: چیدمان ویجت‌ها، سیگنال و اسلات، تعامل دیالوگ‌ها، و ساخت یک تسک‌منیجر دوزبانه کامل با استایل دست‌ساز Cyber Dark QSS، به‌همراه پردازنده‌های چندسندی و مدیریت داده. تمرین‌ها از کتاب <em>Getting Started with Qt 5</em> کار شده‌اند.`,
  p3_side: "داکیومنت دوزبانه · پایه",

  p4_title: "Qt Deep Dive",
  p4_desc: `لاگ مهندسی چهارده‌فصلی معماری مدرن دسکتاپ کیوت — بازسازی از صفر نه رونویسی.
              <strong>فصل ۱ (ToDo)</strong> — تسک‌منیجر کامپوننت‌محور روی سیگنال‌های اشاره‌گر-به-عضو با کپچر لامبدا؛
              <strong>فصل ۲ (SysInfo)</strong> — مانیتور سخت‌افزار چندسکویی خواندن
              <code class="mono">/proc/stat</code> و <code class="mono">GetSystemTimes</code> و آمار هاست Mach پشت یک سینگلتون چندریختی با نمودارهای زندهٔ Qt Charts؛
              <strong>فصل ۳ (gallery-core)</strong> — کتابخانهٔ اشتراکی دیتابیس‌محور شامل مدل‌های دامنه، DatabaseManager سینگلتون امن، و آداپتورهای Model/View ترید-سیف.`,
  p4_side: "در حال انجام · ۳ از ۱۴ فصل · دو اسکرین‌شات",

  p5_title: "قفل درب هوشمند",
  p5_desc: `ساخت سیستم کنترل دسترسی ماژولار — نه همه با هم: خواندن/نوشتن و شناسایی کارت MFRC522 RFID، تشخیص حضور PIR پشت در، بریک‌بین نوری برای شمارش ورود/خروج، و فعال‌سازی قفل برقی با رله. هر ماژول فاز تست مستقل خودش را در مخزن دارد، قبل از یکپارچه‌سازی.`,
  p5_side: "ساخت سخت‌افزار مرحله‌ای",

  w1_title: "فروشگاه آنلاین مهگل رزین",
  w1_desc: `موتور فروشگاهی تولیدی پرسرعت با اتصال مستقیم به ربات تلگرام برای گردش خرید بدون درز. تم بنفش سلطنتی و طلایی دقیقاً مطابق پالت برند، ارسال سفارش ناهمگام با Celery، و مدیریت موجودی لحظه‌ای دیتابیس‌محور.`,
  w1_side: "فروشگاه تولیدی · قالب فعال",

  w2_title: "پورتفولیوی مینیمال و ایندکس پروژه",
  w2_desc: `ایندکس دیجیتال پرکنتراست ساخته‌شده با متغیرهای CSS خالص، فروپاشی ستون ریسپانسیو، و راستی‌آزمایی صفر-خطا با اتوماسیون CDP. بهینه برای پرتال مرکزیِ لاگ‌های مهندسی، coursework دانشگاهی و دموهای نرم‌افزار.`,
  w2_side: "قالب UI اختصاصی · آماده اتصال",

  tools_note: `بر اساس جایگاهشان در پروژه دسته‌بندی شده‌اند، نه بر اساس جذاب بودن نامشان.
          هر چیزی که فقط درباره‌اش خوانده باشم، اینجا نیست.`,

  about_p1: `من دانشجوی کارشناسی مهندسی برق دانشگاه صنعتی امیرکبیر هستم. بیشتر چیزهایی که می‌دانم از پروژه‌هایی آمده که بار اول جواب ندادند — سروویی که تا کانال PWM درست نشده بود می‌لرزید، دیکدری که در شبیه‌سازی پاس می‌شد و روی برد خراب می‌کرد، و ورکر جنگویی که هر شب ساعت سه بی‌صدا می‌مرد.`,
  about_p2: `سخت‌افزاری را ترجیح می‌دهم که لمسش کنی و درسی را که بتوانی تدریسش کنی. دو نیم‌سال دستیاری آموزشی — الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پوردرد — یادم داد که توضیح‌دادنِ دوبارهٔ یک مفهوم، سریع‌ترین راه پیدا کردن حفرهٔ فهم خودت است. مسیر تحصیلی‌ام روی گرایش <strong>کنترل</strong> سوار است و با <strong>ماینور الکترونیک</strong> تقویت شده.`,
  about_p3: `این صفحه یک ایندکس است، نه یک پچ‌پچ. اگر چیزی از این‌ها برایتان مهم بود، ریپو یک کلیک فاصله دارد و تاریخچهٔ کامیت‌ها دربارهٔ زمان واقعیِ ساخت صادق است.`,

  int_p1: `<strong>امنیت SCADA و اتوماسیون پست فشارقوی (کارآموزی موج نیرو):</strong><br />
            در حال گذراندن کارآموزی مهندسی در <strong>موج نیرو</strong> هستم؛ تحلیل، مطالعه و مستندسازی پست‌های متعارف، سیستم‌های DCS (کنترل توزیع‌شده) و چیدمان تله‌متری SCADA ملی شبکه برق ایران.`,
  int_p2: `پژوهش فعلی‌ام روی زنجیره پروتکل‌های <strong>IEC 61850</strong>، <strong>DNP3</strong>،
            <strong>IEC 60870-5-104</strong> و <strong>Modbus</strong> است. مشخصاً روی تدوین لاگ‌های فنی تأخیر ارسال مجدد GOOSE زیر ترافیک سنگین، منطق مارشالینگ RTU، نگاشت گیت‌وی FEP و تهیه ماتریس ریسک برای بردارهای تهدید سایبری روی دیسپاچینگ صنعتی کار می‌کنم.`,
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
