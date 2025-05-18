document.addEventListener("DOMContentLoaded", () => {
  fetch("articles.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("articles-container");
      const latest = data.slice(0, 2); // solo 2 artículos
      latest.forEach(article => {
        const card = document.createElement("a");
        card.href = article.url;
        card.className = "card";
        card.style.display = "block";
        card.style.marginBottom = "2rem";
        card.innerHTML = `
          <img src="${article.image}" alt="${article.title}" style="width:100%; border-radius: 4px;">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        `;
        container.appendChild(card);
      });
    });

  fetch("news.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("news-container");
      const latest = data.slice(0, 1); // solo 1 noticia
      latest.forEach(news => {
        const card = document.createElement("a");
        card.href = news.url;
        card.className = "card";
        card.style.display = "block";
        card.innerHTML = `
          <img src="${news.image}" alt="${news.title}" style="width:100%; border-radius: 4px;">
          <h3>${news.title}</h3>
          <p>${news.description}</p>
        `;
        container.appendChild(card);
      });
    });
});
