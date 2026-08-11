// contact.js - Contact page animations and Web3Forms submission (no cursor trail)

document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the contact page; exit if not
  const isContactPage = document.querySelector(".page.contact-page");
  if (!isContactPage) return;

  // Create floating elements for background animation
  const createFloatingElements = () => {
    const floatingContainer = document.querySelector(".floating-elements");
    if (!floatingContainer) return;
    for (let i = 0; i < 12; i++) {
      const element = document.createElement("div");
      element.className = "floating-element";
      element.style.left = Math.random() * 100 + "%";
      element.style.animationDelay = Math.random() * 8 + "s";
      element.style.animationDuration = 8 + Math.random() * 4 + "s";
      floatingContainer.appendChild(element);
    }
  };

  // ========================================
  // WEB3FORMS AJAX SUBMISSION
  // ========================================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".submit-btn");
      const successMessage = document.getElementById("successMessage");

      // Disable button and show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      try {
        const formData = new FormData(contactForm);
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          // Show success message
          successMessage.textContent = "Thank you! Your message has been sent successfully.";
          successMessage.classList.add("show");
          contactForm.reset();
        } else {
          // Show error
          successMessage.textContent = "Oops! Something went wrong. Please try again.";
          successMessage.style.backgroundColor = "var(--accent1)";
          successMessage.classList.add("show");
        }
      } catch (error) {
        successMessage.textContent = "Network error. Please check your connection and try again.";
        successMessage.style.backgroundColor = "var(--accent1)";
        successMessage.classList.add("show");
      }

      // Reset button
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";

      // Hide success message after 5s
      setTimeout(() => {
        successMessage.classList.remove("show");
        successMessage.style.backgroundColor = "";
      }, 5000);
    });
  }

  // Enhance form inputs with focus/blur animations
  const enhanceFormInputs = () => {
    const inputs = document.querySelectorAll(".form-group input, .form-group textarea, .form-group select");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.style.transform = "translateY(-2px)";
      });
      input.addEventListener("blur", () => {
        input.parentElement.style.transform = "";
      });
    });
  };

  // Initialize
  createFloatingElements();
  enhanceFormInputs();
});