// Función para cargar HTML en un elemento
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

// Cargar header y luego manipular logo y nav
loadHTML('header', 'header.html', () => {
  // Después de cargar el header, solo nos aseguramos de que el logo permanezca visible
  const logoContainer = document.getElementById('logo-container');
  if (logoContainer) {
    // Nada que reemplazar, solo aseguramos que el contenedor exista
    logoContainer.style.display = "flex"; // opcional, en caso de que esté oculto
  }

  const esFlag = document.getElementById('lang-es');
  const enFlag = document.getElementById('lang-en');

  // Manejar cambio de idioma
  function changeLanguage(lang) {

    document.querySelector('a[href="index.html"]').textContent = translations[lang].home;
    document.querySelector('a[href="artistas.html"]').textContent = translations[lang].artists;
    document.querySelector('a[href="acerca.html"]').textContent = translations[lang].about;
    document.querySelector('a[href="contactanos.html"]').textContent = translations[lang].contact;
    
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key]; // usa innerHTML para respetar <b>
      }
    });
   }

  if (esFlag) esFlag.addEventListener('click', () => changeLanguage('es'));
  if (enFlag) enFlag.addEventListener('click', () => changeLanguage('en'));

  // -------------------------------
  // Condicionar nav según página
  // -------------------------------
  const navLinksByPage = {
    "index.html": ["artistas.html", "acerca.html", "contactanos.html"],
    "artistas.html": ["index.html", "acerca.html", "contactanos.html"],
    "acerca.html": ["index.html", "artistas.html", "contactanos.html"],
    "contactanos.html": ["index.html", "artistas.html", "acerca.html"]
  };

  const currentPage = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
  const nav = document.querySelector('.main-nav');

  if (nav) {
    const links = nav.querySelectorAll('a');
    const linksToShow = navLinksByPage[currentPage] || [];

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!linksToShow.includes(href)) {
        link.style.display = 'none';
      } else {
        link.style.display = 'inline-block';
      }
    });
  }
});

// Cargar footer sin necesidad de callback
loadHTML('footer', 'footer.html');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("thankyou-modal");
  const closeModal = document.getElementById("close-modal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita el refresh

    try {
      await fetch("https://formsubmit.co/ajax/juantintos@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

    // Limpia el formulario
    form.reset();

    // Muestra el modal
    modal.style.display = "flex";
    } catch (error) {
      alert("❌ Error al enviar el mensaje. Intenta de nuevo.");
    }
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar si clickea fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
