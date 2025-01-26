
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
const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry)=> {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
    else{
      entry.target.classList.remove('show');
    }
  });
});
const hiddenElement = document.querySelectorAll('.hidden');
hiddenElement.forEach((el)=> observer.observe(el));
const nameElement = document.getElementById("name");

// Store the initial font size
const initialFontSize = parseFloat(window.getComputedStyle(nameElement).fontSize);

// Create a ResizeObserver to detect changes in the element's size
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;

    // Adjust font size based on the width of the element
    const fontSize = Math.min(width / 2.5, height / 1.25); // Adjust the ratio as needed

    // Only update the font size if it's larger than the initial font size
    if (fontSize > initialFontSize) {
      nameElement.style.fontSize = `${fontSize}px`;
    }
  }
});

// Start observing the #name element
resizeObserver.observe(nameElement);

