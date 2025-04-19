import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef(null);
  const dots = useRef([]);
  const arrayColors = ["#ffffff", "#d9d9d9", "#b3b3b3", "#8c8c8c", "#666666"];

  const sliider1Images = ["img/1.png", "img/2.png", "img/3.png", "img/4.png"];

  const toggleLightMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliider1Images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliider1Images.length]);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [isLightMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const banner = canvas.parentElement;

    const initializeDots = () => {
      dots.current = [];
      for (let i = 0; i < 100; i++) {
        dots.current.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 3 + 5,
          color: arrayColors[Math.floor(Math.random() * arrayColors.length)]
        });
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.current.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const handleMouseMove = (e) => {
      const rect = banner.getBoundingClientRect();
      const mouse = {
        x: e.pageX - rect.left - window.scrollX,
        y: e.pageY - rect.top - window.scrollY
      };

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();

      dots.current.forEach(dot => {
        const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    };

    const handleMouseOut = () => drawDots();

    const handleResize = () => {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
      initializeDots();
      drawDots();
    };

    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    initializeDots();
    drawDots();

    banner.addEventListener("mousemove", handleMouseMove);
    banner.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    return () => {
      banner.removeEventListener("mousemove", handleMouseMove);
      banner.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      <div className="banner">
        <canvas id="dotsCanvas" ref={canvasRef}></canvas>
        <div className="section" id="banner">
          <div className="content-fit">
            <div className="title" data-before="Reclaim">
              R00T FIX
            </div>
          </div>
        </div>

        <div className="section" id="intro">
          <div className="content-fit">
            <div className="headphone-container">
              {sliider1Images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className={`decorate headphone ${index === activeIndex ? "show" : "hide"}`}
                  alt={`headphone ${index + 1}`}
                />
              ))}
            </div>
            <div className="des">
              <div className="title">INTRODUCTION</div>
              <p>
                R00T FIX is a student-driven initiative created by passionate cybersecurity students from the Bachelor of Science in Cybersecurity program. Built by learners, for learners, our mission is to explore, experiment, and educate through real-world projects, writeups, and security tools. Currently led by students in their 4th semester, R00T FIX serves as a platform for knowledge sharing, research, and innovation in fields like ethical hacking, digital forensics, and network defense. Whether you're new to cyber or deep in the game, this is your space to learn, grow, and stay ahead of threats.
              </p>
            </div>
          </div>
        </div>

        <div className="section" id="description">
          <div className="content-fit">
            <div className="des">
              <div className="title">About Us</div>
              <p></p>
            </div>
          </div>
        </div>

        <div className="section" id="contact">
          <div className="content-fit">
            <div className="number">03</div>
            <div className="des">
              <div className="title">CONTACT</div>
              <table>
                <tbody>
                  <tr><td>Email</td><td>test@gmail.com</td></tr>
                  <tr><td>Phone</td><td>+841.231.235</td></tr>
                  <tr><td>Website</td><td>lundevweb.com</td></tr>
                  <tr><td>Youtube</td><td>@lundeveloper</td></tr>
                </tbody>
              </table>
              <div className="sign">bilal</div>
              <div className="decorations">
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
