from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
index_path = ROOT / "index.html"
i18n_path = ROOT / "js" / "i18n.js"
readme_path = ROOT / "README.md"
site_css_path = ROOT / "css" / "site.css"

def replace_once(text, old, new):
    if old not in text:
        raise RuntimeError(f"Expected fragment not found: {old[:100]!r}")
    return text.replace(old, new)

# ---------- HTML cleanup ----------
html = index_path.read_text(encoding="utf-8")
html = replace_once(html, '''          </div>\n        </a>\n        </div>\n\n        <!-- 3. Learning Qt''', '''          </div>\n        </div>\n\n        <!-- 3. Learning Qt''')

for old, new in {
    'class="row__thumb" style="display: flex; align-items: center; justify-content: center; background: var(--color-paper-3);"': 'class="row__thumb row__thumb--placeholder"',
    'style="font-family: var(--font-label); font-size: var(--text-xs); color: var(--color-muted); text-align: center; padding: var(--space-md);"': 'class="row__placeholder-label"',
    'style="font-family: var(--font-label); font-size: var(--text-xs); color: var(--color-muted); text-align: center; padding: var(--space-md); text-transform: uppercase; letter-spacing: 0.06em;"': 'class="row__placeholder-label row__placeholder-label--caps"',
    'class="row__thumb-split" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-xs); width: 100%; aspect-ratio: 1.6;"': 'class="row__thumb-split"',
    'class="row__thumb" style="border: 0; box-shadow: none; aspect-ratio: auto; height: 100%; overflow: clip;"': 'class="row__thumb row__thumb--split"',
    ' style="height: 100%; width: 100%; object-fit: cover;"': '',
    'class="index" style="border-bottom: var(--rule-hair) solid var(--color-rule);"': 'class="index index--bordered"',
    'style="text-transform:none"': 'class="label label--normal"',
}.items():
    html = html.replace(old, new)

hooks = {
    '<a class="skip" href="#index">Skip to the index</a>': '<a class="skip" href="#index" data-i18n="skip_to_index">Skip to the index</a>',
    '<button class="lang-toggle" id="langToggle" type="button" aria-label="Switch language">': '<button class="lang-toggle" id="langToggle" type="button" aria-label="Switch language" data-i18n-aria="switch_language">',
    '<p class="hero__lede">': '<p class="hero__lede" data-i18n="hero_lede">',
    '<a class="cta-type" href="#index">Read the index <span aria-hidden="true">→</span></a>': '<a class="cta-type" href="#index" data-i18n="read_index">Read the index <span aria-hidden="true">→</span></a>',
    '<dt>Studying</dt>': '<dt data-i18n="studying">Studying</dt>',
    '<dt>Teaching assistant</dt>': '<dt data-i18n="ta">Teaching assistant</dt>',
    '<dt>Focus</dt>': '<dt data-i18n="focus">Focus</dt>',
    '<dd>B.Sc. Electrical Engineering (Control Major · Electronics Minor), Amirkabir University of Technology (Tehran Polytechnic)</dd>': '<dd data-i18n="studying_value">B.Sc. Electrical Engineering (Control Major · Electronics Minor), Amirkabir University of Technology (Tehran Polytechnic)</dd>',
    '<dd>Electromagnetics (Dr. Askarpour) and Digital Logic Design (Dr. Pourfard), separate semesters</dd>': '<dd data-i18n="ta_value">Electromagnetics (Dr. Askarpour) and Digital Logic Design (Dr. Pourfard), separate semesters</dd>',
    '<dd>Embedded data acquisition, VHDL on FPGA, Qt desktop applications, Django web services</dd>': '<dd data-i18n="focus_value">Embedded data acquisition, VHDL on FPGA, Qt desktop applications, Django web services</dd>',
    '<caption class="label">Working tool set</caption>': '<caption class="label" data-i18n="tools_caption">Working tool set</caption>',
    '<tr><th scope="col">Layer</th><th scope="col">Tools</th><th scope="col">Used in</th></tr>': '<tr><th scope="col" data-i18n="tools_layer">Layer</th><th scope="col" data-i18n="tools_tools">Tools</th><th scope="col" data-i18n="tools_used">Used in</th></tr>',
    '<th scope="row">Silicon</th>': '<th scope="row" data-i18n="tool_silicon">Silicon</th>',
    '<td>Parking DAQ, door lock, Hamming</td>': '<td data-i18n="tool_silicon_used">Parking DAQ, door lock, Hamming</td>',
    '<th scope="row">Hardware description</th>': '<th scope="row" data-i18n="tool_hdl">Hardware description</th>',
    '<td>Packet processor, logic lab</td>': '<td data-i18n="tool_hdl_used">Packet processor, logic lab</td>',
    '<th scope="row">Firmware</th>': '<th scope="row" data-i18n="tool_firmware">Firmware</th>',
    '<td>All embedded builds</td>': '<td data-i18n="tool_firmware_used">All embedded builds</td>',
    '<th scope="row">Application</th>': '<th scope="row" data-i18n="tool_application">Application</th>',
    '<td>Qt Deep Dive, web services</td>': '<td data-i18n="tool_application_used">Qt Deep Dive, web services</td>',
    '<th scope="row">Data</th>': '<th scope="row" data-i18n="tool_data">Data</th>',
    '<td>Parking telemetry, shop backend</td>': '<td data-i18n="tool_data_used">Parking telemetry, shop backend</td>',
    '<th scope="row">Bench</th>': '<th scope="row" data-i18n="tool_bench">Bench</th>',
    '<td>Every project above</td>': '<td data-i18n="tool_bench_used">Every project above</td>',
    '<span class="label">Public repositories</span>': '<span class="label" data-i18n="count_repos">Public repositories</span>',
    '<span class="label">Courses assisted</span>': '<span class="label" data-i18n="count_courses">Courses assisted</span>',
    '<span class="label">On GitHub since</span>': '<span class="label" data-i18n="count_since">On GitHub since</span>',
    '<span class="label">Languages in repos</span>': '<span class="label" data-i18n="count_languages">Languages in repos</span>',
    '<dt class="label">Telegram</dt>': '<dt class="label" data-i18n="contact_telegram">Telegram</dt>',
    '<span class="label label--normal">(DMs are open — fast response)</span>': '<span class="label label--normal" data-i18n="contact_dm">(DMs are open — fast response)</span>',
    '<dt class="label">GitHub</dt>': '<dt class="label" data-i18n="contact_github">GitHub</dt>',
    '<dt class="label">LinkedIn</dt>': '<dt class="label" data-i18n="contact_linkedin">LinkedIn</dt>',
    '<dt class="label">Email</dt>': '<dt class="label" data-i18n="contact_email">Email</dt>',
    '<p class="colophon__text">': '<p class="colophon__text" data-i18n="footer_text">',
    '<a class="link label" href="#top">Back to top</a>': '<a class="link label" href="#top" data-i18n="back_to_top">Back to top</a>',
}
for old, new in hooks.items():
    if old in html:
        html = html.replace(old, new)

