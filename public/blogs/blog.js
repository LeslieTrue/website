(() => {
  // Number headings once and use the same hierarchy for the article and contents.
  const sections = Array.from(document.querySelectorAll(".article .section[id]"));
  const toc = document.querySelector(".toc");
  const tocList = toc?.querySelector("ol");
  const toggle = toc?.querySelector(".toc__toggle");
  const nav = document.querySelector(".topnav__links");
  const entries = [];
  sections.forEach((section, sectionIndex) => {
    const sectionTitle = section.querySelector("h2")?.textContent?.trim() ?? section.id;
    if (nav && section.dataset.nav !== undefined) {
      const link = document.createElement("a");
      link.href = `#${section.id}`;
      link.textContent = section.dataset.nav || sectionTitle;
      nav.appendChild(link);
    }

    const counters = [sectionIndex + 1, 0, 0];
    const parents = [];
    section.querySelectorAll("h2, h3, h4").forEach((heading) => {
      const level = Number(heading.tagName.slice(1)) - 2;
      const label = heading.textContent.trim();
      if (level > 0) counters[level] += 1;
      counters.fill(0, level + 1);
      const number = counters.slice(0, level + 1).join(".");
      if (level > 0 && !heading.id) {
        const slug = label.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
        const base = `${section.id}-${slug || "heading"}`;
        let id = base;
        let suffix = 2;
        while (document.getElementById(id)) id = `${base}-${suffix++}`;
        heading.id = id;
      }
      const target = level === 0 ? section.id : heading.id;
      const prefix = document.createElement("span");
      prefix.className = "heading-number";
      prefix.textContent = number;
      heading.prepend(prefix, document.createTextNode(" "));

      const item = document.createElement("li");
      item.className = "toc__item";
      const link = document.createElement("a");
      link.href = `#${target}`;
      const index = document.createElement("span");
      index.className = "toc__number";
      index.textContent = number;
      const title = document.createElement("span");
      title.textContent = label;
      link.append(index, document.createTextNode(" "), title);
      item.appendChild(link);
      let list = tocList;
      const parent = parents[level - 1];
      if (level > 0 && parent) {
        list = parent.querySelector(":scope > ol");
        if (!list) {
          list = document.createElement("ol");
          parent.appendChild(list);
        }
      }
      list?.appendChild(item);
      parents[level] = item;
      parents.length = level + 1;
      entries.push({ heading, item, link });
    });
  });

  // Reveal only the section selected through navigation, not while scrolling.
  const branches = entries.filter(({ heading, item }) =>
    heading.tagName === "H2" && item.querySelector(":scope > ol"),
  );
  const expandSection = (target) => {
    const section = target?.closest(".section");
    branches.forEach(({ heading, item, link }) => {
      const expanded = heading.closest(".section") === section;
      const list = item.querySelector(":scope > ol");
      list.id = `toc-${heading.closest(".section").id}`;
      list.hidden = !expanded;
      link.setAttribute("aria-controls", list.id);
      link.setAttribute("aria-expanded", String(expanded));
    });
  };
  const expandHash = () => {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); }
    catch { id = ""; }
    expandSection(document.getElementById(id));
  };
  expandHash();
  window.addEventListener("hashchange", expandHash);
  tocList?.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) expandSection(document.getElementById(link.hash.slice(1)));
  });

  const setTocOpen = (open) => {
    toc?.classList.toggle("is-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
  };
  toggle?.addEventListener("click", () => setTocOpen(toggle.getAttribute("aria-expanded") !== "true"));
  tocList?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setTocOpen(false);
  });

  // Track subsections as well as sections, including direct anchor navigation.
  const update = () => {
    const line = Math.max(96, window.innerHeight * 0.3);
    let current = 0;
    entries.forEach(({ heading }, i) => {
      if (heading.getBoundingClientRect().top <= line) current = i;
    });
    entries.forEach(({ item, link }, i) => {
      item.classList.toggle("is-active", i === current);
      if (i === current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("hashchange", update);
  window.addEventListener("load", update);

  // Hover notes: a bubble that follows the cursor over any [data-hover] span.
  const bubble = document.createElement("div");
  bubble.className = "hover-bubble";
  bubble.setAttribute("role", "tooltip");
  bubble.id = "hover-note-tooltip";
  document.body.appendChild(bubble);
  const place = (e) => {
    const halfWidth = bubble.getBoundingClientRect().width / 2;
    const x = Math.max(halfWidth + 8, Math.min(e.clientX, window.innerWidth - halfWidth - 8));
    const y = Math.max(e.clientY, bubble.getBoundingClientRect().height + 22);
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
  };
  document.querySelectorAll("[data-hover]").forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      bubble.textContent = el.dataset.hover ?? "";
      bubble.classList.add("is-visible");
      place(e);
    });
    el.setAttribute("aria-describedby", bubble.id);
    el.addEventListener("focus", () => {
      bubble.textContent = el.dataset.hover ?? "";
      bubble.classList.add("is-visible");
      const rect = el.getBoundingClientRect();
      place({ clientX: rect.left + rect.width / 2, clientY: rect.top });
    });
    el.addEventListener("blur", () => bubble.classList.remove("is-visible"));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Escape") bubble.classList.remove("is-visible");
    });
    el.addEventListener("mousemove", place);
    el.addEventListener("mouseleave", () => bubble.classList.remove("is-visible"));
  });

  // Citation numbers follow the order of the References list.
  const refIndex = new Map(
    Array.from(document.querySelectorAll(".references > li[id]")).map((li, i) => [li.id, i + 1]),
  );
  document.querySelectorAll('a.cite[href^="#ref-"]').forEach((a) => {
    const n = refIndex.get(a.getAttribute("href").slice(1));
    if (n !== undefined) a.textContent = `[${n}]`;
  });

  // Copy buttons on code blocks.
  document.querySelectorAll(".code__copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = btn.closest(".code")?.querySelector("pre")?.textContent ?? "";
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied";
        window.setTimeout(() => (btn.textContent = "Copy"), 1600);
      } catch {
        /* clipboard unavailable: the text is selectable */
      }
    });
  });
})();
