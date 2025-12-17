 const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
  }


  const swiper = new Swiper(".swiper-slider", {
  // Optional parameters
  centeredSlides: true,
  slidesPerView: 1,
  grabCursor: true,
  freeMode: false,
  loop: true,
  mousewheel: false,
  keyboard: {
    enabled: true
  },

  // Enabled autoplay mode
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: false,
    clickable: true
  },

  // If we need navigation
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  // Responsive breakpoints
  breakpoints: {
    640: {
      slidesPerView: 1.25,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 2.5,
      spaceBetween: 30
    },
    1712:{
       slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

// year
 document.getElementById("year").textContent = new Date().getFullYear();

//  wow-animation
   new WOW().init();

   window.addEventListener("load", function () {
    const loader = document.querySelector(".loder");
    if (loader) {
        // Smooth fade out effect
        loader.style.transition = "opacity 3s ease";
        loader.style.opacity = "0";

        // After fade-out, remove it (optional)
        setTimeout(() => {
            loader.style.display = "none";
        }, 3000);
    }
});
