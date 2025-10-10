const artists = [
  {
    name: "Luis Fernando",
    genre: "Tumbado",
    image: "img/ta.png",
    socials: {
      facebook: "#",
      instagram: "#",
      spotify: "#"
    }
  },
  {
    name: "DeCalifornia",
    genre: "Rock",
    image: "img/foto.png",
    socials: {
      facebook: "#",
      instagram: "#",
      spotify: "#"
    }
    
  },
  {
    name: "Fatima",
    genre: "Ranchero",
    image: "img/fatima.png",
    socials: {
      facebook: "#",
      instagram: "#",
      spotify: "#"
    }
  },
  {
    name: "Endubmexi",
    genre: "Rock",
    image: "img/enb.png",
    socials: {
      facebook: "#",
      instagram: "#",
      spotify: "#"
    }
    
  },
   
  // Más artistas...
];

const grid = document.getElementById("artist-grid");

artists.forEach(artist => {
  const card = document.createElement("div");
  card.className = "artist-card";

  // Fondo dinámico 🎨
  card.style.backgroundImage = `url(${artist.image})`;

  card.innerHTML = `
    <div class="artist-overlay">
      <h2>${artist.name}</h2>
      <p>Género: ${artist.genre}</p>
      <div class="artist-socials">
        ${Object.entries(artist.socials).map(([key, url]) => `
          <a href="${url}" target="_blank"><i class="fab fa-${key}"></i></a>
        `).join('')}
      </div>
    </div>
  `;

  grid.appendChild(card);
});
