document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const inSubfolder = path.includes("/articles") || path.includes("/news");
  const basePath = inSubfolder ? "../" : "";

  // ARTÍCULOS DINÁMICOS
  const containerArticles = document.getElementById("articles-container");
  if (containerArticles) {
    fetch(basePath + "articles.json")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const items = path.includes("articles") ? sorted : sorted.slice(0, 2);
        items.forEach(item => {
          const card = document.createElement("a");
          card.href = basePath + item.link;
          card.className = "card";
          card.innerHTML = `
            <img src="${basePath + item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          `;
          containerArticles.appendChild(card);
        });
      });
  }

  // NOTICIAS DINÁMICAS
  const containerNews = document.getElementById("news-container");
  if (containerNews) {
    fetch(basePath + "news.json")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const items = path.includes("news") ? sorted : sorted.slice(0, 1);
        items.forEach(item => {
          const card = document.createElement("a");
          card.href = basePath + item.link;
          card.className = "card";
          card.innerHTML = `
            <img src="${basePath + item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          `;
          containerNews.appendChild(card);
        });
      });
  }

  // ASIDE Latest News + Latest Articles (también ordenado por fecha)
  const latestNews = document.getElementById("latest-news");
  const latestArticles = document.getElementById("latest-articles");

  if (latestNews && latestArticles) {
    fetch(basePath + "news.json")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        sorted.slice(0, 3).forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${basePath + item.link}">${item.title}</a>`;
          latestNews.appendChild(li);
        });
      });

    fetch(basePath + "articles.json")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        sorted.slice(0, 3).forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${basePath + item.link}">${item.title}</a>`;
          latestArticles.appendChild(li);
        });
      });
  }

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