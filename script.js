/* =========================================================
   INMOBILIARIA XYZ — LÓGICA DEL SITIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     0. Bloqueo de scroll compartido
     (menú móvil, modal de propiedad y lightbox pueden
     necesitar bloquear el scroll; el contador evita que uno
     restaure el scroll mientras otro todavía lo necesita)
     ----------------------------- */
  let scrollLockCount = 0;

  function lockScroll() {
    scrollLockCount += 1;
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = "";
    }
  }

  /* -----------------------------
     1. Navbar — menú móvil
     ----------------------------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navbarToggle");
  const navMenu = document.getElementById("navbarNav");
  const navOverlay = document.getElementById("navbarOverlay");
  const navLinks = navMenu.querySelectorAll(".navbar__link");

  function openMenu() {
    navMenu.setAttribute("data-open", "true");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    navOverlay.classList.add("is-visible");
    lockScroll();
  }

  function closeMenu() {
    if (navMenu.getAttribute("data-open") !== "true") return;
    navMenu.setAttribute("data-open", "false");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navOverlay.classList.remove("is-visible");
    unlockScroll();
  }

  function toggleMenu() {
    const isOpen = navMenu.getAttribute("data-open") === "true";
    isOpen ? closeMenu() : openMenu();
  }

  navToggle.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", closeMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* -----------------------------
     2. Efecto de scroll: navbar compacta + sombra
     ----------------------------- */
  function handleScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  /* -----------------------------
     3. Configuración del sitio (único lugar para editar)
     ----------------------------- */
  // Para cambiar el número de WhatsApp, editá SOLO esta línea.
  const siteConfig = {
    whatsappNumber: "595981951940",
    whatsappMessage:
      "Hola, me gustaría recibir información sobre las propiedades disponibles.",
  };

  // Para activar una red social, reemplazá el valor por la URL real.
  const socialLinks = {
    instagram: "https://www.instagram.com/larios.ang/",
    facebook: "https://www.facebook.com/profile.php?id=100088973084744",
    linkedin: "https://www.tiktok.com/@ang.larios?is_from_webapp=1&sender_device=pc",
  };

  function buildWhatsappUrl(message) {
    const text = encodeURIComponent(message || siteConfig.whatsappMessage);
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
  }

  const contactWhatsapp = document.getElementById("contactWhatsapp");
  if (contactWhatsapp) {
    contactWhatsapp.href = buildWhatsappUrl(siteConfig.whatsappMessage);
  }

  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) {
    whatsappFloat.href = buildWhatsappUrl(siteConfig.whatsappMessage);
  }

  document.querySelectorAll("[data-social]").forEach((link) => {
    const key = link.getAttribute("data-social");
    const url = socialLinks[key];

    if (!url || url === "#") {
      link.setAttribute("href", "#");
      link.addEventListener("click", (e) => e.preventDefault());
    } else {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
    }
  });

  /* -----------------------------
     4. Datos de propiedades (ficticios, con fines demostrativos)
     ----------------------------- */
  const properties = [
    {
      id: 1,
      title: "Residencia Los Laureles",
      type: "casa",
      typeLabel: "Casa",
      location: "Los Laureles",
      city: "Asunción",
      price: 310000,
      bedrooms: 4,
      bathrooms: 3,
      area: 290,
      alt: "Casa de dos pisos con acceso a garaje subterraneo",
      description:
        "Casa de lujo con dos pisos, un acceso a garaje subettaneo, con una amplia sala, cocina con estilo moderno y habitaciones decoradas detalladamente.",
      gallery: [
        "images/casa-1.png",
        "images/casa-1-sala.jpeg",
        "images/casa-1-cocina.jpeg",
        "images/casa-1-habitacion.jpeg",
      ],
    },
    {
      id: 2,
      title: "Residencia Iturbe",
      type: "casa",
      typeLabel: "Casa",
      location: "Prócer Juan Manuel Iturbe",
      city: "Asunción",
      price: 290000,
      bedrooms: 4,
      bathrooms: 3,
      area: 310,
      alt: "Casa moderna con estilo rustico",
      description:
        "Residencia Sinfonía de Piedra y Luz Sofisticada arquitectura contemporánea con fachada de piedra y madera, que abre a una cocina gourmet de mármol Calacatta y una sala de doble altura con chimenea y arte curado.",
      gallery: [
        "images/casa-2.png",
        "images/casa-2-sala.jpg",
        "images/casa-2-cocina.jpeg",
      ],
    },
    {
      id: 3,
      title: "Torres Carmelitas",
      type: "departamento",
      typeLabel: "Departamento",
      location: "Carmelitas",
      price: 168000,
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      alt: "Edificio de departamentos en el barrio Carmelitas",
      description:
        "Departamento funcional en un edificio de categoría en Carmelitas, con buena orientación y fácil acceso al centro de Asunción. Ideal como primera vivienda o inversión.",
      gallery: [
        "https://images.unsplash.com/photo-1567016251318-c85cc6f139c9?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1000&h=750&q=80",
      ],
    },
    {
      id: 4,
      title: "Casa Jardín del Sol",
      type: "casa",
      typeLabel: "Casa",
      location: "Luque",
      price: 142000,
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      alt: "Casa familiar con jardín en Luque",
      description:
        "Casa familiar con jardín propio en Luque, en una zona residencial tranquila y con buena conectividad. Ambientes luminosos y espacios verdes en toda la propiedad.",
      gallery: [
        "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&h=750&q=80",
      ],
    },
    {
      id: 5,
      title: "Refugio del Lago",
      type: "quinta",
      typeLabel: "Quinta / Casa de campo",
      location: "San Bernardino",
      price: 265000,
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      alt: "Casa de campo de madera rodeada de naturaleza en San Bernardino",
      description:
        "Casa de fin de semana rodeada de naturaleza, a minutos del lago Ypacaraí. Ideal para descansar en familia o como propiedad de alquiler temporario.",
      gallery: [
        "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1757361653037-dbf0d0a820ae?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1000&h=750&q=80",
      ],
    },
    {
      id: 6,
      title: "Loft Republicano",
      type: "loft",
      typeLabel: "Loft",
      location: "Asunción",
      price: 98000,
      bedrooms: 1,
      bathrooms: 1,
      area: 62,
      alt: "Loft moderno en el centro histórico de Asunción",
      description:
        "Loft compacto y bien resuelto en el centro histórico de Asunción, ideal para quienes buscan una primera propiedad con estilo, cerca de todo.",
      gallery: [
        "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&h=750&q=80",
        "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1000&h=750&q=80",
      ],
    },
  ];

  const priceFormatter = new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  function pluralize(count, singular, plural) {
    return `${count} ${count === 1 ? singular : plural}`;
  }

  /* -----------------------------
     5. Lightbox de imágenes (galería + modal de propiedad)
     ----------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxPrevBtn = document.getElementById("lightboxPrev");
  const lightboxNextBtn = document.getElementById("lightboxNext");

  let lightboxImages = [];
  let lightboxIndex = 0;
  let lightboxTriggerEl = null;

  function updateLightboxImage() {
    const current = lightboxImages[lightboxIndex];
    if (!current) return;
    lightboxImage.src = current.src;
    lightboxImage.alt = current.alt || "";
  }

  function openLightbox(images, startIndex, triggerEl) {
    if (!images || images.length === 0) return;
    lightboxImages = images;
    lightboxIndex = startIndex || 0;
    lightboxTriggerEl = triggerEl || document.activeElement;

    const hasMultiple = images.length > 1;
    lightboxPrevBtn.hidden = !hasMultiple;
    lightboxNextBtn.hidden = !hasMultiple;

    updateLightboxImage();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lockScroll();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    unlockScroll();
    if (lightboxTriggerEl && typeof lightboxTriggerEl.focus === "function") {
      lightboxTriggerEl.focus();
    }
  }

  function showLightboxPrev() {
    if (lightboxImages.length < 2) return;
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  }

  function showLightboxNext() {
    if (lightboxImages.length < 2) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  }

  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  lightboxPrevBtn.addEventListener("click", showLightboxPrev);
  lightboxNextBtn.addEventListener("click", showLightboxNext);

  // Galería general: cada miniatura abre el lightbox en su propio índice.
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryButtons = Array.from(galleryGrid.querySelectorAll(".gallery__item"));
  const galleryImages = galleryButtons.map((btn) => {
    const img = btn.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
  });

  galleryButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => openLightbox(galleryImages, index, btn));
  });

  /* -----------------------------
     6. Modal de detalle de propiedad
     ----------------------------- */
  const propertyModal = document.getElementById("propertyModal");
  const propertyModalMainButton = document.getElementById("propertyModalMainButton");
  const propertyModalMainImage = document.getElementById("propertyModalMainImage");
  const propertyModalThumbs = document.getElementById("propertyModalThumbs");
  const propertyModalType = document.getElementById("propertyModalType");
  const propertyModalTitle = document.getElementById("propertyModalTitle");
  const propertyModalLocation = document.getElementById("propertyModalLocation");
  const propertyModalPrice = document.getElementById("propertyModalPrice");
  const propertyModalStats = document.getElementById("propertyModalStats");
  const propertyModalDescription = document.getElementById("propertyModalDescription");
  const propertyModalWhatsapp = document.getElementById("propertyModalWhatsapp");
  const propertyModalContactBtn = document.getElementById("propertyModalContact");
  const propertyModalCloseBtn = propertyModal.querySelector(".property-modal__close");

  let currentModalProperty = null;
  let currentModalImageIndex = 0;
  let modalTriggerEl = null;

  function setModalImage(index) {
    if (!currentModalProperty) return;
    currentModalImageIndex = index;

    propertyModalMainImage.src = currentModalProperty.gallery[index];
    propertyModalMainImage.alt = `${currentModalProperty.title} — imagen ${index + 1} de ${currentModalProperty.gallery.length}`;

    propertyModalThumbs.querySelectorAll("button").forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
    });
  }

  function propertyWhatsappMessage(property) {
    return `Hola, estoy interesado/a en la propiedad ${property.title} (${property.location}). ¿Podrían darme más información?`;
  }

  function openPropertyModal(property, triggerEl) {
    currentModalProperty = property;
    modalTriggerEl = triggerEl || document.activeElement;

    propertyModalType.textContent = property.typeLabel;
    propertyModalTitle.textContent = property.title;
    propertyModalLocation.textContent = property.location;
    propertyModalPrice.textContent = priceFormatter.format(property.price);
    propertyModalDescription.textContent = property.description;

    propertyModalStats.innerHTML = `
      <li>${pluralize(property.bedrooms, "dormitorio", "dormitorios")}</li>
      <li>${pluralize(property.bathrooms, "baño", "baños")}</li>
      <li>${property.area} m²</li>
    `;

    propertyModalThumbs.innerHTML = property.gallery
      .map(
        (src, i) => `
          <button type="button" data-index="${i}" aria-label="Ver imagen ${i + 1} de ${property.title}">
            <img src="${src}" alt="" />
          </button>
        `
      )
      .join("");

    propertyModalThumbs.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => setModalImage(Number(btn.dataset.index)));
    });

    setModalImage(0);

    propertyModalWhatsapp.href = buildWhatsappUrl(propertyWhatsappMessage(property));
    propertyModalWhatsapp.setAttribute(
      "aria-label",
      `Consultar por ${property.title} vía WhatsApp`
    );

    propertyModal.classList.add("is-open");
    propertyModal.setAttribute("aria-hidden", "false");
    lockScroll();
    propertyModalCloseBtn.focus();
  }

  function closePropertyModal() {
    if (!propertyModal.classList.contains("is-open")) return;
    propertyModal.classList.remove("is-open");
    propertyModal.setAttribute("aria-hidden", "true");
    unlockScroll();
    currentModalProperty = null;
    if (modalTriggerEl && typeof modalTriggerEl.focus === "function") {
      modalTriggerEl.focus();
    }
  }

  propertyModal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closePropertyModal);
  });

  // El botón de la imagen principal del modal abre el lightbox
  // con la galería completa de esa propiedad.
  propertyModalMainButton.addEventListener("click", () => {
    if (!currentModalProperty) return;
    const images = currentModalProperty.gallery.map((src, i) => ({
      src,
      alt: `${currentModalProperty.title} — imagen ${i + 1}`,
    }));
    openLightbox(images, currentModalImageIndex, propertyModalMainButton);
  });

  // "Dejar mis datos": precarga el formulario de contacto con el
  // interés en esta propiedad y lleva al usuario hasta esa sección.
  propertyModalContactBtn.addEventListener("click", () => {
    if (!currentModalProperty) return;
    const messageField = document.getElementById("message");
    if (messageField) {
      messageField.value = `Hola, estoy interesado/a en la propiedad ${currentModalProperty.title}. Me gustaría recibir más información.`;
    }
    closePropertyModal();
    requestAnimationFrame(() => {
      const contactSection = document.getElementById("contacto");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* -----------------------------
     7. Render de propiedades + filtros
     ----------------------------- */
  const propertiesGrid = document.getElementById("propertiesGrid");
  const propertiesEmpty = document.getElementById("propertiesEmpty");
  const propertiesCount = document.getElementById("propertiesCount");

  function propertyCardHTML(property) {
    const whatsappMessage = propertyWhatsappMessage(property);

    return `
      <article class="property-card">
        <div class="property-card__media">
          <span class="property-card__badge">${property.typeLabel}</span>
          <img src="${property.gallery[0]}" alt="${property.alt}" loading="lazy" />
        </div>
        <div class="property-card__body">
          <p class="property-card__location">${property.location}</p>
          <h3 class="property-card__title">${property.title}</h3>
          <p class="property-card__price">${priceFormatter.format(property.price)}</p>
          <ul class="property-card__features">
            <li>${pluralize(property.bedrooms, "dorm.", "dorm.")}</li>
            <li>${pluralize(property.bathrooms, "baño", "baños")}</li>
            <li>${property.area} m²</li>
          </ul>
          <div class="property-card__actions">
            <button type="button" class="property-card__link" data-property-id="${property.id}">Ver más</button>
            <a
              href="${buildWhatsappUrl(whatsappMessage)}"
              class="property-card__whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por ${property.title} vía WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.2-.2 0-.4.1-.5.1-.1.2-.3.3-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.2 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z"/></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function matchesPriceRange(price, range) {
    if (range === "todos") return true;
    if (range === "hasta-150000") return price <= 150000;
    if (range === "150000-300000") return price > 150000 && price <= 300000;
    if (range === "mas-300000") return price > 300000;
    return true;
  }

  /* -----------------------------
     8. Animación de aparición al hacer scroll
     ----------------------------- */
  // Se define ANTES de renderProperties() porque renderProperties()
  // llama a observeRevealElements(), que necesita que revealObserver
  // ya exista.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  function observeRevealElements() {
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  function renderProperties() {
    const type = document.getElementById("filterType").value;
    const location = document.getElementById("filterLocation").value;
    const priceRange = document.getElementById("filterPrice").value;

    const filtered = properties.filter((property) => {
      const matchesType = type === "todos" || property.type === type;
      const matchesLocation =
  location === "todos" ||
  property.city === location ||
  property.location === location;
      const matchesPrice = matchesPriceRange(property.price, priceRange);
      return matchesType && matchesLocation && matchesPrice;
    });

    propertiesGrid.innerHTML = filtered.length
      ? filtered.map(propertyCardHTML).join("")
      : "";
    propertiesEmpty.hidden = filtered.length > 0;

    propertiesCount.textContent =
      filtered.length === 1
        ? "1 propiedad encontrada"
        : `${filtered.length} propiedades encontradas`;

    observeRevealElements();
  }

  // "Ver más" abre el modal de detalle. Se usa delegación de eventos
  // sobre el grid (que se sigue re-renderizando en cada filtro) para
  // no duplicar listeners tarjeta por tarjeta.
  propertiesGrid.addEventListener("click", (e) => {
    const link = e.target.closest(".property-card__link");
    if (!link) return;

    const property = properties.find(
      (p) => String(p.id) === link.dataset.propertyId
    );
    if (!property) return;

    openPropertyModal(property, link);
  });

  ["filterType", "filterLocation", "filterPrice"].forEach((id) => {
    document.getElementById(id).addEventListener("change", renderProperties);
  });

  document.getElementById("filtersReset").addEventListener("click", () => {
    document.getElementById("filterType").value = "todos";
    document.getElementById("filterLocation").value = "todos";
    document.getElementById("filterPrice").value = "todos";
    renderProperties();
  });

  renderProperties(); // ya llama a observeRevealElements() al final

  /* -----------------------------
     9. Teclado: un único listener para Escape / flechas
     (lightbox > modal de propiedad > menú móvil, en ese orden)
     ----------------------------- */
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightboxPrev();
      if (e.key === "ArrowRight") showLightboxNext();
      return;
    }

    if (e.key !== "Escape") return;

    if (propertyModal.classList.contains("is-open")) {
      closePropertyModal();
    } else {
      closeMenu();
    }
  });

  /* -----------------------------
     10. Formulario de contacto
     ----------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  function setFieldError(field, message) {
    const wrapper = field.closest(".form-field");
    const errorEl = wrapper.querySelector(".form-error");
    if (message) {
      wrapper.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      wrapper.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validateContactForm() {
    let isValid = true;

    const name = contactForm.name;
    const email = contactForm.email;
    const phone = contactForm.phone;
    const message = contactForm.message;

    if (!name.value.trim()) {
      setFieldError(name, "Ingresá tu nombre.");
      isValid = false;
    } else {
      setFieldError(name, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      setFieldError(email, "Ingresá un email válido.");
      isValid = false;
    } else {
      setFieldError(email, "");
    }

    const digitsOnly = phone.value.replace(/\D/g, "");
    if (digitsOnly.length < 6) {
      setFieldError(phone, "Ingresá un teléfono válido.");
      isValid = false;
    } else {
      setFieldError(phone, "");
    }

    if (!message.value.trim()) {
      setFieldError(message, "Contanos brevemente qué estás buscando.");
      isValid = false;
    } else {
      setFieldError(message, "");
    }

    return isValid;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = true;

    if (!validateContactForm()) return;

    // Sin backend todavía: solo mostramos una confirmación visual.
    formSuccess.hidden = false;
    contactForm.reset();
  });

  /* -----------------------------
     11. Año dinámico en el footer
     ----------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});