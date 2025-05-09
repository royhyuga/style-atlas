const path = window.location.pathname;
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
        card.className = "article-card";
        card.innerHTML = `
          <img src="${article.img}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
          <a href="${article.link}">Read more</a>
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

      const items = isIndex ? data.slice(-4).reverse() : data.reverse();

      items.forEach(news => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <img src="${news.img}" alt="${news.title}">
          <h3>${news.title}</h3>
          <p>${news.summary}</p>
          <a href="${news.link}">Read more</a>
        `;
        container.appendChild(card);
      });
    });
}
