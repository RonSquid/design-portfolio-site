
// PAGE LOAD ANIMATION
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

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

let path = window.location.pathname;

if (path.endsWith("/")) {
  path = path.slice(0, -1);
}

let currentPage = path.split("/").pop();

// fix homepage
if (currentPage === "") {
  currentPage = "index.html";
}

links.forEach(link => {
  const href = link.getAttribute("href");

  // reset classes first
  link.classList.remove("text-lime-500", "font-semibold");

  if (href.includes(currentPage)) {
    link.classList.add("text-lime-500", "font-semibold");
  }
});

}


// ✅ HERO DYNAMIC CONTENT
function initHero() {

  const title = document.getElementById("hero-title");
  const subtitle = document.getElementById("hero-subtitle");
  const heroImage = document.querySelector("#hero-placeholder img");

  let path = window.location.pathname;

  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  const page = path.split("/").pop();

  if (!title || !subtitle) return;

  // HOME
  if (page === "" || page === "index.html") {
    title.textContent = "Modern Design & Digital Experiences";
    subtitle.textContent = "Branding, web design, and creative direction.";

    if (heroImage) {
      heroImage.src = "/assets/images/header33.jpg";
    }
  }

  // PORTFOLIO
  if (page === "portfolio" || page === "portfolio.html") {
    title.textContent = "Selected Work";
    subtitle.textContent = "A collection of branding and digital projects.";

    if (heroImage) {
      heroImage.src = "/assets/images/header1.jpg";
    }
  }

  // ABOUT
  if (page === "about" || page === "about.html") {
    title.textContent = "About Me";
    subtitle.textContent = "Designer focused on clarity and impact.";

    if (heroImage) {
      heroImage.src = "/assets/images/header444.jpg";
    }
  }

  // CONTACT
  if (page === "contact" || page === "contact.html") {
    title.textContent = "Let’s Work Together";
    subtitle.textContent = "Tell me about your project.";

    if (heroImage) {
      heroImage.src = "/assets/images/header22.jpg";
    }
  }
// PARALLAX EFFECTs

const parallax = document.querySelector(".hero-parallax");

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  if (parallax) {
    parallax.style.transform =
      `translateY(${scrollY * 0.2}px) scale(1.1)`;
  }

});
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

// PAGE TRANSITION ON LINK CLICK
document.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll("a[href]");

  links.forEach(link => {
    link.addEventListener("click", function (e) {

      const url = link.getAttribute("href");

      // skip external links / anchors
      if (url.startsWith("#") || url.startsWith("http")) return;

      e.preventDefault();

      document.body.classList.remove("page-loaded");

      setTimeout(() => {
        window.location = url;
      }, 300);
    });
  });

});

// PROJECT NEXT / PREV NAV
function initProjectNav() {

  const container = document.getElementById("project-nav");
  if (!container) return;

  const path = window.location.pathname;

  // match /projects/project01/
  const match = path.match(/project(\d+)/);

  if (!match) return;

  let current = parseInt(match[1]);

  const totalProjects = 22; // 🔥 UPDATE if needed

  const prev = current - 1;
  const next = current + 1;

  function format(num) {
    return num.toString().padStart(2, "0");
  }

  let html = `<div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-8">`;

  // PREVIOUS
  if (prev >= 1) {
    html += `
      <a href="/projects/project${format(prev)}/index.html"
      class="group">
        <span class="block text-sm text-gray-500 mb-1">Previous</span>
        <span class="text-lg font-medium group-hover:text-lime-500 transition">
          ← Project ${format(prev)}
        </span>
      </a>
    `;
  } else {
    html += `<div></div>`;
  }

  // NEXT
  if (next <= totalProjects) {
    html += `
      <a href="/projects/project${format(next)}/index.html"
      class="group text-right">
        <span class="block text-sm text-gray-500 mb-1">Next</span>
        <span class="text-lg font-medium group-hover:text-lime-500 transition">
          Project ${format(next)} →
        </span>
      </a>
    `;
  }

  html += `</div>`;

  container.innerHTML = html;
}

initProjectNav();