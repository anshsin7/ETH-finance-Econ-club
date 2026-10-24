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

// CV upload: drag & drop, validation, filename display
const cvInput = document.getElementById("cv");
const dropzone = document.getElementById("dropzone");
const dropText = document.getElementById("dropText");
const cvError = document.getElementById("cvError");

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

function formatBytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(0) + " KB";
  return (n / (1024 * 1024)).toFixed(1) + " MB";
}

function clearCv() {
  cvInput.value = "";
  dropzone.classList.remove("has-file");
  dropText.innerHTML =
    'Drag &amp; drop your CV, or <span class="dropzone__browse">browse</span>';
}

function validateAndShowCv(file) {
  cvError.textContent = "";
  if (!file) {
    clearCv();
    return true;
  }
  const name = file.name.toLowerCase();
  const okExt = ALLOWED_EXT.some((ext) => name.endsWith(ext));
  if (!okExt) {
    cvError.textContent = "Please upload a PDF, DOC, or DOCX file.";
    clearCv();
    return false;
  }
  if (file.size > MAX_CV_BYTES) {
    cvError.textContent = "That file is larger than 5 MB. Please upload a smaller CV.";
    clearCv();
    return false;
  }
  dropzone.classList.add("has-file");
  dropText.innerHTML =
    '<strong style="color:var(--gold-2)">' +
    file.name.replace(/[<>&]/g, "") +
    "</strong> &middot; " +
    formatBytes(file.size) +
    ' &middot; <span class="dropzone__browse">change</span>';
  return true;
}

if (cvInput && dropzone) {
  cvInput.addEventListener("change", () =>
    validateAndShowCv(cvInput.files[0])
  );

  ["dragenter", "dragover"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("is-drag");
    })
  );
  ["dragleave", "drop"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("is-drag");
    })
  );
  dropzone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      // assign dropped file to the input so it's submitted with the form
      const dt = new DataTransfer();
      dt.items.add(file);
      cvInput.files = dt.files;
      validateAndShowCv(file);
    }
  });
}

// Sign-up form.
//
// Submissions are sent to the form's `action` (set this to your Formspree endpoint
// in index.html — replace FORM_ID). Until that's configured, submissions are still
// saved to the browser's localStorage as a fallback so nothing is lost in testing.
const form = document.getElementById("signupForm");
const ok = document.getElementById("formOk");
const submitBtn = form.querySelector('button[type="submit"]');

function showConfirmation() {
  Array.from(form.children).forEach((c) => {
    if (c !== ok) c.style.display = "none";
  });
  ok.classList.add("is-visible");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  // Re-validate CV if one was selected.
  if (cvInput && cvInput.files[0] && !validateAndShowCv(cvInput.files[0])) {
    return;
  }

  // Local fallback — keeps a text copy in the browser even if no backend is set up
  // yet. (The CV file itself is only sent to the configured backend, not stored here.)
  try {
    const data = {};
    new FormData(form).forEach((value, key) => {
      data[key] = value instanceof File ? value.name : value;
    });
    const existing = JSON.parse(localStorage.getItem("fe_signups") || "[]");
    existing.push({ ...data, at: new Date().toISOString() });
    localStorage.setItem("fe_signups", JSON.stringify(existing));
  } catch (_) {}

  const action = form.getAttribute("action") || "";
  const isConfigured = action && !action.includes("FORM_ID");

  // If no real endpoint is configured yet, just confirm (dev/testing mode).
  if (!isConfigured) {
    console.warn(
      "Sign-up form is not connected to a backend yet. " +
        "Set the form's action to your Formspree endpoint in index.html to receive real submissions."
    );
    showConfirmation();
    return;
  }

  // Send to the configured endpoint (e.g. Formspree).
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";
  }
  try {
    const res = await fetch(action, {
      method: form.method || "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      showConfirmation();
    } else {
      throw new Error("Request failed: " + res.status);
    }
  } catch (err) {
    console.error(err);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Try again";
    }
    alert("Something went wrong submitting the form. Please try again or email us directly.");
  }
});
