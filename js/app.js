/* ── app.js — rendering + interactions ─────────────────────── */
(function () {
  "use strict";

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  const LANG_COLORS = {
    Python: "#3572A5", "C++": "#f34b7d", C: "#8a8a8a", "C#": "#178600",
    VHDL: "#adb2cb", Verilog: "#b2b7f8", HTML: "#e34c26", CSS: "#663399",
    JavaScript: "#f1e05a", TypeScript: "#3178c6", "Jupyter Notebook": "#DA5B0B",
    MATLAB: "#e16737", Java: "#b07219", Go: "#00ADD8", Rust: "#dea584",
    Shell: "#89e051", Arduino: "#bd79d8", Assembly: "#6E4C13", QML: "#44a51c",
    PHP: "#4F5D95", Dart: "#00B4AB", Kotlin: "#A97BFF", Swift: "#F05138"
  };

  const THEMES = ["cobalt", "paper", "crt", "ember"];
  const THEME_META = { cobalt: "#141824", paper: "#f5f6fa", crt: "#101a12", ember: "#1c1512" };

  const state = { repos: [], meta: null, q: "", topic: "all", sort: "pushed" };
  let excerptObserver = null;

  /* ── tiny helpers ─────────────────────────────────────────── */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  function toast(msg) {
    const box = $("#toasts");
    if (!box) return;
    box.classList.add("has-toast");
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => { el.classList.add("bye"); setTimeout(() => { el.remove(); if (!box.children.length) box.classList.remove("has-toast"); }, 300); }, 2400);
  }

  function relTime(iso) {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const day = 86400000;
    const fa = document.documentElement.lang === "fa";
    if (diff < day) return fa ? "امروز" : "today";
    const d = Math.floor(diff / day);
    if (d < 30) return fa ? `${d} روز پیش` : `${d}d ago`;
    const m = Math.floor(d / 30);
    if (m < 12) return fa ? `${m} ماه پیش` : `${m}mo ago`;
    const y = Math.floor(d / 365);
    return fa ? `${y} سال پیش` : `${y}y ago`;
  }

  /* ── projects grid ────────────────────────────────────────── */
  function skeletons() {
    const grid = $("#projectGrid");
    grid.querySelectorAll(".pcard,.skel,.pgrid-state").forEach(n => n.remove());
    for (let i = 0; i < 6; i++) {
      const s = document.createElement("div");
      s.className = "skel"; s.setAttribute("aria-hidden", "true");
      s.innerHTML = "<i></i><i></i><i></i><i></i>";
      grid.appendChild(s);
    }
  }

  function visibleRepos() {
    const q = state.q.trim().toLowerCase();
    let list = state.repos.filter(r => {
      if (state.topic !== "all" && !(r.topics || []).includes(state.topic)) return false;
      if (!q) return true;
      const hay = [r.name, r.description, r.excerpt, r.language, ...(r.topics || [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
    const rank = n => { const i = GHData.PINNED.indexOf(n); return i === -1 ? 99 : i; };
    list.sort((a, b) => {
      const ra = rank(a.name), rb = rank(b.name);
      if (ra !== rb) return ra - rb;
      if (state.sort === "stars") return b.stars - a.stars;
      if (state.sort === "name") return a.name.localeCompare(b.name);
      return String(b.pushed_at).localeCompare(String(a.pushed_at));
    });
    return list;
  }

  function cardHTML(r) {
    const dot = LANG_COLORS[r.language] || "";
    const topics = (r.topics || []).slice(0, 4)
      .map(x => `<li>${esc(x)}</li>`).join("");
    const pinned = GHData.PINNED.indexOf(r.name) !== -1;
    const body = r.excerpt || r.description || "";
    const flags =
      (r.isNew ? `<span class="flag-new">${esc(t("flag_new"))}</span>` : "") +
      (pinned ? `<span class="flag-pin" title="featured">★</span>` : "");
    return `<a class="pcard reveal${r.isNew ? " is-new" : ""}" href="${esc(r.url)}" target="_blank" rel="noreferrer"
      data-repo="${esc(r.full_name)}"${body ? "" : ' data-lazy="1"'}${dot ? ` style="--lang-dot:${dot}"` : ""}>
      <div class="pcard__top"><span class="pcard__name">${esc(r.name)} ${flags}</span><span class="pcard__go" aria-hidden="true">↗</span></div>
      <p class="pcard__excerpt">${esc(body) || "&nbsp;"}</p>
      ${topics ? `<ul class="pcard__topics">${topics}</ul>` : ""}
      <div class="pcard__foot">
        ${r.language ? `<span class="pcard__lang"><i aria-hidden="true"></i>${esc(r.language)}</span>` : "<span></span>"}
        <span title="stars">★ ${r.stars}</span>
        <span title="forks">⑂ ${r.forks}</span>
        <span class="pcard__spacer"></span>
        <span>${esc(t("rel_updated"))} ${esc(relTime(r.pushed_at))}</span>
      </div></a>`;
  }

  function renderGrid() {
    const grid = $("#projectGrid");
    grid.querySelectorAll(".pcard,.skel,.pgrid-state").forEach(n => n.remove());
    const list = visibleRepos();
    if (!list.length) {
      const st = document.createElement("p");
      st.className = "pgrid-state";
      st.textContent = state.repos.length ? t("empty_msg") : t("loading_msg");
      grid.appendChild(st);
    } else {
      const wrap = document.createElement("div");
      wrap.style.display = "contents";
      wrap.innerHTML = list.map(cardHTML).join("");
      grid.appendChild(wrap);
    }
    observeLazy();
    observeReveals();
  }

  function observeLazy() {
    if (!("IntersectionObserver" in window)) return;
    if (!excerptObserver) {
      excerptObserver = new IntersectionObserver(entries => {
        entries.forEach(async en => {
          if (!en.isIntersecting) return;
          excerptObserver.unobserve(en.target);
          const full = en.target.getAttribute("data-repo");
          const repo = state.repos.find(r => r.full_name === full);
          if (!repo || !en.target.hasAttribute("data-lazy")) return;
          await GHData.fillExcerpt(repo);
          const p = en.target.querySelector(".pcard__excerpt");
          const txt = repo.excerpt || repo.description || "";
          if (p && txt) { p.textContent = txt; en.target.removeAttribute("data-lazy"); }
        });
      }, { rootMargin: "320px" });
    }
    $$("#projectGrid .pcard[data-lazy]").forEach(c => excerptObserver.observe(c));
  }

  function buildChips() {
    const box = $("#projChips");
    const freq = {};
    state.repos.forEach(r => (r.topics || []).forEach(tp => { freq[tp] = (freq[tp] || 0) + 1; }));
    const tops = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 10);
    box.innerHTML = "";
    const mk = (label, val, pressed) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", pressed ? "true" : "false");
      b.addEventListener("click", () => {
        state.topic = val;
        $$("#projChips .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        renderGrid();
      });
      box.appendChild(b);
    };
    mk(t("chip_all"), "all", state.topic === "all");
    tops.forEach(tp => mk(tp, tp, state.topic === tp));
  }

  function setBadge(live, hasSnapshot) {
    const badge = $("#liveBadge"), label = $("#liveBadgeText");
    if (!badge || !label) return;
    if (live) { badge.classList.remove("is-off"); label.setAttribute("data-i18n", "badge_live"); label.textContent = t("badge_live"); }
    else if (hasSnapshot) { badge.classList.add("is-off"); label.setAttribute("data-i18n", "badge_offline"); label.textContent = t("badge_offline"); }
    else { badge.classList.add("is-off"); }
  }

  function renderSyncNote() {
    const el = $("#syncNote");
    if (!el || !state.meta) return;
    if (state.meta.syncedAt) {
      const d = new Date(state.meta.syncedAt);
      try {
        el.textContent = fmt("sync_note_fmt", { d: d.toLocaleDateString(document.documentElement.lang === "fa" ? "fa-IR" : "en-US") });
      } catch (e) { el.textContent = fmt("sync_note_fmt", { d: state.meta.syncedAt.slice(0, 10) }); }
      el.removeAttribute("data-i18n");
    }
  }

  async function renderStats(repos) {
    const put = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    try {
      const u = await GHData.userStats();
      put("#statRepos", String(u.repos));
      put("#statFollowers", String(u.followers));
      put("#statSince", u.since || "—");
    } catch (e) { /* keep placeholders */ }
    const stars = repos.reduce((a, r) => a + (r.stars || 0), 0);
    put("#statStars", String(stars));
  }

  /* ── theme ────────────────────────────────────────────────── */
  function setTheme(name, announce) {
    if (!THEMES.includes(name)) name = "cobalt";
    document.documentElement.setAttribute("data-theme", name);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_META[name]);
    try { localStorage.setItem("site_theme", name); } catch (e) {}
    if (announce) toast(fmt("toast_theme", { v: name }));
  }
  function cycleTheme(announce) {
    const cur = document.documentElement.getAttribute("data-theme") || "cobalt";
    setTheme(THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length], announce);
  }

  /* ── command palette ──────────────────────────────────────── */
  const pal = { items: [], filtered: [], sel: 0 };

  function palBuildItems() {
    const go = sel => { const el = $(sel); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
    const items = [
      { g: "grp_navigate", label: t("nav_work"), run: () => go("#work") },
      { g: "grp_navigate", label: t("tools_title"), run: () => go("#stack") },
      { g: "grp_navigate", label: t("about_title"), run: () => go("#about") },
      { g: "grp_navigate", label: t("contact_title"), run: () => go("#contact") }
    ];
    state.repos.forEach(r => items.push({ g: "grp_projects", label: r.name, hint: r.language || "", run: () => window.open(r.url, "_blank", "noreferrer") }));
    THEMES.forEach(th => items.push({ g: "grp_theme", label: th, run: () => { setTheme(th, true); } }));
    items.push({ g: "grp_language", label: "English", run: () => setLang("en") });
    items.push({ g: "grp_language", label: "فارسی", run: () => setLang("fa") });
    items.push(
      { g: "grp_links", label: "github.com/Mahbodbe", run: () => window.open("https://github.com/Mahbodbe", "_blank", "noreferrer") },
      { g: "grp_links", label: "t.me/Mb_Mb84", run: () => window.open("https://t.me/Mb_Mb84", "_blank", "noreferrer") },
      { g: "grp_links", label: "mahbod2023@gmail.com", run: () => copyEmail() },
      { g: "grp_actions", label: t("act_open_term"), hint: "~", run: () => Term.toggle(true) },
      { g: "grp_actions", label: t("act_shortcuts"), hint: "?", run: () => $("#shortcuts").hidden = false }
    );
    pal.items = items;
  }

  function palRender() {
    const input = $("#palInput"), list = $("#palList");
    const q = input.value.trim().toLowerCase();
    pal.filtered = pal.items.filter(it => !q || it.label.toLowerCase().includes(q));
    pal.sel = Math.min(pal.sel, Math.max(0, pal.filtered.length - 1));
    let html = "", lastG = "";
    pal.filtered.forEach((it, i) => {
      if (it.g !== lastG) { html += `<li class="palette__group" role="presentation">${esc(t(it.g))}</li>`; lastG = it.g; }
      html += `<li role="option" aria-selected="${i === pal.sel}"><button type="button" class="palette__item" data-i="${i}">
        <span>${esc(it.label)}</span>${it.hint ? `<span class="mono">${esc(it.hint)}</span>` : ""}</button></li>`;
    });
    list.innerHTML = html || `<li class="palette__empty">${esc(t("empty_msg"))}</li>`;
    list.querySelectorAll(".palette__item").forEach(b => {
      b.addEventListener("click", () => palRun(+b.dataset.i));
      b.addEventListener("mousemove", () => { pal.sel = +b.dataset.i; palPaintSel(); });
    });
    palPaintSel();
  }
  function palPaintSel() {
    $$("#palList [role='option']").forEach(li =>
      li.setAttribute("aria-selected", li.contains($("#palList .palette__item[data-i='" + pal.sel + "']")) ? "true" : "false"));
  }
  function palRun(i) {
    const it = pal.filtered[i];
    palClose();
    if (it) setTimeout(() => it.run(), 10);
  }
  function palOpen() {
    palBuildItems();
    $("#palette").hidden = false;
    const input = $("#palInput");
    input.value = ""; pal.sel = 0; palRender();
    input.focus();
  }
  function palClose() { $("#palette").hidden = true; }
  function palMove(d) {
    if (!pal.filtered.length) return;
    pal.sel = (pal.sel + d + pal.filtered.length) % pal.filtered.length;
    const el = $(`#palList .palette__item[data-i='${pal.sel}']`);
    if (el) el.scrollIntoView({ block: "nearest" });
    palPaintSel();
  }

  /* ── terminal ─────────────────────────────────────────────── */
  const Term = {
    hist: JSON.parse((function () { try { return localStorage.getItem("term_hist") || "[]"; } catch (e) { return "[]"; } })()),
    hi: -1,

    print(lines, cls) {
      const out = $("#termOut");
      (Array.isArray(lines) ? lines : [lines]).forEach(l => {
        const d = document.createElement("div");
        if (cls) d.className = cls;
        d.innerHTML = l;
        out.appendChild(d);
      });
      out.scrollTop = out.scrollHeight;
    },
    echo(cmd) { this.print([esc(cmd)], "t-cmd"); },

    toggle(forceOpen) {
      const el = $("#term");
      const show = forceOpen === true ? true : (forceOpen === false ? false : el.hidden);
      el.hidden = !show;
      if (show) { $("#termIn").focus(); if (!$("#termOut").children.length) this.print(t("term_welcome"), "t-dim"); }
    },

    findRepo(name) {
      const n = String(name || "").toLowerCase().replace(/\.git$/, "");
      return state.repos.find(r => r.name.toLowerCase() === n || r.full_name.toLowerCase() === n)
        || state.repos.find(r => r.name.toLowerCase().includes(n));
    },

    async exec(raw) {
      const line = raw.trim();
      if (!line) return;
      this.echo(line);
      this.hist.push(line); this.hi = -1;
      try { localStorage.setItem("term_hist", JSON.stringify(this.hist.slice(-40))); } catch (e) {}
      const [cmd, ...rest] = line.split(/\s+/);
      const arg = rest.join(" ");
      switch (cmd.toLowerCase()) {
        case "help": this.print(t("term_help_rows"), ""); break;
        case "whoami":
          this.print(["Mahbod BemaniCham — EE @ Tehran Polytechnic",
            "embedded · FPGA · desktop Qt · django",
            '<a href="https://github.com/Mahbodbe" target="_blank" rel="noreferrer">github.com/Mahbodbe</a>']); break;
        case "ls":
          if (!state.repos.length) { this.print(["(still syncing…)"], "t-dim"); break; }
          this.print(state.repos.map(r =>
            `${String(r.stars).padStart(3)}★  ${r.language ? ("[" + r.language + "]").padEnd(20) : "".padEnd(20)} <span class="t-dim">${esc(r.name)}</span>`)); break;
        case "cat": {
          const r = this.findRepo(arg);
          if (!r) { this.print([fmt("term_unknown", { v: esc(arg) })], "t-err"); break; }
          await GHData.fillExcerpt(r);
          this.print([`<span class="t-ok">${esc(r.name)}</span>`, esc(r.excerpt || r.description || "(no readme summary)"),
            `<a href="${esc(r.url)}" target="_blank" rel="noreferrer">${esc(r.url)}</a>`]); break;
        }
        case "open": {
          const r = this.findRepo(arg);
          if (!r) { this.print([fmt("term_unknown", { v: esc(arg) })], "t-err"); break; }
          window.open(r.url, "_blank", "noreferrer");
          this.print(["opening " + esc(r.url) + " …"], "t-dim"); break;
        }
        case "stats":
          this.print([`repos: ${$("#statRepos").textContent} · stars: ${$("#statStars").textContent} · followers: ${$("#statFollowers").textContent} · since: ${$("#statSince").textContent}`]); break;
        case "theme":
          if (THEMES.includes(arg)) { setTheme(arg, true); this.print(["theme → " + arg], "t-ok"); }
          else this.print(["themes: " + THEMES.join(" | ") + "   (current: " + (document.documentElement.getAttribute("data-theme") || "cobalt") + ")"], "t-dim");
          break;
        case "lang":
          if (arg === "en" || arg === "fa") { setLang(arg); this.print(["lang → " + arg], "t-ok"); }
          else this.print(["usage: lang en|fa"], "t-dim");
          break;
        case "goto": {
          const ids = ["work", "stack", "about", "internships", "webdesigns", "contact"];
          const id = ids.find(i => i.startsWith(arg.toLowerCase()));
          const el = id && $("#" + id);
          if (el) { el.scrollIntoView({ behavior: "smooth" }); this.print(["→ #" + id], "t-ok"); }
          else this.print(["sections: " + ids.join(" ")], "t-dim");
          break;
        }
        case "contact":
          this.print(["telegram: <a href=\"https://t.me/Mb_Mb84\" target=\"_blank\" rel=\"noreferrer\">@Mb_Mb84</a>",
            "email:    mahbod2023@gmail.com",
            "linkedin: mahbod-bemanicham"]); break;
        case "date": this.print([new Date().toString()]); break;
        case "echo": this.print([esc(arg)]); break;
        case "sudo": this.print(["nice try. this terminal runs on politeness."], "t-dim"); break;
        case "clear": $("#termOut").innerHTML = ""; break;
        case "exit": case "quit": case "close": this.toggle(false); break;
        default: this.print([fmt("term_unknown", { v: esc(cmd) })], "t-err");
      }
    }
  };

  /* ── copy email ───────────────────────────────────────────── */
  async function copyEmail() {
    const email = "mahbod2023@gmail.com";
    try { await navigator.clipboard.writeText(email); }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = email; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); } catch (e2) {}
      ta.remove();
    }
    toast(t("copied_email"));
  }

  /* ── chrome: progress, spy, sticky nav, reveal, clock ─────── */
  function initChrome() {
    const bar = $("#progressBar");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const wrapEl = bar ? bar.parentElement : null;
        if (wrapEl) wrapEl.classList.toggle("on", h.scrollTop > 4);
        if (bar && max > 0 && h.scrollTop > 4) bar.style.width = (h.scrollTop / max) * 100 + "%";

        const nav = $(".nav");
        if (nav) {
          const stuck = window.scrollY > Math.max(nav.offsetHeight + 16, 80);
          nav.classList.toggle("nav--stuck", stuck);
          document.body.classList.toggle("nav-has-sticky", stuck);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    if ("IntersectionObserver" in window) {
      const spy = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          $$(".nav__link").forEach(a =>
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["work", "stack", "about", "contact"].forEach(id => { const el = $("#" + id); if (el) spy.observe(el); });

      window.__revealIO = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); window.__revealIO.unobserve(en.target); } });
      }, { threshold: 0.08 });
      observeReveals();
    }

    const clock = () => {
      try {
        const s = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tehran", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
        const el = $("#tehranClock");
        if (el) el.textContent = s;
      } catch (e) {}
    };
    clock(); setInterval(clock, 1000);
  }

  function observeReveals() {
    if (!window.__revealIO) return;
    $$(".reveal:not(.in)").forEach(el => window.__revealIO.observe(el));
  }

  /* ── keyboard ─────────────────────────────────────────────── */
  function initKeys() {
    const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let kIdx = 0;

    document.addEventListener("keydown", e => {
      // konami trail
      if (e.key === KONAMI[kIdx]) { kIdx++; if (kIdx === KONAMI.length) { kIdx = 0; document.body.classList.toggle("hack"); toast(t("toast_hack")); } }
      else kIdx = (e.key === KONAMI[0]) ? 1 : 0;

      if (e.key === "Escape") {
        if (!$("#palette").hidden) { palClose(); return; }
        if (!$("#shortcuts").hidden) { $("#shortcuts").hidden = true; return; }
        if (!$("#term").hidden) { Term.toggle(false); return; }
      }

      const typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        $("#palette").hidden ? palOpen() : palClose();
        return;
      }
      if (typing) {
        if (e.target.id === "palInput") {
          if (e.key === "ArrowDown") { e.preventDefault(); palMove(1); }
          else if (e.key === "ArrowUp") { e.preventDefault(); palMove(-1); }
          else if (e.key === "Enter") { e.preventDefault(); palRun(pal.sel); }
        }
        if (e.target.id === "termIn") {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            if (Term.hist.length) { Term.hi = Term.hi < 0 ? Term.hist.length - 1 : Math.max(0, Term.hi - 1); e.target.value = Term.hist[Term.hi]; }
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (Term.hi >= 0) { Term.hi++; if (Term.hi >= Term.hist.length) { Term.hi = -1; e.target.value = ""; } else e.target.value = Term.hist[Term.hi]; }
          }
        }
        return;
      }

      switch (e.key) {
        case "/": e.preventDefault(); $("#projSearch").focus(); break;
        case "t": case "T": cycleTheme(true); break;
        case "l": case "L": { const next = document.documentElement.lang === "fa" ? "en" : "fa"; setLang(next); toast(fmt("toast_lang", { v: next })); break; }
        case "`": case "~": Term.toggle(); break;
        case "?": $("#shortcuts").hidden = false; break;
      }
    });
  }

  /* ── language change hook ─────────────────────────────────── */
  function onLangChange() {
    buildChips();
    renderGrid();
    renderSyncNote();
    if (!$("#liveBadge").classList.contains("is-off")) {
      const lbl = $("#liveBadgeText");
      lbl.setAttribute("data-i18n", "badge_live");
      lbl.textContent = t("badge_live");
    }
  }

  /* ── boot ─────────────────────────────────────────────────── */
  async function boot() {
    initChrome();
    initKeys();

    $("#palBtn").addEventListener("click", palOpen);
    $("#termBtn").addEventListener("click", () => Term.toggle(true));
    $("#termClose").addEventListener("click", () => Term.toggle(false));
    $("#themeToggle").addEventListener("click", () => cycleTheme(true));
    $("#scClose").addEventListener("click", () => $("#shortcuts").hidden = true);
    $("#shortcuts").addEventListener("click", e => { if (e.target.id === "shortcuts") e.currentTarget.hidden = true; });
    $("#palette").addEventListener("click", e => { if (e.target.id === "palette") palClose(); });
    $("#palInput").addEventListener("input", () => { pal.sel = 0; palRender(); });
    $("#termForm").addEventListener("submit", e => {
      e.preventDefault();
      const inp = $("#termIn");
      Term.exec(inp.value);
      inp.value = "";
    });
    $("#copyEmail").addEventListener("click", copyEmail);

    $("#projSearch").addEventListener("input", e => { state.q = e.target.value; renderGrid(); });
    $("#projSort").addEventListener("change", e => { state.sort = e.target.value; renderGrid(); });

    try { const saved = localStorage.getItem("site_theme"); if (saved) setTheme(saved, false); } catch (e) {}

    skeletons();
    try {
      const { repos, meta } = await GHData.load();
      state.repos = repos; state.meta = meta;
      setBadge(meta.live, meta.hasSnapshot);
    } catch (err) {
      state.repos = []; state.meta = { live: false, hasSnapshot: false };
    }
    buildChips();
    renderGrid();
    renderSyncNote();
    renderStats(state.repos);
  }

  window.App = { onLangChange };
  document.addEventListener("DOMContentLoaded", boot);
})();
