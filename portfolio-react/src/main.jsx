import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Photos from "./pages/Photos.jsx";
import Resume from "./pages/Resume.jsx";
import Dock from "./components/Dock.jsx";
import { VscHome, VscArchive, VscDeviceCamera, VscFile } from "react-icons/vsc";

import "./styles/styles.css";
import "./styles/responsive.css";
import "./styles/interactive.css";
import "./styles/responsive-updates.css";
import "./index.css";

/** Scroll to top on route change (and handle #hash anchors) */
function ScrollToTop({ behavior = "auto" }) {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash, behavior]);
  return null;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => {
    // navigate if different, but always scroll to top
    if (location.pathname !== path) navigate(path);
    // ensure scroll happens even on same-route taps
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    );
  };

  const items = [
    { icon: <VscHome size={18} />, label: "Home",    onClick: () => go("/") },
    { icon: <VscArchive size={18} />, label: "Projects", onClick: () => go("/projects") },
    { icon: <VscDeviceCamera size={18} />, label: "Photos",   onClick: () => go("/photos") },
    { icon: <VscFile size={18} />, label: "Resume",   onClick: () => go("/resume") },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>

      {/* Dock fixed at bottom */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto" }}>
          <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* HashRouter works great on GitHub Pages; no basename needed */}
    <HashRouter>
      <ScrollToTop behavior="auto" />
      <App />
    </HashRouter>
  </React.StrictMode>
);
