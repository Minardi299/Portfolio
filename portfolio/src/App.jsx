import React, { useEffect, useRef, useState } from "react";
import { ThemeManager } from "./theme-manager";

// Image imports (paths assume your 'images' folder is in 'public')
const aboutImg = "/images/about.jpg";
const policeGif = "/images/police.gif";
const welcomeGif = "/images/welcome.gif";
const counterGif = "/images/counter-purple2.gif";
const smilingGif = "/images/smiling.gif";

const projects = [
  {
    id: "project-1",
    title: "Blazor Google Wallet ID Pass Generator",
    tech: ".NET Blazor - C# - Google Wallet API - JWT",
    desc: [
      "Developed a Blazor web application that allows users to generate a Google Wallet pass for company/school IDs by submitting required details such as name, phone number, etc.",
      "Integrated the Google Wallet API to create and manage wallet objects, enabling users to add a customized pass directly to their Google Wallet.",
      "Utilized JWT (JSON Web Tokens) for secure API authentication, ensuring safe and encrypted communication between the application and Google services.",
      "Designed the user interface using Blazor components to provide a UI for entering data and receiving a pass link.",
    ],
    link: "https://github.com/Minardi299/Blazor",
  },
  {
    id: "project-2",
    title: "Book Reading App",
    tech: "Jetpack Compose - Room Database",
    desc: [
        "Developed a book reading app using Kotlin and Jetpack Compose, enabling users to download and read books with an intuitive user interface.",
        "Implemented coroutines and Flow to manage asynchronous operations, ensuring a smooth and responsive UI experience.",
        "Integrated Room Database for efficient local storage and retrieval of book data, enhancing offline accessibility.",
        "Designed dynamic screen layouts to support all device sizes, providing a consistent user experience across smartphones and tablets.",
        "Conducted unit testing and integration testing to ensure app reliability, stability, and adherence to functional requirements.",
        "Added localization support for multiple languages, making the app accessible to a global audience.",
    ],
  },
  {
    id: "project-3",
    title: "Blazor Flight Tracker Web Application",
    tech: ".NET Blazor - Boostrap - C# - AviationStack API",
    desc: [
        "Still in developement",
        "Created a flight tracker web application using Blazor and the MudBlazor component library, focusing on ease of use and a clean, Material Design-inspired user interface.",
        "Integrated the AviationStack API to provide users with real-time flight information by entering details such as flight code, airport code, etc..",
        "Developed features to display comprehensive flight data, including departure times, arrival times, airports, and flight statuses, ensuring users receive accurate and detailed information.",
        "Utilized MudBlazor components for a responsive, user-friendly UI",
    ],
    link: "https://github.com/Minardi299/Flight-Tracker",
  },
  {
      id: "project-4",
      title: "On the Record Website",
      tech: "Mongo - Express - React - Node.js",
      desc: [
          "Developed a modern full stack website using the MERN stack, with MongoDBas the database, Express for server-side routing, React for a dynamic and responsive user interface and Node.js for backend logic.",
          "Implemented a responsive and performance-optimized UI with accessibility in mind, including server/client caching, server-side compression, optimized above fold css and javascript loading, minimized page load times.",
          "Built a robust and scalable backend, using MongoDB for data storage and performing efficient data filtering within queries to reduce client-side load.",
          "Test-Driven Development (TDD) using the Mocha/Chai for unit testing along with Supertest and Sinon for integration testing.",
          "Designed and documented API endpoints for seamless data retrieval using Swagger.",
          "Fully Implemented a CI/CD pipeline to automate testing and build processes, ensuring reliable deployment of website on both AWS virtual machine and Render.",
      ],
      link: "https://five20-project-safin-nathan-minh.onrender.com/",
  },
  {
      id: "project-5",
      title: "Image processing-OCR script",
      tech: "Python - Google Tesseract - OpenCV",
      desc: [
          "Developed an Image to Text application using Python and OpenCV, implementing image processing techniques such as thresholding, binarization, noise removal, etc to enhance OCR accuracy.",
          "Integrated Google Tesseract OCR engine to extract text from processed images, ensuring high-quality text recognition for various image types and pdf that stored as image.",
          "Utilized a locally hosted Large Language Model (LLM) to process and analyze extracted text data, enabling advanced data interpretation and context-aware outputs, in this case, a automated receipt digitalization tool.",
          "The LLM code is OPENAI API compatible.",
      ],
      link: "https://github.com/Minardi299/Receipt-scanner",
  },
  {
      id: "project-6",
      title: "Avalonia Recipe Sharing Desktop Application",
      tech: ".NET Avalonia - C# - EFCore - MSTest",
      desc: [
          "Developed a modern full-stack .NET application using Avalonia for the user interface and Entity Framework Core (EFCore) as the Object-Relational Mapper (ORM) to manage data access.",
          "Implemented a responsive UI using the Model-View-ViewModel (MVVM) design pattern with Avalonia, ensuring separation of concerns, maintainability, and scalability of the application.",
          "Back-end development with EFCore, creating a robust and scalable data layer. Designed and optimized database schemas, implemented CRUD operations",
          "Test-Driven Development (TDD) using the MSTest framework. Developed unit tests for business logic, data access layers to ensure full test coverage and early detection of bugs",
      ],
      link: "https://github.com/Minardi299/MuscleMealApp",
  }
];

