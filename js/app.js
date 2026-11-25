(function () {
  const projects = window.PORTFOLIO_PROJECTS;
  const i18n = window.PORTFOLIO_I18N;
  const demos = window.PORTFOLIO_DEMOS;

  const state = {
    lang: localStorage.getItem("portfolio_lang") === "pt" ? "pt" : "en",
    theme: localStorage.getItem("portfolio_theme") === "light" ? "light" : "dark",
    filter: "all",
    search: "",
    activeId: "flylow",
    heroId: "flylow"
  };

  const els = {
    sidebarList: document.getElementById("sidebarList"),
    stageHeader: document.getElementById("stageHeader"),
    demoMount: document.getElementById("demoMount"),
    archStrip: document.getElementById("architectureStrip"),
    workbenchStage: document.getElementById("workbenchStage"),
    heroPreviewMount: document.getElementById("heroPreviewMount"),
    archiveTableBody: document.getElementById("archiveTableBody"),
    projectSearch: document.getElementById("projectSearch"),
    themeToggle: document.getElementById("themeToggle"),
    menuToggle: document.getElementById("menuToggle"),
    mobileMenu: document.getElementById("mobileMenu")
  };

  function t(key) {
    return (i18n[state.lang] && i18n[state.lang][key]) || i18n.en[key] || key;
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    els.themeToggle.setAttribute("aria-pressed", String(state.theme === "light"));
  }

  function applyStaticI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = (i18n[state.lang] && i18n[state.lang][key]) || i18n.en[key];
      if (val) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = (i18n[state.lang] && i18n[state.lang][key]) || i18n.en[key];
      if (val) el.setAttribute("placeholder", val);
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === state.lang);
    });
  }

  function getFilteredProjects() {
    const q = state.search.trim().toLowerCase();
    return projects.filter((p) => {
      if (state.filter !== "all" && p.group !== state.filter) return false;
      if (!q) return true;
      const copy = p[state.lang];
      return (
        p.name.toLowerCase().includes(q) ||
        p.kind.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        copy.subtitle.toLowerCase().includes(q)
      );
    });
  }

  function renderSidebar() {
    const list = getFilteredProjects();
    const groups = ["mobile-web", "support-ops"];
    let html = "";

    groups.forEach((groupKey) => {
      const items = list.filter((p) => p.group === groupKey);
      if (items.length === 0) return;
      html += `<div class="sidebar-group-label">${t("group." + groupKey)}</div>`;
      items.forEach((p) => {
        const active = p.id === state.activeId;
        html += `
          <button type="button" class="project-row ${active ? "active" : ""}" role="option" aria-selected="${active}" data-project-id="${p.id}">
            <span class="mono-index">${p.index}</span>
            <span class="project-row-name">${p.name}</span>
            <span class="project-row-kind">${p.kind.split("·")[0].trim()}</span>
          </button>
        `;
      });
    });

    if (!html) {
      html = `<div class="muted-note" style="padding:12px 8px">${state.lang === "pt" ? "Nenhum projeto encontrado" : "No matching projects"}</div>`;
    }

    els.sidebarList.innerHTML = html;
    els.sidebarList.querySelectorAll(".project-row").forEach((btn) => {
      btn.addEventListener("click", () => selectProject(btn.dataset.projectId));
    });
  }

  function renderStage() {
    const p = projects.find((item) => item.id === state.activeId) || projects[0];
    const copy = p[state.lang];

    els.workbenchStage.classList.remove("stage-enter");
    void els.workbenchStage.offsetWidth;
    els.workbenchStage.classList.add("stage-enter");

    els.stageHeader.innerHTML = `
      <div class="stage-top-row">
        <div class="stage-title-group">
          <span class="stage-index">${p.index}</span>
          <h3 class="stage-title">${p.name}</h3>
          <span class="stage-subtitle">${copy.subtitle}</span>
        </div>
        <div class="stage-tags">
          ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="stage-live-link">flylow.onrender.com</a>` : ""}
          ${p.tags.map((tag) => `<span class="mono-tag">${tag}</span>`).join("")}
        </div>
      </div>
      <p class="stage-summary">${copy.summary}</p>
    `;

    demos.renderProjectDemo(p.id, els.demoMount, state.lang);

    els.archStrip.innerHTML = `
      <div class="arch-card">
        <span class="arch-label">${t("arch.problem")}</span>
        <span class="arch-value">${copy.problem}</span>
      </div>
      <div class="arch-card">
        <span class="arch-label">${t("arch.pipeline")}</span>
        <span class="arch-mono">${copy.pipeline}</span>
      </div>
      <div class="arch-card">
        <span class="arch-label">${t("arch.modules")}</span>
        <span class="arch-mono">${p.modules.join(" · ")}</span>
      </div>
    `;
  }

  function renderArchive() {
    els.archiveTableBody.innerHTML = projects
      .map((p) => {
        const copy = p[state.lang];
        return `
          <tr>
            <td class="col-idx"><span class="mono-index">${p.index}</span></td>
            <td>
              <span class="archive-name">${p.name}</span>
              <span class="archive-desc-sub">${copy.subtitle}</span>
            </td>
            <td><span class="mono-meta">${t("group." + p.group)}</span></td>
            <td>
              <div class="stage-tags">
                ${p.tags.slice(0, 3).map((tag) => `<span class="mono-tag">${tag}</span>`).join("")}
              </div>
            </td>
            <td><span class="arch-mono">${p.modules.slice(0, 2).join(", ")}</span></td>
            <td class="col-action">
              <button type="button" class="btn btn-secondary btn-sm" data-launch-id="${p.id}">${t("archive.launchBtn")}</button>
            </td>
          </tr>
        `;
      })
      .join("");

    els.archiveTableBody.querySelectorAll("[data-launch-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectProject(btn.dataset.launchId);
        document.getElementById("workbench").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderHeroPreview() {
    document.querySelectorAll("[data-hero-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.heroTab === state.heroId);
    });
    demos.renderHeroPreview(els.heroPreviewMount, state.lang, state.heroId);
  }

  function selectProject(id) {
    if (!projects.some((p) => p.id === id)) return;
    state.activeId = id;
    window.history.replaceState(null, "", `#project=${id}`);
    renderSidebar();
    renderStage();
  }

  function initRevealObserver() {
    const targets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((el) => obs.observe(el));
  }

  function animateHeroCounters() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("[data-count-to]").forEach((el) => {
      const target = Number(el.dataset.countTo);
      const suffix = el.dataset.countSuffix || "";
      const start = performance.now();
      const dur = 520;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  window.rerenderFlyLowAll = function () {
    if (state.heroId === "flylow") renderHeroPreview();
    if (state.activeId === "flylow") demos.renderProjectDemo("flylow", els.demoMount, state.lang);
  };

  window.rerenderRadarAll = function () {
    if (state.heroId === "radar-monitor") renderHeroPreview();
    if (state.activeId === "radar-monitor") demos.renderProjectDemo("radar-monitor", els.demoMount, state.lang);
  };

  window.rerenderRotaFacilAll = function () {
    if (state.heroId === "rotafacil") renderHeroPreview();
    if (state.activeId === "rotafacil") demos.renderProjectDemo("rotafacil", els.demoMount, state.lang);
  };

  function initEvents() {
    els.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio_theme", state.theme);
      applyTheme();
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        localStorage.setItem("portfolio_lang", state.lang);
        applyStaticI18n();
        renderSidebar();
        renderStage();
        renderArchive();
        renderHeroPreview();
      });
    });

    document.querySelectorAll("[data-hero-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.heroId = btn.dataset.heroTab;
        renderHeroPreview();
      });
    });

    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.filter = btn.dataset.filter;
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
        const visible = getFilteredProjects();
        if (visible.length && !visible.some((p) => p.id === state.activeId)) {
          state.activeId = visible[0].id;
        }
        renderSidebar();
        renderStage();
      });
    });

    els.projectSearch.addEventListener("input", (e) => {
      state.search = e.target.value;
      renderSidebar();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        e.preventDefault();
        els.projectSearch.focus();
      }
    });

    els.sidebarList.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const visible = getFilteredProjects();
      if (!visible.length) return;
      e.preventDefault();
      const idx = visible.findIndex((p) => p.id === state.activeId);
      const next = e.key === "ArrowDown" ? (idx + 1) % visible.length : (idx - 1 + visible.length) % visible.length;
      selectProject(visible[next].id);
    });

    document.getElementById("heroOpenWorkbench").addEventListener("click", () => {
      selectProject(state.heroId);
      document.getElementById("workbench").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    els.menuToggle.addEventListener("click", () => {
      const expanded = els.menuToggle.getAttribute("aria-expanded") === "true";
      els.menuToggle.setAttribute("aria-expanded", String(!expanded));
      els.mobileMenu.hidden = expanded;
    });

    els.mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        els.menuToggle.setAttribute("aria-expanded", "false");
        els.mobileMenu.hidden = true;
      });
    });
  }

  function bootstrap() {
    applyTheme();
    const hashMatch = window.location.hash.match(/project=([a-z0-9-]+)/i);
    if (hashMatch && projects.some((p) => p.id === hashMatch[1])) {
      state.activeId = hashMatch[1];
    }
    applyStaticI18n();
    renderSidebar();
    renderStage();
    renderArchive();
    renderHeroPreview();
    initEvents();
    initRevealObserver();
    animateHeroCounters();
  }

  bootstrap();
})();
