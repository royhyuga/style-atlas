document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const isArticlesPage = path.includes("articles");
  const isNewsPage = path.includes("news");

  // ARTÍCULOS PRINCIPALES
  fetch("articles/articles.json")
    .then(res => res.json())
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

  // NOTICIAS PRINCIPALES
  fetch("news/news.json")
    .then(res => res.json())
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

  // MENÚ HAMBURGUESA
  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.classList.toggle("open");
    });
  }

  // ASIDE DE ÚLTIMAS NOTICIAS Y ARTÍCULOS (solo si existe el aside)
  const newsList = document.getElementById("latest-news");
  const articlesList = document.getElementById("latest-articles");

  if (newsList && articlesList) {
    fetch("news/news.json")
      .then(res => res.json())
      .then(data => {
        data.reverse().slice(0, 3).forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
          newsList.appendChild(li);
        });
      });

    fetch("articles/articles.json")
      .then(res => res.json())
      .then(data => {
        data.reverse().slice(0, 3).forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
          articlesList.appendChild(li);
        });
      });
  }
});
