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
  const heroImage = document.querySelector("#hero-placeholder img");

  const page = window.location.pathname.split("/").pop();

  if (!title || !subtitle) return;

  if (page === "index.html" || page === "") {
    title.textContent = "Modern Design & Digital Experiences";
    subtitle.textContent = "Branding, web design, and creative direction.";
  }

  if (page === "portfolio.html") {
    title.textContent = "Selected Work";
    subtitle.textContent = "A collection of branding and digital projects.";

    if (heroImage) {
      heroImage.src = "https://picsum.photos/1600/601";
    }
  }

  if (page === "about.html") {
    title.textContent = "About Me";
    subtitle.textContent = "Designer focused on clarity and impact.";

    if (heroImage) {
      heroImage.src = "https://picsum.photos/1600/602";
    }
  }

  if (page === "contact.html") {
    title.textContent = "Let’s Work Together";
    subtitle.textContent = "Tell me about your project.";

    if (heroImage) {
      heroImage.src = "https://picsum.photos/1600/603";
    }
  }
}
// NAV SCROLL EFFECT
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("py-2", "shadow-md");
    header.classList.remove("py-4");
  } else {
    header.classList.add("py-4");
    header.classList.remove("py-2", "shadow-md");
  }
});

// PORTFOLIO FILTER
document.addEventListener("click", (e) => {

  if (!e.target.classList.contains("filter-btn")) return;

  const filter = e.target.dataset.filter;

  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  e.target.classList.add("active");

  document.querySelectorAll(".project-item").forEach(item => {

    if (filter === "all" || item.dataset.category === filter) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

  });

});