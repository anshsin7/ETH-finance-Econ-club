// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav: shadow on scroll
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu toggle
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => menu.classList.toggle("is-open"));
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => menu.classList.remove("is-open"))
);

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.14 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// If a member photo has a real <img>, hide the "coming soon" overlay + initials
document.querySelectorAll(".member__photo").forEach((photo) => {
  const img = photo.querySelector("img");
  if (img) {
    photo.classList.add("has-img");
    const initials = photo.querySelector(".member__initials");
    if (initials) initials.style.display = "none";
  }
});

// Sign-up form (front-end only; wire to a backend / Formspree / Google Form later)
const form = document.getElementById("signupForm");
const ok = document.getElementById("formOk");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  // Persist locally so nothing is lost before a backend is connected
  try {
    const existing = JSON.parse(localStorage.getItem("fe_signups") || "[]");
    existing.push({ ...data, at: new Date().toISOString() });
    localStorage.setItem("fe_signups", JSON.stringify(existing));
  } catch (_) {}
  // Reveal confirmation
  Array.from(form.children).forEach((c) => {
    if (c !== ok) c.style.display = "none";
  });
  ok.classList.add("is-visible");
});
