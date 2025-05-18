document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const isArticlesPage = path.includes("articles");
  const isNewsPage = path.includes("news");

  // Cargar artículos
  fetch("articles/articles.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("articles-container");
      if (!container) return;
      const items = isArticlesPage ? data.reverse() : data.reverse().slice(0, 2);
      items.forEach(article => {
        const card = document.createElement("a");
        card.href = article.link;
        card.className = "card";
        card.innerHTML = `
          <img src="${article.img}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.summary}</p>
        `;
        container.appendChild(card);
      });
    });

  // Cargar noticias
  fetch("news/news.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("news-container");
      if (!container) return;
      const items = isNewsPage ? data.reverse() : data.reverse().slice(0, 1);
      items.forEach(news => {
        const card = document.createElement("a");
        card.href = news.link;
        card.className = "card";
        card.innerHTML = `
          <img src="${news.img}" alt="${news.title}">
          <h3>${news.title}</h3>
          <p>${news.summary}</p>
        `;
        container.appendChild(card);
      });
    });

  // Menú hamburguesa
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.classList.toggle("open");
    });
  }
});
