const body = document.body;
const gate = document.getElementById("gate");
const enterBtn = document.getElementById("enterBtn");
const flash = document.querySelector(".flash");
const cursor = document.querySelector(".cursor");
const modal = document.getElementById("projectModal");
const closeModal = document.querySelector(".modal-close");

function cameraFlash() {
  flash.classList.remove("active");
  void flash.offsetWidth;
  flash.classList.add("active");
}

enterBtn.addEventListener("click", () => {
  cameraFlash();
  gate.classList.add("exit");
  body.classList.remove("locked");
  body.classList.add("loaded");
  window.setTimeout(() => gate.setAttribute("aria-hidden", "true"), 1100);
});

document.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, .media, .service").forEach((element) => {
  element.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  element.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

const revealedElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

revealedElements.forEach((element) => observer.observe(element));

const hero = document.querySelector(".hero");
const leftTitle = document.querySelector(".hero-line.left");
const rightTitle = document.querySelector(".hero-line.right");
const heroMedia = document.querySelector(".hero-media");

window.addEventListener("scroll", () => {
  const position = window.scrollY;
  const limit = hero.offsetHeight;
  const progress = Math.min(position / limit, 1);

  leftTitle.style.transform = `translateX(${-progress * 20}vw)`;
  rightTitle.style.transform = `translateX(${progress * 20}vw)`;
  heroMedia.style.transform = `scale(${1 + progress * 0.12})`;
});

document.querySelectorAll(".project-media").forEach((project) => {
  project.addEventListener("click", () => {
    cameraFlash();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("locked");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("locked");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    modal.classList.remove("open");
    body.classList.remove("locked");
  }
});

document.querySelector(".submit").addEventListener("click", () => {
  cameraFlash();
  const button = document.querySelector(".submit");
  button.innerHTML = "MESSAGE READY — DEMO ONLY <span>✓</span>";
  window.setTimeout(() => {
    button.innerHTML = "SEND THE VISION <span>↗</span>";
  }, 2200);
});
