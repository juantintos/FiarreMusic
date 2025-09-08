function loadHTML(id, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === "function") callback(); // Ejecuta callback si existe
    })
    .catch(error => console.error(error));
}

// Cargar header y luego manipular el logo
loadHTML('header', 'header.html', () => {
  const logoContainer = document.getElementById('logo-container');
  const logoText = document.getElementById('logo-text');

  if (logoContainer && logoText) {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    if (currentPage !== "index.html" && currentPage !== "") {
      const link = document.createElement('a');
      link.href = "index.html";
      link.style.color = "#FFD700";
      link.style.textDecoration = "none";

      link.appendChild(logoText.cloneNode(true));
      logoContainer.innerHTML = "";
      logoContainer.appendChild(link);
    }
  }
});

// Cargar footer sin necesidad de callback
loadHTML('footer', 'footer.html');

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
});