# Notes that need translation have stable selectors after this pass.
html = html.replace('''<p class="section__note">\n           Selected web interfaces and storefront systems I have engineered. Links are\n           active templates; I will wire their full production destinations soon.\n         </p>''', '''<p class="section__note" data-i18n="webdesigns_note">\n           Selected web interfaces and storefront systems I have engineered. Links are\n           active templates; I will wire their full production destinations soon.\n         </p>''')
html = html.replace('''<p class="section__note">\n            Active focus areas, real-world learning logs, and industrial internships.\n          </p>''', '''<p class="section__note" data-i18n="internships_note">\n            Active focus areas, real-world learning logs, and industrial internships.\n          </p>''')
index_path.write_text(html, encoding="utf-8")

# ---------- CSS cleanup ----------
css = site_css_path.read_text(encoding="utf-8")
css += r'''

/* Quality cleanup: presentation belongs in CSS, not inline HTML. */
.row__thumb--placeholder { display: flex; align-items: center; justify-content: center; background: var(--color-paper-3); }
.row__placeholder-label { font-family: var(--font-label); font-size: var(--text-xs); color: var(--color-muted); text-align: center; padding: var(--space-md); }
.row__placeholder-label--caps { text-transform: uppercase; letter-spacing: var(--tracking-label); }
.row__thumb-split { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-xs); width: 100%; aspect-ratio: 1.6; }
.row__thumb--split { border: 0; box-shadow: none; aspect-ratio: auto; height: 100%; overflow: clip; }
.row__thumb--split img { height: 100%; width: 100%; object-fit: cover; }
.index--bordered { border-bottom: var(--rule-hair) solid var(--color-rule); }
.label--normal { text-transform: none; }
'''
site_css_path.write_text(css, encoding="utf-8")

