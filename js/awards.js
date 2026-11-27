// awards.js - Interactive Certificate Lightbox Modal

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("certModal");
  if (!modal) return;

  const modalImg = modal.querySelector(".cert-modal-img");
  const modalCaption = modal.querySelector(".cert-modal-caption");
  const closeBtn = modal.querySelector(".cert-modal-close");

  const openModal = (src, caption) => {
    modalImg.src = src;
    modalImg.alt = caption || "Certificate";
    modalCaption.textContent = caption || "";
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!modal.classList.contains("active")) {
        modalImg.src = "";
      }
    }, 300);
  };

  // Attach click to preview frames and action buttons
  document.querySelectorAll("[data-cert-src]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const src = trigger.getAttribute("data-cert-src");
      const caption = trigger.getAttribute("data-cert-caption") || "";
      if (src) openModal(src, caption);
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("cert-modal-dialog")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
