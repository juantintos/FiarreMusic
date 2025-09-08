let slideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const track = document.querySelector(".carousel-track");

  if (!slides.length || !track) return; // <-- evita error si no existe carrusel

  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  track.style.transform = `translateX(${-slideIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[slideIndex]) dots[slideIndex].classList.add("active");
}

function moveSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

// Inicializa solo si existe carrusel
if (document.querySelector(".carousel-track")) {
  showSlide(slideIndex);
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 5000);
}
