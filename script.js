
// Cargar artículos desde articles.json
fetch("articles.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("articulos-dinamicos");
    data.forEach(item => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta compacta";
      tarjeta.innerHTML = `
        <a href="${item.link}">
          <div class="contenido-texto">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          </div>
          <img src="${item.img}" alt="${item.title}">
        </a>
      `;
      contenedor.appendChild(tarjeta);
    });
  });

// Cargar noticias desde news.json
fetch("news.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("noticias-dinamicas");
    data.forEach(item => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta compacta";
      tarjeta.innerHTML = `
        <a href="${item.link}">
          <div class="contenido-texto">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          </div>
          <img src="${item.img}" alt="${item.title}">
        </a>
      `;
      contenedor.appendChild(tarjeta);
    });
  });
