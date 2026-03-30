// ✅ APPLY SAVED DARK MODE ON LOAD (keep this OUTSIDE)
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}


// ✅ LOAD NAV COMPONENT
fetch("/components/nav.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("nav-placeholder").innerHTML = data;

    initNav(); // run AFTER nav loads
  });


// ✅ INIT NAV FUNCTION (ALL NAV LOGIC GOES HERE)
function initNav() {

  // DARK MODE FUNCTION
  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  // DARK MODE BUTTONS
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


  // ACTIVE LINK
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("font-semibold", "text-black", "dark:text-white");
    }
  });

}