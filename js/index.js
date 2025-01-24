document.getElementById("switch-btn").addEventListener("click", function() {
  const stylesheet = document.getElementById("stylesheet");
  const currentStyle = stylesheet.getAttribute("href");

  if (currentStyle === "css/style.css") {
    stylesheet.setAttribute("href", "css/alligator.css");
    this.textContent = "Switch";  
  } else {
    stylesheet.setAttribute("href", "css/style.css");
    this.textContent = "Switch";  
  }
});
