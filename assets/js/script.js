// DARK MODE (persist across pages)

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

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


// MOBILE MENU

const menuBtn = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}


// ACTIVE LINK HIGHLIGHT

const links = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("text-black", "dark:text-white", "font-semibold");
  }
});