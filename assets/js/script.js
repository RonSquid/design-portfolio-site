// ✅ APPLY SAVED DARK MODE
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}


// ✅ LOAD COMPONENTS
Promise.all([
  fetch("/components/nav.html").then(res => res.text()),
  fetch("/components/hero.html").then(res => res.text()),
  fetch("/components/footer.html").then(res => res.text())
])
.then(([nav, hero, footer]) => {

  if (document.getElementById("nav-placeholder")) {
    document.getElementById("nav-placeholder").innerHTML = nav;
  }

  if (document.getElementById("hero-placeholder")) {
    document.getElementById("hero-placeholder").innerHTML = hero;
  }

  if (document.getElementById("footer-placeholder")) {
    document.getElementById("footer-placeholder").innerHTML = footer;
  }

  initNav();
  initHero();

});


// ✅ NAV LOGIC
function initNav() {

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  const toggle = document.getElementById("darkToggle");
  const toggleMobile = document.getElementById("darkToggleMobile");

  if (toggle) toggle.addEventListener("click", toggleDarkMode);
  if (toggleMobile) toggleMobile.addEventListener("click", toggleDarkMode);

  const menuBtn = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("font-semibold");
    }
  });

}


// ✅ HERO DYNAMIC CONTENT
function initHero() {

  const title = document.getElementById("hero-title");
  const subtitle = document.getElementById("hero-subtitle");

  const page = window.location.pathname.split("/").pop();

  if (!title || !subtitle) return;

  if (page === "index.html" || page === "") {
    title.textContent = "Modern Design & Digital Experiences";
    subtitle.textContent = "Branding, web design, and creative direction.";
  }

  if (page === "portfolio.html") {
    title.textContent = "Selected Work";
    subtitle.textContent = "A collection of branding and digital projects.";
  }

  if (page === "about.html") {
    title.textContent = "About Me";
    subtitle.textContent = "Designer focused on clarity, impact, and aesthetics.";
  }

  if (page === "contact.html") {
    title.textContent = "Let’s Work Together";
    subtitle.textContent = "Tell me about your project.";
  }

}