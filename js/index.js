
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
let modals = document.querySelectorAll('.modal');

function showModal(id){
  let m = document.getElementById(id);
  m.classList.add('modal-open');
  let body = document.querySelector('main');
  body.classList.add('blur-no-scroll');
}
function hideModals() {
  modals.forEach(m => {
    m.classList.remove('modal-open');
  });
  let body = document.querySelector('main');
  body.classList.remove('blur-no-scroll');
}

// Open modal when a project box is clicked
projectBoxes.forEach(box => {
  box.addEventListener('click', () => {
    hideModals();
    showModal(box.dataset.modal);
  });
});

// Close modal when clicking outside the modal content
modals.forEach(modal =>{
  let x = modal.querySelector('button.close-modal-btn');
  x.addEventListener('click',hideModals);
});
function updateTime() {
  let now = new Date();
  
  // Format options for Montreal time
  let options = { 
    timeZone: "America/Toronto",
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };

  // Format the time string for Montreal
  let formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);

  // Get GMT offset in hours
  let nowUTC = new Date(now.toLocaleString('en-US', { timeZone: "UTC" }));
  let nowMTL = new Date(now.toLocaleString('en-US', { timeZone: "America/Toronto" }));
  let timeZoneOffset = (nowMTL - nowUTC) / 3600000; // Convert milliseconds to hours
  let gmtString = `(GMT${timeZoneOffset >= 0 ? "+" : ""}${timeZoneOffset})`;

  // Update the formatted string
  formattedTime = `Montreal, QC ${gmtString}\n ${formattedTime}`;

  // Update the DOM
  document.getElementById('current-time').innerText = formattedTime;
}

// Update time immediately when the page loads
updateTime();

// Update time every second
setInterval(updateTime, 1000);

