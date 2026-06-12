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
});
