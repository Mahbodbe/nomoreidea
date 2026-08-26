/* ── GHData — live GitHub → project index engine ───────────────
 * Strategy (resilience first):
 *   1. data/projects.json  — committed snapshot, always renders fast
 *   2. live REST API       — merges in repos newer than the snapshot
 *   3. localStorage cache  — per-repo README excerpts, keyed by push
 * Excerpts are pulled lazily per visible card so we stay far below
 * the unauthenticated rate limit.
 * ────────────────────────────────────────────────────────────── */
window.GHData = (function () {
  "use strict";

  const USER = "Mahbodbe";
  const API = "https://api.github.com";
  const SNAPSHOT_URL = "data/projects.json";
  const LS_EXCERPTS = "gh_excerpts_v1";
  const LS_STATS = "gh_stats_v1";

  /* manual curation: hide these repos from the index; pin = shown
     first with a ★ flag (order matters). */
  const HIDDEN = new Set(["nomoreidea"]);
  const PINNED = ["smart-parking", "HammingProject", "Qt-Deep-Dive"];

  async function j(url) {
    const r = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!r.ok) throw Object.assign(new Error("HTTP " + r.status), { status: r.status });
    return r.json();
  }

  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function excerptFromReadme(md) {
    if (!md) return "";
    const lines = md.replace(/\r/g, "").split("\n");
    const buf = [];
    for (const raw of lines) {
      let s = raw.trim();
      if (s.startsWith(">")) {           // unwrap blockquotes (skip GH alerts)
        const inner = s.replace(/^>\s*/, "");
        if (!inner || inner.startsWith("[!")) continue;
        s = inner;
      }
      if (!s) { if (buf.length) break; else continue; }
      // skip badges / headings / images / html / tables / fences / lists-of-links
      if (/^(#|!\[|\[!|<|&lt;|<!--|\||\* \[|- \[|```|={3,}|-{3,}|\*)/.test(s)) continue;
      if (/^\[[^\]]*\]\(https?:\/\/[^)]*\)$/.test(s)) continue;         // lone link
      if (/^[A-Za-z ]+\s*\|/.test(s) && s.length < 40) continue;         // "English | ..."
      if (s.length < 120 && s.includes("|") && /read|english|فارسی|مطالعه|نسخه|language/i.test(s)) continue; // lang banners
      buf.push(s);
      if (buf.join(" ").length > 360) break;
    }
    let out = buf.join(" ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/!\[\]/g, "")
      .replace(/\*\*?([^*]+)\*\*?/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/_{1,3}([^_]+)_{1,3}/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    return out.length > 300 ? out.slice(0, 297).replace(/\s+\S*$/, "") + "…" : out;
  }

  function normalizeRepo(r) {
    return {
      id: r.id,
      name: r.name,
      full_name: r.full_name || USER + "/" + r.name,
      url: r.html_url || ("https://github.com/" + USER + "/" + r.name),
      description: r.description || "",
      language: r.language || null,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      topics: Array.isArray(r.topics) ? r.topics.slice(0, 6) : [],
      pushed_at: r.pushed_at || "",
      archived: !!r.archived,
      fork: !!r.fork,
      homepage: r.homepage || "",
      excerpt: r.excerpt || ""
    };
  }

  let excerpts = lsGet(LS_EXCERPTS) || {};

  function cachedExcerpt(repo) {
    const hit = excerpts[repo.full_name];
    return hit && hit.k === repo.pushed_at ? hit.v : null;
  }
  function storeExcerpt(repo, text) {
    excerpts[repo.full_name] = { k: repo.pushed_at, v: text };
    lsSet(LS_EXCERPTS, excerpts);
  }

  async function readmeExcerpt(fullName) {
    const r = await fetch(API + "/repos/" + fullName + "/readme",
      { headers: { Accept: "application/vnd.github.raw+json" } });
    if (!r.ok) return "";
    return excerptFromReadme(await r.text());
  }

  /* fill excerpt for one card (called lazily by the UI) */
  async function fillExcerpt(repo) {
    const cached = cachedExcerpt(repo);
    if (cached !== null) { repo.excerpt = cached; return repo; }
    try {
      const txt = await readmeExcerpt(repo.full_name);
      if (txt) storeExcerpt(repo, txt);
      repo.excerpt = txt;
    } catch (e) {
      repo.excerpt = "";
    }
    return repo;
  }

  function orderRepos(list) {
    const rank = n => { const i = PINNED.indexOf(n); return i === -1 ? 99 : i; };
    return list.slice().sort((a, b) => {
      const ra = rank(a.name), rb = rank(b.name);
      if (ra !== rb) return ra - rb;
      return String(b.pushed_at).localeCompare(String(a.pushed_at));
    });
  }

  /* main loader: snapshot → merge live */
  async function load() {
    let snap = null, snapErr = null;
    try {
      snap = await j(SNAPSHOT_URL);
    } catch (e) { snapErr = e; }

    let repos = [];
    if (snap && Array.isArray(snap.repos)) {
      repos = snap.repos.filter(r => !HIDDEN.has(r.name)).map(normalizeRepo);
      repos.forEach(r => { const c = cachedExcerpt(r); if (c !== null) r.excerpt = c; });
    }

    let liveOk = false;
    try {
      const live = await j(API + "/users/" + USER + "/repos?per_page=100&sort=pushed");
      const known = new Set(repos.map(r => r.id));
      const fresh = [];
      for (const raw of live) {
        if (HIDDEN.has(raw.name)) continue;
        if (known.has(raw.id)) continue;
        const nr = normalizeRepo(raw);
        nr.isNew = true;
        const c = cachedExcerpt(nr);
        if (c !== null) nr.excerpt = c;
        fresh.push(nr);
      }
      if (fresh.length || snapErr) {
        repos = orderRepos(repos.concat(fresh));
        liveOk = true;
      } else {
        liveOk = true; // API fine, nothing new — keep pinned snapshot order
      }
    } catch (e) { liveOk = false; }

    return {
      repos,
      meta: {
        syncedAt: (snap && snap.syncedAt) || null,
        live: liveOk && !(snapErr && !snap),
        hasSnapshot: !!snap
      }
    };
  }

  async function userStats() {
    const cached = lsGet(LS_STATS);
    if (cached && cached.at && (Date.now() - cached.at) < 30 * 60 * 1000) return cached.v;
    const u = await j(API + "/users/" + USER);
    const v = {
      repos: u.public_repos,
      followers: u.followers,
      since: (u.created_at || "").slice(0, 4),
      avatar: u.avatar_url
    };
    lsSet(LS_STATS, { at: Date.now(), v });
    return v;
  }

  return { load, fillExcerpt, userStats, excerptFromReadme, PINNED, USER };
})();
