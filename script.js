document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const inSubfolder = path.includes("/articles") || path.includes("/news");
  const basePath = inSubfolder ? "../" : "";

  // ARTÍCULOS DINÁMICOS (en páginas principales)
  const containerArticles = document.getElementById("articles-container");
  if (containerArticles) {
    fetch(basePath + "articles/articles.json")
      .then(res => res.json())
      .then(data => {
        const items = path.includes("articles") ? data.reverse() : data.reverse().slice(0, 2);
        items.forEach(item => {
          const card = document.createElement("a");
          card.href = item.link;
          card.className = "card";
          card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
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
    fetch(basePath + "news/news.json")
      .then(res => res.json())
      .then(data => {
        const items = path.includes("news") ? data.reverse() : data.reverse().slice(0, 1);
        items.forEach(item => {
          const card = document.createElement("a");
          card.href = item.link;
          card.className = "card";
          card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          `;
          containerNews.appendChild(card);
        });
      });
  }

  // ASIDE: latest news + latest articles
  const latestNews = document.getElementById("latest-news");
  const latestArticles = document.getElementById("latest-articles");

  if (latestNews && latestArticles) {
    fetch(basePath + "news/news.json")
      .then(res => res.json())
      .then(data => {
        data.reverse().slice(0, 3).forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
          latestNews.appendChild(li);
        });
      });

    fetch(basePath + "articles/articles.json")
      .then(res => res.json())
      .then(data => {
        data.reverse().slice(0, 3).forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
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