export default function App() {
  const themes = ['/css/normal.css', '/css/alligator.css'];

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const nextTheme = () => {
  setCurrentThemeIndex((prevIndex) =>
    (prevIndex + 1) % themes.length
    );
  };
  
  const randomizeTheme = () => {
    const randomIndex = Math.floor(Math.random() * themes.length);
    setCurrentThemeIndex(randomIndex);
  };

  useEffect(() => {
    let stylesheet = document.getElementById('theme-stylesheet');
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.id = 'theme-stylesheet';
      stylesheet.rel = 'stylesheet';
      document.head.appendChild(stylesheet);
    }
    // Set the href to the current theme
    stylesheet.href = themes[currentThemeIndex];
  }, [currentThemeIndex, themes]);

  // Modal state
  const [openModal, setOpenModal] = useState(null);

  // Nav highlight
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  // Time
  const [currentTime, setCurrentTime] = useState("");

  
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.current.map(
        (ref) => ref?.getBoundingClientRect().top + window.scrollY
      );
      const scrollY = window.scrollY + 100;
      let idx = offsets.length - 1;
      while (idx > 0 && scrollY < offsets[idx]) idx--;
      setActiveSection(idx);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ResizeObserver for #name font size
  const nameRef = useRef();
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const initialWidth = el.clientWidth;
    const initialHeight = el.clientHeight;
    const initialFontSize = parseFloat(window.getComputedStyle(el).fontSize);
    const widthRatio = initialFontSize / initialWidth;
    const heightRatio = initialFontSize / initialHeight;
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const fontSizeFromWidth = width * widthRatio;
        const fontSizeFromHeight = height * heightRatio;
        const fontSize = Math.min(fontSizeFromWidth, fontSizeFromHeight);
        el.style.fontSize = `${fontSize}px`;
      }
    });
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  // Time updater
  useEffect(() => {
    function updateTime() {
      let now = new Date();
      let options = {
        timeZone: "America/Toronto",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      let formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);
      let nowUTC = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
      let nowMTL = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
      let timeZoneOffset = (nowMTL - nowUTC) / 3600000;
      let gmtString = `(GMT${timeZoneOffset >= 0 ? "+" : ""}${timeZoneOffset})`;
      setCurrentTime(`Montreal, QC ${gmtString}\n${formattedTime}`);
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Modal logic
  function showModal(id) {
    setOpenModal(id);
    document.querySelector("main").classList.add("blur-no-scroll");
  }
  function hideModals() {
    setOpenModal(null);
    document.querySelector("main").classList.remove("blur-no-scroll");
  }

  // Render
  return (
    <div className="no-margin">
      <link rel="stylesheet" id="theme-stylesheet" href={themes[currentThemeIndex]} />

      <main>
        <ThemeManager href={themes[currentThemeIndex]} />

        
         
        <ul id="contact" className="hero-content">
          <li className="alligator">
            <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/user/ge7ibsztbcdxkj0umooh7av6l?si=56600db326404ff7">
              Spotify
            </a>
          </li>
          <li className="normal">
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/minh-phu-ngo-79b5a32b0/">
              LinkedIn
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Minardi299">
              Github
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="mailto:phu.ngo@outlook.com">
              Contact
            </a>
          </li>
          <li className="alligator">
            <a target="_blank" rel="noopener noreferrer" href="">
              Dont click
            </a>
          </li>
        </ul>
        <section id="hero" className="bg active" ref={el => (sectionRefs.current[0] = el)}>
          <div className="hero-content">
            <div className="hero-text normal">
              <p className="no-margin">Hi! My name is</p>
              <h1 id="name" className="no-margin hidden" ref={nameRef}>
                minh
              </h1>
              <h3 className="no-margin">Junior developer</h3>
              <h5 id="current-time" style={{ whiteSpace: "pre-line" }}>{currentTime}</h5>
            </div>
            <div className="hero-button">
              {/* <input
                type="checkbox"
                id="checkboxInput"
                checked={theme === "alligator"}
                onChange={e => setTheme(e.target.checked ? "alligator" : "normal")}
              /> */}
              <button onClick={nextTheme}>Next Theme</button>
      <button onClick={randomizeTheme}>Randomize Theme</button>
              <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            </div>
          </div>
          
            <table className="alligator" align="center">
              <tbody>
                <tr>
                  <td valign="top">
                    <center>
                      <h1 className="alligator">
                        <img align="middle" src={smilingGif} alt="" />
                        <font size="4" face="papyrus">
                          About me!!!! I'm Minh!!
                        </font>
                        <img align="middle" src={smilingGif} alt="" />
                      </h1>
                    </center>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <center>
                      <img id="aboutimg" className="alligator" src={aboutImg} alt="" />
                    </center>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <img src={policeGif} alt="" />
                    <img src="/images/spacer.gif" width={300} height={30} alt="" />
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <center>
                      <img src={counterGif} alt="" />
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          
        </section>
        <section id="about" ref={el => (sectionRefs.current[1] = el)}>
          <img className="hidden normal" src={aboutImg} alt="" />
          <p className="hidden normal">About me.</p>
          <p className="hidden">
            My name is Minh and you can call me Minh. I'm a Computer Science student and a Junior Software Developer.
            Outside of tech, I swim I run and I want to do a triathlon by September next year. I did robotic and theatre club, swim and rowing team.
          </p>
        </section>
        <section id="projects" ref={el => (sectionRefs.current[2] = el)}>
          <div className="projects-container hidden">
            {projects.map(proj => (
              <article
                key={proj.id}
                className="project-box"
                data-modal={proj.id}
                onClick={() => {
                  hideModals();
                  showModal(proj.id);
                }}
              >
                <h2>{proj.title}</h2>
                <p>{proj.tech}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      {/* Modals */}
      <div id="modal-container">
        {projects.map(proj => (
          <div
            key={proj.id}
            id={proj.id}
            className={`modal${openModal === proj.id ? " modal-open" : ""}`}
            style={{ display: openModal === proj.id ? "flex" : "none" }}
          >
            <article className="modal-card">
              <button className="close-modal-btn" onClick={hideModals}>
                &times;
              </button>
              <h2>{proj.title}</h2>
              <h3>{proj.tech}</h3>
              {proj.desc.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  source code↗
                </a>
              )}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}