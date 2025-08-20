import { useEffect } from "react";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import { useNavigate } from "react-router-dom";  // + add this


export default function Home() {
  useRevealOnScroll();

  
const navigate = useNavigate();
const goProjects = () => {
  // close mobile nav if open (keeps your current behavior)
  const mobileNav = document.querySelector(".mobile-nav");
  const icon = document.querySelector(".mobile-nav-toggle i");
  if (mobileNav?.classList.contains("active")) {
    mobileNav.classList.remove("active");
    if (icon) { icon.classList.remove("fa-times"); icon.classList.add("fa-bars"); }
  }
  navigate("/projects");                      // HashRouter -> goes to #/projects
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    const mobileNav = document.querySelector(".mobile-nav");
    const icon = document.querySelector(".mobile-nav-toggle i");
    if (mobileNav?.classList.contains("active")) {
      mobileNav.classList.remove("active");
      if (icon) { icon.classList.remove("fa-times"); icon.classList.add("fa-bars"); }
    }
  };

  
  useEffect(() => {
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const navContainer = document.querySelector(".nav-container");

    const onScroll = () => {
      const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (windowScroll / height) * 100;
      if (scrollIndicator) scrollIndicator.style.width = scrolled + "%";
      if (navContainer) navContainer.classList.toggle("scrolled", windowScroll > 100);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    const floatingContact = document.querySelector(".floating-contact");
    const onFloating = () => {
      if (!floatingContact) return;
      if (window.scrollY > 300) floatingContact.classList.add("visible");
      else floatingContact.classList.remove("visible");
    };
    window.addEventListener("scroll", onFloating);
    const onFloatingClick = () => scrollToId("contact");
    floatingContact?.addEventListener("click", onFloatingClick);
    onFloating();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onFloating);
      floatingContact?.removeEventListener("click", onFloatingClick);
    };
  }, []);

  return (
    <div>
      {/* Scroll Indicator */}
      <div className="scroll-indicator"></div>

      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo">MQ</div>
          <ul className="nav-links">
            <li><button className="linklike" onClick={() => scrollToId("about")}>About</button></li>
            <li><button className="linklike" onClick={() => scrollToId("education")}>Education</button></li>
            <li><button className="linklike" onClick={() => scrollToId("experience")}>Experience</button></li>
            <li><button className="linklike" onClick={() => scrollToId("skills")}>Skills</button></li>
            <li><button className="linklike" onClick={() => scrollToId("contact")}>Contact</button></li>
          </ul>
          <button className="mobile-nav-toggle" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <button className="linklike" onClick={() => scrollToId("about")}>About</button>
        <button className="linklike" onClick={() => scrollToId("experience")}>Experience</button>
        <button className="linklike" onClick={() => scrollToId("education")}>Education</button>
        <button className="linklike" onClick={() => scrollToId("skills")}>Skills</button>
        <button className="linklike" onClick={() => scrollToId("contact")}>Contact</button>
      </div>

      {/* Floating Contact Button */}
      <div className="floating-contact">
        <i className="fas fa-envelope"></i>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Myles Joshua P. Querimit</h1>
          <h2>Design Intern — STARS @ Purdue University</h2>
          <p className="hero-description">Computer Engineering @ Purdue University</p>
          <p className="hero-description">
            Passionate about chip architecture, embedded design, and artificial intelligence.
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={() => scrollToId("contact")}>Get in Touch</button>
            <button className="secondary-button" onClick={goProjects}>View Projects</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section section-container">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a Purdue Computer Engineering student focused on digital design and embedded systems. Currently a <strong>Design Track Intern at STARS</strong>, I build FPGA‑based systems in SystemVerilog and verify them end‑to‑end. I enjoy turning ideas into efficient hardware and clean, testable code.
              </p>
            </div>
            <div className="about-image">
              <img src="images/mylespiano.jpg" alt="Playing piano at campus hall" />
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="education-section section-container">
        <div className="section-content">
          <h2 className="section-title">Education</h2>
          <div className="education-item">
            <div className="education-logo">
              <img src="images/purdue_logo.png" alt="Purdue University logo" />
            </div>
            <div className="education-content">
              <h3>Purdue University</h3>
              <p className="degree">Bachelor of Science, Computer Engineering</p>
              <p className="degree"> Dean's List</p>
              <p className="location">Indianapolis, Indiana</p>
              <p className="duration">Expected Graduation: May 2028</p>
              <div className="relevant-courses">
                <h4>Relevant Courses:</h4>
                <ul>
                  <li>Advanced C Programming</li>
                  <li>Differential Equations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section section-container">
        <div className="section-content">
          <h2 className="section-title">Experience</h2>

          <div className="timeline-container">
            {/* CURRENT ROLE: STARS Design Track Intern */}
            <div className="experience-item">
              <div className="timeline-date">May 2025 – Present</div>
              <div className="experience-header">
                <h3>Design Track Intern</h3>
                <p className="company">STARS (Purdue University)</p>
                <p className="location">West Lafayette, Indiana · On-site</p>
              </div>
              <ul className="experience-details">
                <li>Collaborated with a team to produce the high-level hardware architecture for multiple FPGA projects, defining module interfaces, data-flow pipelines, and resource budgets to meet stringent area and timing constraints.</li>
                <li>Wrote synthesizable SystemVerilog RTL for a vending machine, drum machine, and pure-hardware Tetris autoplayer—structuring code for modularity, reuse, and ease of verification.</li>
                <li>Developed comprehensive SystemVerilog testbenches and leveraged GTKWave to achieve 100% functional coverage across all RTL assertions, ensuring no post-synthesis functional failures.</li>
                <li>Drove the RTL-to-GDSII hardening flow on the Caravel chip harness using OpenLane, preparing the design for physical tape-out.</li>
              </ul>
            </div>

            {/* Transportation and Autonomous Systems Institute — Research Assistant */}
            <div className="experience-item">
              <div className="timeline-date">Jan 2025 – Present</div>
              <div className="experience-header">
                <h3>Research Assistant</h3>
                <p className="company">Transportation and Autonomous Systems Institute</p>
                <p className="location">Indianapolis, Indiana</p>
              </div>
              <ul className="experience-details">
                <li>Develop C-based software for autonomous vehicles in Connected Vehicle‑to‑Everything (CV‑V2X) systems.</li>
                <li>Work directly with sensors and radios, including software‑defined radio (SDR), to enhance V2V/V2I communication.</li>
                <li>Design and implement communication protocols for vehicle‑to‑vehicle and vehicle‑to‑infrastructure interactions.</li>
                <li>Use Wireshark to analyze network traffic and evaluate performance, integrity, and protocol efficiency.</li>
              </ul>
            </div>

            {/* Information Technology Specialist */}
            <div className="experience-item">
              <div className="timeline-date">Aug 2024 – May 2025</div>
              <div className="experience-header">
                <h3>Information Technology Specialist</h3>
                <p className="company">BeWell Home Care Inc</p>
                <p className="location">Chicago, Illinois · Remote</p>
              </div>
              <ul className="experience-details">
                <li>Designed and developed an accessible, user‑friendly website for a homecare service.</li>
                <li>Integrated appointment scheduling, service descriptions, and direct staff contact features for streamlined communication.</li>
              </ul>
            </div>

            {/* Student Ambassador (kept in Experience) */}
            <div className="experience-item">
              <div className="timeline-date">Sep 2024 – Present</div>
              <div className="experience-header">
                <h3>Student Ambassador</h3>
                <p className="company">ECE Ambassador</p>
                <p className="location">Indianapolis, Indiana</p>
              </div>
              <ul className="experience-details">
                <li>Represent Purdue University at recruitment events, promoting the School of ECE to prospective students.</li>
                <li>Develop leadership, communication, and presentation skills through interactions with industry partners and alumni.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Leadership */}
      <section id="leadership" className="leadership-section section-container">
        <div className="section-content">
          <h2 className="section-title">Activities &amp; Leadership</h2>

          {/* EPICS (existing) */}
          <div className="leadership-item">
            <div className="leadership-header">
              <h3>Project Lead</h3>
              <p className="organization">EPICS - Engineering Projects in Community Service</p>
              <p className="location">Indianapolis, Indiana</p>
              <p className="duration">September 2024 – Present</p>
            </div>
            <ul className="leadership-details">
              <li>Lead a cross-disciplinary team to design and construct a custom greenhouse for a local community partner.</li>
              <li>Spearhead development of innovative composting and water management systems, ensuring sustainability and efficiency.</li>
            </ul>
          </div>

          {/* MOVED FROM EXPERIENCE → Activities: Boilersub */}
          <div className="leadership-item">
            <div className="leadership-header">
              <h3>Co‑Founder / Electrical Co‑Lead</h3>
              <p className="organization">Boilersub</p>
              <p className="location">Indianapolis, Indiana</p>
              <p className="duration">November 2024 – Present</p>
            </div>
            <ul className="leadership-details">
              <li>Co-founded a campus Robosub team building an autonomous underwater vehicle (AUV) to compete in technical challenges.</li>
              <li>Led design and fabrication of custom PCBs and optimized power distribution for reliable electronics operation.</li>
            </ul>
          </div>

          {/* MOVED FROM EXPERIENCE → Activities: SIGBots */}
          <div className="leadership-item">
            <div className="leadership-header">
              <h3>Team Member</h3>
              <p className="organization">Purdue ACM SIGBots</p>
              <p className="location">West Lafayette, Indiana</p>
              <p className="duration">August 2024 – Present</p>
            </div>
            <ul className="leadership-details">
              <li>Collaborate on a technical robotics wiki with 20–40k monthly pageviews and 150+ articles spanning hardware and software topics.</li>
              <li>Contribute 3D‑printed component design for prototyping mechanisms used in competition robots.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section section-container">
        <div className="section-content">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <ul className="skill-list">
                <li>C</li><li>C++</li><li>Python</li><li>Matlab</li><li>Verilog</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <ul className="skill-list">
                <li>Autodesk</li><li>Microsoft 365</li><li>Notion</li><li>Git</li><li>KiCad</li><li>ModelSim</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section section-container">
        <div className="section-content">
          <h2 className="section-title">Contact</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
              <ul className="contact-list">
                <li><span className="contact-label">Email:</span><a href="mailto:mylesquerimit@gmail.com">mylesquerimit@gmail.com</a></li>
                <li><span className="contact-label">LinkedIn:</span><a href="https://linkedin.com/in/myles-joshua-querimit" target="_blank" rel="noreferrer">linkedin.com/in/myles-joshua-querimit</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Myles Joshua P. Querimit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
