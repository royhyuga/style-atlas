document.addEventListener("DOMContentLoaded", () => {
  // Cargar artículos
  fetch("articles/articles.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("articles-container");
      const latest = data.slice(0, 2);
      latest.forEach(article => {
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
      const latest = data.slice(0, 1);
      latest.forEach(news => {
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

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open");
  });
});
