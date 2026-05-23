import "./styles.css";
import {
  miscHtml,
  news,
  profile,
  publications,
  researchHtml,
  selectedProjects,
  serviceItems,
  type Link,
  type Publication,
} from "./content";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app root element.");
}

const joinLinks = (links: Link[]): string =>
  links.map((link) => `<a href="${link.href}">${link.label}</a>`).join(" <span class=\"sep\">&middot;</span> ");

const renderProfileLinks = (links: Link[]): string =>
  links.map((link) => `<a href="${link.href}">${link.label}</a>`).join(" <span class=\"sep\">&middot;</span> ");

const renderSection = (title: string, body: string): string => `
  <section class="section">
    <h2>${title}</h2>
    ${body}
  </section>
`;

const renderNews = (): string => `
  <section class="section news-section">
    <h2>News</h2>
    <div class="news-list">
      ${news
        .map(
          (item, index) =>
            `<p class="${index >= 3 ? "is-hidden" : ""}" data-news-extra="${index >= 3 ? "true" : "false"}"><strong>${item.date}:</strong> ${item.html}</p>`,
        )
        .join("")}
    </div>
    ${
      news.length > 3
        ? `<button class="news-toggle" type="button" aria-expanded="false">Show older news</button>`
        : ""
    }
  </section>
`;

const renderPublication = (publication: Publication, options: { hideAuthors?: boolean } = {}): string => `
  <article class="publication">
    <div class="publication-body">
      <h3><a href="${publication.href}">${publication.title}</a></h3>
      ${options.hideAuthors ? "" : `<p class="authors">${publication.authorsHtml}</p>`}
      <p class="venue">${publication.venueHtml}</p>
      <p class="paper-links">${joinLinks(publication.links)}</p>
    </div>
  </article>
`;

const renderPublications = (): string => `
  <section class="section publications-section">
    <h2 class="publications-heading">Recent Selected Projects</h2>
    <div class="publications">
      ${selectedProjects
        .map(
          (publication) => `
            <div data-selected-project="true">
              ${renderPublication(publication, { hideAuthors: true })}
            </div>
          `,
        )
        .join("")}
      ${publications
        .map(
          (publication) => `
            <div class="is-hidden" data-publication-extra="true">
              ${renderPublication(publication)}
            </div>
          `,
        )
        .join("")}
    </div>
    ${
      publications.length > 0
        ? `<button class="publication-toggle" type="button" aria-expanded="false">Show all publications</button>`
        : ""
    }
  </section>
`;

app.innerHTML = `
  <main class="page-shell">
    <header class="hero">
      <div class="hero-copy">
        <h1>${profile.name}</h1>
        <p>${profile.introHtml}</p>
        <nav class="profile-links" aria-label="Profile links">
          ${renderProfileLinks(profile.links)}
        </nav>
      </div>
      <figure class="profile-figure">
        <div class="image-wrapper">
          <img alt="profile photo" src="${profile.primaryImage}" class="profile-image" />
        </div>
      </figure>
    </header>

    ${renderSection("Research", `<p>${researchHtml}</p>`)}

    ${renderNews()}

    ${renderPublications()}

    ${renderSection("Service", serviceItems.map((item) => `<p>${item}</p>`).join(""))}

    ${renderSection("Misc.", miscHtml.map((item) => `<p>${item}</p>`).join(""))}
  </main>
`;

const newsToggle = document.querySelector<HTMLButtonElement>(".news-toggle");
const extraNews = Array.from(document.querySelectorAll<HTMLElement>("[data-news-extra='true']"));

newsToggle?.addEventListener("click", () => {
  const isExpanded = newsToggle.getAttribute("aria-expanded") === "true";

  extraNews.forEach((item) => {
    item.classList.toggle("is-hidden", isExpanded);
  });

  newsToggle.setAttribute("aria-expanded", String(!isExpanded));
  newsToggle.textContent = isExpanded ? "Show older news" : "Hide older news";
});

const publicationToggle = document.querySelector<HTMLButtonElement>(".publication-toggle");
const selectedProjectItems = Array.from(document.querySelectorAll<HTMLElement>("[data-selected-project='true']"));
const extraPublications = Array.from(document.querySelectorAll<HTMLElement>("[data-publication-extra='true']"));
const publicationsHeading = document.querySelector<HTMLHeadingElement>(".publications-heading");

publicationToggle?.addEventListener("click", () => {
  const isExpanded = publicationToggle.getAttribute("aria-expanded") === "true";

  extraPublications.forEach((item) => {
    item.classList.toggle("is-hidden", isExpanded);
  });

  selectedProjectItems.forEach((item) => {
    item.classList.toggle("is-hidden", !isExpanded);
  });

  publicationToggle.setAttribute("aria-expanded", String(!isExpanded));
  publicationToggle.textContent = isExpanded ? "Show all publications" : "Show selected projects";
  if (publicationsHeading) {
    publicationsHeading.textContent = isExpanded ? "Recent Selected Projects" : "Full Publication";
  }
});
