const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(track.children);
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  let currentIndex = 0;

  const updateCarousel = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
    });
  };

  prevButton?.addEventListener("click", () => updateCarousel(currentIndex - 1));
  nextButton?.addEventListener("click", () => updateCarousel(currentIndex + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateCarousel(index));
  });

  window.setInterval(() => {
    updateCarousel(currentIndex + 1);
  }, 5000);
}

const filterGroup = document.querySelector("[data-filter-group]");
const galleryCards = Array.from(document.querySelectorAll("[data-gallery-grid] .gallery-card"));

if (filterGroup && galleryCards.length) {
  const chips = Array.from(filterGroup.querySelectorAll("[data-filter]"));

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter");

      chips.forEach((item) => item.classList.toggle("is-active", item === chip));

      galleryCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const visible = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });
}

const whatsappForm = document.querySelector("[data-whatsapp-form]");
const whatsappNumberNode = document.querySelector("[data-whatsapp-number]");
const whatsappLink = document.querySelector("[data-whatsapp-link]");

if (whatsappNumberNode && whatsappLink) {
  const phoneNumber = whatsappNumberNode.textContent.trim();
  whatsappLink.href = `https://wa.me/${phoneNumber}`;
}

if (whatsappForm) {
  whatsappForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const phoneNumber = whatsappNumberNode?.textContent?.trim() || "";
    const formData = new FormData(whatsappForm);

    const message = [
      "Bonjour LAAFI DE TIBGA,",
      `Nom : ${formData.get("nom") || ""}`,
      `Téléphone : ${formData.get("telephone") || ""}`,
      `Type de demande : ${formData.get("prestation") || ""}`,
      `Date souhaitée : ${formData.get("date") || "Non précisée"}`,
      `Détails : ${formData.get("details") || "Aucun détail supplémentaire"}`
    ].join("\n");

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  });
}
