
const themeToggle = document.getElementById("checkboxInput");
const stylesheet = document.getElementById("stylesheet");
themeToggle.addEventListener("change", function() {
  if (this.checked) {
    stylesheet.setAttribute("href", "css/alligator.css");
  } else {
    stylesheet.setAttribute("href", "css/style.css");
  }
});
const links = document.querySelectorAll('.nav ul li');
const sections = document.querySelectorAll('section');

const setActiveLink = () => {
  let index = sections.length;

  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

  links.forEach((link) => link.classList.remove('active'));
  links[index].classList.add('active');
};

window.addEventListener('scroll', setActiveLink);



