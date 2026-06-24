document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section");

  // 1. 모바일 햄버거 메뉴 열기/닫기
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // 2. 모바일 메뉴 클릭 시 자동 닫기
  // 4. HTML의 scroll-behavior: smooth와 조합되어 부드러운 스크롤 이동 적용
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // 3. 스크롤 위치에 따라 navbar active 상태 변경
  // 5. 스크롤 시 navbar 그림자/배경 강조
  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    // 상단 스크롤 배경 강조 효과
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // 현재 보이는 섹션 감지
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // 네비게이션 바 높이 정도를 미리 빼주어 자연스러운 전환 구성
      if (window.scrollY >= sectionTop - 120) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // 현재 보고 있는 위치의 Nav Link 에 active 클래스 추가
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 이메일 클릭 시 클립보드에 복사하는 기능
  const emailLink = document.getElementById("email-link");
  const emailText = document.getElementById("email-text");

  if (emailLink && emailText) {
    emailLink.addEventListener("click", (e) => {
      const email = emailText.innerText;

      navigator.clipboard
        .writeText(email)
        .then(() => {
          alert(
            "이메일 주소(" +
              email +
              ")가 클립보드에 복사되었습니다. 원하는 메일 서비스에서 붙여넣기 해주세요!"
          );
        })
        .catch((err) => {
          console.error("이메일 복사 실패:", err);
        });
    });
  }

  // Lightbox Modal
  const previewImages = document.querySelectorAll(".project-preview-image");
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");
  
  const lightboxImageWrap = document.getElementById("lightbox-image-wrap");
  const btnZoomIn = document.getElementById("lightbox-zoom-in");
  const btnZoomOut = document.getElementById("lightbox-zoom-out");
  const btnReset = document.getElementById("lightbox-reset");
  const btnOriginal = document.getElementById("lightbox-open-original");

  if (lightbox && lightboxImg && lightboxImageWrap) {
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const updateTransform = () => {
      lightboxImageWrap.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };

    const resetTransform = () => {
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    };

    const openLightbox = (src, fullSrc, alt) => {
      lightboxImg.src = fullSrc || src;
      lightboxImg.alt = alt;
      if (btnOriginal) {
        btnOriginal.href = fullSrc || src;
      }
      resetTransform();
      lightbox.classList.add("is-active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-lightbox-open");
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-lightbox-open");
      resetTransform();
      setTimeout(() => {
        if (!lightbox.classList.contains("is-active")) {
          lightboxImg.src = "";
        }
      }, 300);
    };

    previewImages.forEach((img) => {
      img.addEventListener("click", () => {
        const fullSrc = img.getAttribute("data-fullsrc");
        openLightbox(img.src, fullSrc, img.alt);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxBackdrop.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
        closeLightbox();
      }
    });

    // Zoom Controls
    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", () => {
        scale = Math.min(scale + 0.5, 3);
        updateTransform();
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", () => {
        scale = Math.max(scale - 0.5, 1);
        if (scale === 1) {
          translateX = 0;
          translateY = 0;
        }
        updateTransform();
      });
    }
    if (btnReset) {
      btnReset.addEventListener("click", resetTransform);
    }

    // Drag (Pan) Logic
    lightboxImageWrap.addEventListener("mousedown", (e) => {
      if (scale <= 1) return;
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImageWrap.classList.add("is-dragging");
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      lightboxImageWrap.classList.remove("is-dragging");
    });

    // Mouse Wheel Zoom
    lightboxImageWrap.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        scale = Math.min(scale + 0.2, 3);
      } else {
        scale = Math.max(scale - 0.2, 1);
        if (scale === 1) {
          translateX = 0;
          translateY = 0;
        }
      }
      updateTransform();
    });
  }
});
