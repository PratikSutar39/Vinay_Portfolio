const modal = document.querySelector(".video-modal");
const frame = modal.querySelector("iframe");
const modalTitle = document.querySelector("#video-title");
const youtubeLink = document.querySelector("#video-youtube-link");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function openVideo(videoId, title) {
  modalTitle.textContent = title;
  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeVideo() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  frame.src = "";
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openVideo(card.dataset.video, card.dataset.title));
});

document.querySelectorAll("[data-close-modal]").forEach((control) => {
  control.addEventListener("click", closeVideo);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeVideo();
});

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("modal-open", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("modal-open");
  });
});

const sections = [...document.querySelectorAll("main section[id], header[id]")];
const navLinks = [...nav.querySelectorAll("a")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -60% 0px" });
sections.forEach((section) => observer.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();