# ---------- i18n completion ----------
append = r'''

/* Quality cleanup: complete the bilingual surface, including text that used to be hard-coded. */
Object.assign(I18N.en, {
  switch_language: "Switch language", skip_to_index: "Skip to the index",
  studying: "Studying", studying_value: "B.Sc. Electrical Engineering (Control Major · Electronics Minor), Amirkabir University of Technology (Tehran Polytechnic)",
  ta: "Teaching assistant", ta_value: "Electromagnetics (Dr. Askarpour) and Digital Logic Design (Dr. Pourfard), separate semesters",
  focus: "Focus", focus_value: "Embedded data acquisition, VHDL on FPGA, Qt desktop applications, Django web services",
  tools_caption: "Working tool set", tools_layer: "Layer", tools_tools: "Tools", tools_used: "Used in",
  tool_silicon: "Silicon", tool_silicon_used: "Parking DAQ, door lock, Hamming",
  tool_hdl: "Hardware description", tool_hdl_used: "Packet processor, logic lab",
  tool_firmware: "Firmware", tool_firmware_used: "All embedded builds",
  tool_application: "Application", tool_application_used: "Qt Deep Dive, web services",
  tool_data: "Data", tool_data_used: "Parking telemetry, shop backend",
  tool_bench: "Bench", tool_bench_used: "Every project above",
  webdesigns_note: "Selected web interfaces and storefront systems I have engineered. These are active templates; production destinations will be connected as they are ready.",
  internships_note: "Current focus areas, practical learning logs, and industrial internship work.",
  count_repos: "Public repositories", count_courses: "Courses assisted", count_since: "On GitHub since", count_languages: "Languages in repos",
  contact_telegram: "Telegram", contact_dm: "(DMs are open — fast response)", contact_github: "GitHub", contact_linkedin: "LinkedIn", contact_email: "Email",
  footer_text: "Mahbod BemaniCham — Electrical Engineering (Control major, Electronics minor), Amirkabir University of Technology (Tehran Polytechnic), Tehran. 2026.",
  back_to_top: "Back to top"
});

Object.assign(I18N.fa, {
  switch_language: "تغییر زبان", skip_to_index: "رفتن به فهرست",
  hero_lede: "دانشجوی کارشناسی دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران). در نقطه اتصال فریم‌ور و سخت‌افزار کار می‌کنم؛ از جمع‌آوری داده با ESP32 و طراحی FPGA با VHDL گرفته تا اپلیکیشن‌های دسکتاپ Qt و سرویس‌های جنگو. همچنین سابقه دستیاری آموزشی در درس‌های الکترومغناطیس و مدارهای منطقی را دارم.",
  studying: "تحصیل", studying_value: "کارشناسی مهندسی برق، گرایش کنترل، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)",
  ta: "دستیار آموزشی", ta_value: "الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پوردرد، در دو نیم‌سال جداگانه",
  focus: "حوزه تمرکز", focus_value: "جمع‌آوری داده و سیستم‌های نهفته، VHDL و FPGA، اپلیکیشن‌های دسکتاپ Qt و سرویس‌های وب جنگو",
  tools_caption: "مجموعه ابزارهای مورد استفاده", tools_layer: "لایه", tools_tools: "ابزارها", tools_used: "کاربرد",
  tool_silicon: "سخت‌افزار", tool_silicon_used: "پارکینگ هوشمند، قفل درب، همینگ",
  tool_hdl: "توصیف سخت‌افزار", tool_hdl_used: "پردازنده بسته، آزمایشگاه مدار منطقی",
  tool_firmware: "فریم‌ور", tool_firmware_used: "تمام پروژه‌های نهفته",
  tool_application: "نرم‌افزار کاربردی", tool_application_used: "Qt Deep Dive، سرویس‌های وب",
  tool_data: "داده و زیرساخت", tool_data_used: "تله‌متری پارکینگ، بک‌اند فروشگاه",
  tool_bench: "ابزار آزمایش و توسعه", tool_bench_used: "تمام پروژه‌های بالا",
  webdesigns_note: "چند رابط وب و فروشگاه که طراحی و پیاده‌سازی کرده‌ام. این موارد فعلاً به‌صورت قالب‌های فعال نمایش داده می‌شوند و مقصد نهایی پروژه‌ها به‌مرور متصل خواهد شد.",
  internships_note: "حوزه‌های تمرکز فعلی، یادداشت‌های فنی و تجربه‌های عملی حاصل از کارآموزی.",
  count_repos: "مخزن عمومی", count_courses: "درس با سابقه دستیاری", count_since: "عضویت در گیت‌هاب از", count_languages: "زبان‌های موجود در مخزن‌ها",
  contact_telegram: "تلگرام", contact_dm: "(پیام مستقیم باز است و معمولاً سریع پاسخ می‌دهم)", contact_github: "گیت‌هاب", contact_linkedin: "لینکدین", contact_email: "ایمیل",
  footer_text: "مهبد بمانی‌چم — مهندسی برق (گرایش کنترل، حوزه تخصصی الکترونیک)، دانشگاه صنعتی امیرکبیر (پلی‌تکنیک تهران)، تهران. ۱۴۰۵.",
  back_to_top: "بازگشت به بالا",
  about_p1: "من دانشجوی کارشناسی مهندسی برق دانشگاه صنعتی امیرکبیر هستم. بیشتر چیزهایی که یاد گرفته‌ام از پروژه‌هایی آمده که بار اول درست کار نکرده‌اند؛ از یک سروو که تا تنظیم درست PWM مدام می‌لرزید، تا دیکدری که در شبیه‌سازی سالم بود اما روی برد شکست می‌خورد، و حتی یک ورکر جنگو که هر شب بی‌سروصدا از کار می‌افتاد.",
  about_p2: "من سخت‌افزاری را دوست دارم که بتوانم نتیجه‌اش را از نزدیک ببینم و درسی را که بتوانم آموزش بدهم. دو نیم‌سال دستیاری آموزشی در درس‌های الکترومغناطیس با دکتر عسکرپور و مدارهای منطقی با دکتر پوردرد به من یاد داد که وقتی چیزی را برای دیگری توضیح می‌دهی، خیلی زود متوجه می‌شوی کجای فهم خودت هنوز جای کار دارد. مسیر تحصیلی من روی گرایش <strong>کنترل</strong> است و در کنار آن، حوزه <strong>الکترونیک</strong> را هم جدی دنبال می‌کنم.",
  about_p3: "این صفحه قرار نیست یک تبلیغ اغراق‌آمیز از من باشد؛ یک فهرست واقعی از چیزهایی است که ساخته‌ام و رویشان کار کرده‌ام. اگر پروژه‌ای برایتان جالب بود، مخزن آن یک کلیک فاصله دارد و تاریخچهٔ تغییراتش هم روند واقعی کار را نشان می‌دهد.",
  int_p1: "<strong>امنیت SCADA و اتوماسیون پست برق — کارآموزی موج نیرو:</strong><br />در حال گذراندن کارآموزی مهندسی در <strong>موج نیرو</strong> هستم و روی مطالعه، تحلیل و مستندسازی پست‌های متعارف، سیستم‌های DCS و معماری تله‌متری SCADA در شبکه برق ایران کار می‌کنم.",
  int_p2: "تمرکز پژوهشی فعلی من روی زنجیره پروتکل‌های <strong>IEC 61850</strong>، <strong>DNP3</strong>، <strong>IEC 60870-5-104</strong> و <strong>Modbus</strong> است. در این مسیر، روی مستندسازی تأخیر ارسال مجدد پیام‌های GOOSE در ترافیک سنگین، منطق مارشالینگ RTU، نگاشت گیت‌وی FEP و تهیهٔ ماتریس ریسک برای تهدیدهای سایبری سامانه‌های دیسپاچینگ صنعتی کار می‌کنم."
});

const _originalSetLang = setLang;
function setLangComplete(lang) {
  _originalSetLang(lang);
  const t = I18N[lang] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(t, key)) el.innerHTML = t[key];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria");
    if (Object.prototype.hasOwnProperty.call(t, key)) el.setAttribute("aria-label", t[key]);
  });
}
setLangComplete(document.documentElement.lang === "fa" ? "fa" : "en");
const _langToggle = document.getElementById("langToggle");
if (_langToggle && !_langToggle.dataset.completeBound) {
  _langToggle.dataset.completeBound = "1";
  _langToggle.addEventListener("click", () => setLangComplete(document.documentElement.lang === "en" ? "fa" : "en"));
}
'''
i18n_path.write_text(i18n_path.read_text(encoding="utf-8") + append, encoding="utf-8")

