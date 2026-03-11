// DARK MODE

const toggle = document.getElementById("darkToggle");

if (toggle) {
toggle.addEventListener("click", () => {
document.documentElement.classList.toggle("dark");
});
}


// FILTER PROJECTS

function filterProjects(category) {

const projects = document.querySelectorAll(".project");

projects.forEach(project => {

if (category === "all") {
project.style.display = "block";
}

else if (project.classList.contains(category)) {
project.style.display = "block";
}

else {
project.style.display = "none";
}

});

}