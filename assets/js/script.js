// APPLY SAVED MODE
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// TOGGLE
const toggle = document.getElementById("darkToggle");

if (toggle) {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}