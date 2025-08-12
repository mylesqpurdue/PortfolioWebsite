import { useEffect } from "react";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function Home() {
  useRevealOnScroll();

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
          <p className="tagline">Incoming Design Intern at the Purdue Stars Program</p>
          <h2>Computer Engineering Student</h2>
          <p className="hero-description">
            Passionate about chip architecture, embedded design, and artificial intelligence.
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={() => scrollToId("contact")}>Get in Touch</button>
            <button className="secondary-button" onClick={() => scrollToId("education")}>View Education</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section section-container">
        <div className="section-content">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a Computer Engineering student at Purdue University Indianapolis with a focus on autonomous systems, embedded design, and digital electronics. My passion lies in developing innovative solutions that bridge hardware and software to create impactful technology.</p>
              <p>Currently, I'm working on research in connected vehicle systems and autonomous underwater vehicles, while pursuing my Bachelor of Science degree expected to be completed in May 2028.</p>
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
            <div className="experience-item">
              <div className="timeline-date">Jan 2025 - Present</div>
              <div className="experience-header">
                <h3>Research Assistant</h3>
                <p className="company">Transportation and Autonomous Systems Institute</p>
                <p className="location">Indianapolis, Indiana</p>
              </div>
              <ul className="experience-details">
                <li>Develop C-based software for autonomous vehicles in Connected Vehicle-to-Everything (CV-V2X) systems.</li>
                <li>Work directly with sensors and radios, including software-defined radio (SDR) technology, to enhance vehicular communication.</li>
                <li>Design and implement communication protocols for vehicle-to-vehicle (V2V) and vehicle-to-infrastructure (V2I) interactions.</li>
                <li>Utilize Wireshark to analyze network traffic, examining packet exchanges between sensors and radios to assess communication performance, data integrity, and protocol efficiency.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="timeline-date">Nov 2024 - Present</div>
              <div className="experience-header">
                <h3>Co-Founder/Electrical Co-Lead</h3>
                <p className="company">Boilersub</p>
                <p className="location">Indianapolis, Indiana</p>
              </div>
              <ul className="experience-details">
                <li>Co-founded a campus-based Robosub team focused on engineering and designing an autonomous underwater vehicle (AUV) to compete against other universities in a series of technical challenges.</li>
                <li>Led a team in designing and fabricating custom PCBs to optimize power distribution, ensuring efficient operation of the electronics.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="timeline-date">Aug 2024 - Present</div>
              <div className="experience-header">
                <h3>Team Member</h3>
                <p className="company">Purdue ACM SIGBots</p>
                <p className="location">West Lafayette, Indiana</p>
              </div>
              <ul className="experience-details">
                <li>Collaborated on an engineering-focused technical wikipedia with 20–40,000 average monthly pageviews with over 150 articles explaining the purposes of various aspects of robotics.</li>
                <li>Contributed in the design for custom 3-D printed components for prototyping mechanisms to be used in the competition robot.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="timeline-date">Sep 2024 - Present</div>
              <div className="experience-header">
                <h3>Student Ambassador</h3>
                <p className="company">ECE Ambassador</p>
                <p className="location">Indianapolis, Indiana</p>
              </div>
              <ul className="experience-details">
                <li>Represent Purdue University at recruitment events, promoting the School of ECE to prospective students.</li>
                <li>Developed leadership, communication, and presentation skills through interactions with industry partners and alumni.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Leadership */}
      <section id="leadership" className="leadership-section section-container">
        <div className="section-content">
          <h2 className="section-title">Activities &amp; Leadership</h2>
          <div className="leadership-item">
            <div className="leadership-header">
              <h3>Project Lead</h3>
              <p className="organization">EPICS - Engineering Projects in Community Service</p>
              <p className="location">Indianapolis, Indiana</p>
              <p className="duration">September 2024 – Present</p>
            </div>
            <ul className="leadership-details">
              <li>Leading a cross-disciplinary team to design and construct a custom greenhouse for a local community partner.</li>
              <li>Spearheading the development of innovative composting and water management systems, ensuring sustainability and efficiency.</li>
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
