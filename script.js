  //  NAVIGATION MENU TOGGLE
function myMenuFunction() {
  const menu = document.getElementById("myNavMenu");
  menu.classList.toggle("responsive");
}

  //  NAVBAR SHADOW ON SCROLL
function headerShadow() {
  const navHeader = document.getElementById("header");

  if (window.scrollY > 50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

window.addEventListener("scroll", headerShadow);

  //  TYPING EFFECT 
if (typeof Typed !== "undefined") {
  new Typed(".typedText", {
    strings: ["MERN stack Developer", "Software Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });
}

  //  SCROLL REVEAL ANIMATIONS
if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: false,
  });

  /* HOME */
  sr.reveal(".featured-text-card");
  sr.reveal(".featured-name", { delay: 100 });
  sr.reveal(".featured-text-info", { delay: 200 });
  sr.reveal(".featured-text-btn", { delay: 200 });
  sr.reveal(".social_icons", { delay: 200 });
  sr.reveal(".featured-image", { delay: 300 });

  /* PROJECTS */
  sr.reveal(".project-box", { interval: 200 });

  /* HEADERS */
  sr.reveal(".top-header");

  /* LEFT */
  const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: false,
  });

  srLeft.reveal(".about-info", { delay: 100 });
  srLeft.reveal(".contact-info", { delay: 100 });

  /* RIGHT */
  const srRight = ScrollReveal({
    origin: "right",
    distance: "80px",
    duration: 2000,
    reset: false,
  });

  srRight.reveal(".skills-box", { delay: 100 });
  srRight.reveal(".form-control", { delay: 100 });
}


  //  ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 60;
    const sectionId = section.getAttribute("id");

    const link = document.querySelector(
      `.nav-menu a[href*="${sectionId}"]`
    );

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active-link");
      } else {
        link.classList.remove("active-link");
      }
    }
  });
}

window.addEventListener("scroll", scrollActive);

  //  HIRE ME BUTTON
const hireBtn = document.getElementById("openGoogleBtn");
if (hireBtn) {
  hireBtn.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/shivamsaini18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank");
  });
}

  //  DARK MODE TOGGLE (WITH STORAGE)
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (!toggle) return;

  // Load saved mode
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggle.classList.replace("uil-moon", "uil-sun");
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggle.classList.toggle("rotate");

    if (body.classList.contains("dark-mode")) {
      toggle.classList.replace("uil-moon", "uil-sun");
      localStorage.setItem("dark-mode", "enabled");
    } else {
      toggle.classList.replace("uil-sun", "uil-moon");
      localStorage.setItem("dark-mode", "disabled");
    }
  });
});

