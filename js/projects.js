/**
 * projects.js
 * Loads data/projects.json and renders a JSON-driven, filterable project grid.
 * No project content is hard-coded into the HTML.
 */

const PROJECTS = (() => {
  let projects = [];
  let activeFilter = "all";

  async function load() {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error("Failed to load projects.json");
    const json = await res.json();
    projects = json.projects || [];
    return projects;
  }

  function collectGenres() {
    const set = new Set();
    projects.forEach((p) => (p.genre || []).forEach((g) => set.add(g)));
    return Array.from(set);
  }

  function renderFilters() {
    const wrap = document.getElementById("project-filters");
    if (!wrap) return;
    wrap.setAttribute("aria-label", I18N.get("projectsSection.filterGroupLabel"));
    const genres = collectGenres();
    if (genres.length <= 1) {
      wrap.innerHTML = "";
      wrap.style.display = "none";
      return;
    }
    wrap.style.display = "";
    const lang = I18N.getLang();
    const allLabel = I18N.get("projectsSection.filterAll", "All");
    const buttons = [`<button data-filter="all" class="${activeFilter === "all" ? "is-active" : ""}">${allLabel}</button>`]
      .concat(
        genres.map(
          (g) =>
            `<button data-filter="${I18N.escapeHtml(g)}" class="${activeFilter === g ? "is-active" : ""}">${I18N.escapeHtml(g)}</button>`
        )
      );
    wrap.innerHTML = buttons.join("");
    wrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-filter");
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const wrap = document.getElementById("project-grid");
    if (!wrap) return;
    const lang = I18N.getLang();
    const viewLabel = I18N.get("projectsSection.viewProject", "View project");
    const fallbackAlt = I18N.get("projectsSection.imageAltFallback", "Project artwork placeholder");

    const visible = projects.filter((p) => activeFilter === "all" || (p.genre || []).includes(activeFilter));

    wrap.innerHTML = visible
      .map((p) => {
        const title = p.title[lang] || p.title.en;
        const desc = p.description[lang] || p.description.en;
        const role = p.role ? p.role[lang] || p.role.en : "";
        const tags = [role, ...(p.platforms || [])].filter(Boolean);
        const cardInner = `
          <div class="project-card__media">
            <img
              src="${p.image}"
              alt="${I18N.escapeHtml(title)}"
              loading="lazy"
              width="480" height="360"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';"
            >
            <div class="media-fallback" style="display:none;">${I18N.escapeHtml(fallbackAlt)}</div>
          </div>
          <div class="project-card__body">
            <h3 class="project-card__title">${I18N.escapeHtml(title)}</h3>
            ${desc ? `<p class="project-card__desc">${I18N.escapeHtml(desc)}</p>` : ""}
            <div class="project-card__tags">${tags.map((t) => `<span>${I18N.escapeHtml(t)}</span>`).join("")}</div>
            ${p.url ? `<span class="project-card__link">${I18N.escapeHtml(viewLabel)} →</span>` : ""}
          </div>`;

        return p.url
          ? `<a class="project-card reveal" href="${p.url}" target="_blank" rel="noopener">${cardInner}</a>`
          : `<article class="project-card reveal">${cardInner}</article>`;
      })
      .join("");

    if (window.ScrollReveal) window.ScrollReveal.observeAll();
  }

  function render() {
    renderFilters();
    renderGrid();
  }

  return { load, render };
})();
