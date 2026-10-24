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

// ---------------------------------------------------------------------------
// APPLICATIONS — Google Form
//
// Paste your Google Form share link below (the one that ends in "/viewform").
// Build the form in Google Forms, add a "File upload" question for the CV, then
// Send → link icon → copy. That's the ONLY thing you need to change here.
//
//   e.g. const GOOGLE_FORM_URL = "https://forms.gle/abc123";
//        const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/XXXX/viewform";
// ---------------------------------------------------------------------------
const GOOGLE_FORM_URL = ""; // <-- paste your Google Form link here

// Wire every "Open the Application" button to the Google Form.
document.querySelectorAll(".js-apply").forEach((btn) => {
  if (GOOGLE_FORM_URL) {
    btn.setAttribute("href", GOOGLE_FORM_URL);
  } else {
    // No form set yet — don't send people to a dead link.
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(
        "The application form isn't connected yet.\n\n" +
          "Paste your Google Form link into GOOGLE_FORM_URL in main.js to activate it."
      );
    });
  }
});
