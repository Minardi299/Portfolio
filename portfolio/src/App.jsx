import React, { useEffect, useRef, useState } from "react";

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
    tech: ".NET C#",
    desc: [
      "Developed a Blazor web application that allows users to generate a Google Wallet pass for company/school IDs by submitting required details such as name, phone number, etc.",
      "Integrated the Google Wallet API to create and manage wallet objects, enabling users to add a customized pass directly to their Google Wallet.",
      "Utilized JWT (JSON Web Tokens) for secure API authentication, ensuring safe and encrypted communication between the application and Google services.",
      "Designed the user interface using Blazor components to provide a UI for entering data and receiving a pass link.",
    ],
    link: "https://github.com/Minardi299/Blazor",
  },
  // ...add the rest of your projects here, copy from your HTML
];

export default function App() {
  // Theme state: "normal" or "alligator"
  const [theme, setTheme] = useState("normal");

  // Modal state
  const [openModal, setOpenModal] = useState(null);

  // Nav highlight
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  // Time
  const [currentTime, setCurrentTime] = useState("");

  // Theme switch: swap the stylesheet in <head>
  useEffect(() => {
    let stylesheet = document.getElementById("stylesheet");
    if (stylesheet) {
      stylesheet.setAttribute(
        "href",
        theme === "alligator" ? "/css/alligator.css" : "/css/normal.css"
      );
    }
  }, [theme]);

  // Nav highlight on scroll
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

  // IntersectionObserver for .hidden/.show
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
      <main>
        <aside className="sidebar normal">
          <nav className="nav">
            <ul>
              {["contact", "about", "projects"].map((id, idx) => (
                <li key={id} className={activeSection === idx ? "active" : ""}>
                  <a href={`#${id}`}>{id.toUpperCase()}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {theme === "alligator" && (
          <>
            <center className="alligator">
              <img className="alligator center" src={welcomeGif} alt="Welcome" />
            </center>
            <hr className="alligator" />
          </>
        )}
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
              <input
                type="checkbox"
                id="checkboxInput"
                checked={theme === "alligator"}
                onChange={e => setTheme(e.target.checked ? "alligator" : "normal")}
              />
              <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            </div>
          </div>
          {theme === "alligator" && (
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
          )}
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