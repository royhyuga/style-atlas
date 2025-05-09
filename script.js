onst path = window.location.pathname;
const isIndex = path.includes("index.html") || path === "/";
const isArticlesPage = path.includes("articles.html");
const isNewsPage = path.includes("news.html");

// Artículos
if (document.getElementById("articles-container")) {
  fetch("articles/articles.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("articles-container");
      container.innerHTML = "";

      const items = isIndex ? data.slice(-6).reverse() : data.reverse();

      items.forEach(article => {
        const card = document.createElement("div");
        card.className = "tarjeta vertical";
        card.innerHTML = `
          <a href="${article.link}">
            <img src="${article.img}" alt="${article.title}" />
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
          </a>
        `;
        container.appendChild(card);
      });
    });
}

// Noticias
if (document.getElementById("news-container")) {
  fetch("news/news.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("news-container");
      container.innerHTML = "";

      const items = isIndex ? data.slice(-6).reverse() : data.reverse();

      items.forEach(news => {
        const card = document.createElement("div");
        card.className = "tarjeta vertical";
        card.innerHTML = `
          <a href="${news.link}">
            <img src="${news.img}" alt="${news.title}" />
            <p>${news.title}</p>
          </a>
        `;
        container.appendChild(card);
      });
    });
}

// Barra de progreso
window.addEventListener("scroll", () => {
  const bar = document.querySelector(".barra-progreso");
  if (!bar) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (scrollTop / scrollHeight) * 100;
  bar.style.width = percent + "%";
});
