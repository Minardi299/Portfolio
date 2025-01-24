document.getElementById("switch-btn").addEventListener("click", function() {
  const currentStyle = stylesheet.getAttribute("href");

  if (currentStyle === "css/style.css") {
    stylesheet.setAttribute("href", "css/alligator.css");
    this.textContent = "Switch";  
  } else {
    stylesheet.setAttribute("href", "css/style.css");
    this.textContent = "Switch";  
  }
});
const themeToggle = document.getElementById("checkboxInput");
const stylesheet = document.getElementById("stylesheet");
themeToggle.addEventListener("change", function() {
  if (this.checked) {
    stylesheet.setAttribute("href", "css/alligator.css");
  } else {
    stylesheet.setAttribute("href", "css/style.css");
  }
});