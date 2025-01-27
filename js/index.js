
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

// Get the initial dimensions and font size
const initialWidth = nameElement.clientWidth;
const initialHeight = nameElement.clientHeight;
const initialFontSize = parseFloat(window.getComputedStyle(nameElement).fontSize);

// Calculate the initial ratios
const widthRatio = initialFontSize / initialWidth;
const heightRatio = initialFontSize / initialHeight;

// Create a ResizeObserver to detect changes in the element's size
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;

    // Calculate the new font size based on the initial ratios
    const fontSizeFromWidth = width * widthRatio;
    const fontSizeFromHeight = height * heightRatio;

    // Use the smaller value to ensure the text fits within the container
    const fontSize = Math.min(fontSizeFromWidth, fontSizeFromHeight);

    // Apply the new font size
    nameElement.style.fontSize = `${fontSize}px`;
  }
});

// Start observing the #name element
resizeObserver.observe(nameElement);
const projectBoxes = document.querySelectorAll('.project-box');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDetails = document.getElementById('modal-details');
const closeModalButton = document.querySelector('.close-modal');

// Open modal when a project box is clicked
projectBoxes.forEach(box => {
  box.addEventListener('click', () => {
    const title = box.getAttribute('data-title');
    const details = box.getAttribute('data-details');

    modalTitle.textContent = title;
    modalDetails.textContent = details;

    modal.classList.add('show');
    document.body.classList.add('modal-open');
  });
});

// Close modal when the close button is clicked
closeModalButton.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }
});