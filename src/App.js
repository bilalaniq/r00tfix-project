import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const sliider1Images = ["img/1.png", "img/2.png", "img/3.png", "img/4.png"];

  // Toggle light mode
  const toggleLightMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  // Cycle through headphone images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliider1Images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [sliider1Images.length]);

  // Add or remove the "light-mode" class on the <body> element
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [isLightMode]);

  return (
    <div>
      <header>
        <div className="content-fit">
          <div className="logo">Root fix</div>
          <nav>
            <ul>
              <li>Contacts</li>
              <li>Category</li>
              <li>Login</li>
            </ul>
          </nav>
        </div>
        <button
          id="toggle-light-mode"
          className="light-mode-btn"
          onClick={toggleLightMode}
        >
          {isLightMode ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <div className="section" id="banner">
        <div className="content-fit">
          <div className="title" data-before="Reclaim">
            R00T FIX
          </div>
        </div>

        <img src="img/model.png" className="model" alt="model" />
        <div className="model-gradient"></div>
      </div>

      <div className="section" id="intro">
        <div className="content-fit">
          <div className="headphone-container">
            {sliider1Images.map((src, index) => (
              <img
                key={index}
                src={src}
                className={`decorate headphone ${
                  index === activeIndex ? "show" : "hide"
                }`}
                alt={`headphone ${index + 1}`}
              />
            ))}
          </div>
          <div className="des">
            <div className="title">INTRODUCTION</div>
            <p>
              R00T FIX is a student-driven initiative created by passionate
              cybersecurity students from the Bachelor of Science in
              Cybersecurity program. Built by learners, for learners, our
              mission is to explore, experiment, and educate through real-world
              projects, writeups, and security tools. Currently led by students
              in their 4th semester, R00T FIX serves as a platform for knowledge
              sharing, research, and innovation in fields like ethical hacking,
              digital forensics, and network defense. Whether you're new to
              cyber or deep in the game, this is your space to learn, grow, and
              stay ahead of threats.
            </p>
          </div>
        </div>
      </div>

      <div className="section" id="description">
        <div className="content-fit">
          <div className="des">
            <div className="title">About Us</div>
            <p>

              
            </p>
          </div>
        </div>
      </div>

      <div className="section" id="contact">
        <div className="content-fit">
          <div className="number">03</div>
          <div className="des">
            <div className="title">CONTACT</div>
            <table>
              <tr>
                <td>Email</td>
                <td>test@gmail.com</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>+841.231.235</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>lundevweb.com</td>
              </tr>
              <tr>
                <td>Youtube</td>
                <td>@lundeveloper</td>
              </tr>
            </table>
            <div className="sign">bilal</div>

            <div className="decorations">
              <img
                src="img/flower.png"
                className="decorate flower"
                alt="Flower decoration"
              />
              <img
                src="img/leaf.png"
                className="decorate leaf"
                alt="Leaf decoration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
