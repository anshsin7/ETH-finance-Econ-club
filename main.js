// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal-on-scroll animation
const revealTargets = document.querySelectorAll(
  ".card, .member, .tl, .vision__body, .section__title, .section__intro, .cta__inner"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));