# ---------- README accuracy ----------
if readme_path.exists():
    readme = readme_path.read_text(encoding="utf-8")
    readme = readme.replace("Everything is two files.", "The runtime is dependency-free: semantic HTML, custom CSS, and a small vanilla JavaScript localization layer.")
    readme = readme.replace("WCAG AA contrast on every text/background pair", "automated WCAG AA checks for computed solid-color text/background pairs")
    readme = readme.replace("verified with zero-issue CDP automation", "verified with automated CDP accessibility and layout checks")
    readme_path.write_text(readme, encoding="utf-8")

# ---------- Permanent CI quality gate ----------
ci = ROOT / ".github" / "workflows" / "quality.yml"
ci.write_text('''name: Quality audit\n\non:\n  push:\n    branches: [main, fix/i18n-quality-audit]\n  pull_request:\n    branches: [main]\n\npermissions:\n  contents: read\n\njobs:\n  audit:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.x"\n      - name: Install Chromium\n        run: sudo apt-get update && sudo apt-get install -y chromium-browser || sudo apt-get install -y chromium\n      - name: Install audit dependency\n        run: python -m pip install websockets\n      - name: Serve site\n        run: python -m http.server 8899 --directory . > /tmp/site.log 2>&1 &\n      - name: Run responsive accessibility audit\n        run: python tools/audit.py http://127.0.0.1:8899/index.html\n''', encoding="utf-8")

print("Quality cleanup completed")
''