import { useEffect, useMemo, useState } from "react";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

// Normalize categories: supports `categories: []` or `category: [] | string`
const cats = (p) =>
  Array.isArray(p.categories) ? p.categories :
  Array.isArray(p.category) ? p.category :
  p.category ? [p.category] : [];

const TAGS = ["All", "Hardware", "ML", "Web"];

const projectsData = [
{
  id: "fpga-tetris-ai",
  title: "FPGA Tetris with On-Board AI Player",
  when: "Architech Lead • 2025",
  category: ["Hardware"],
  status: "Tapeout approved",            // 👈 new
  oneLiner:
    "Tapeout-approved SystemVerilog Tetris with an on-FPGA AI (lookahead) and full game features.",
  bullets: [
    "Final GDSII signed off; design verified for tapeout and queued for fabrication.",
    "AI player on FPGA fabric with N-ply lookahead; heuristics for lines/holes/height/bumpiness.",
    "Complete engine in SystemVerilog: spawn/rotate, collision, line clear, scoring, soft-drop, lock delay.",
    "Synthesis, STA, and P&R completed; timing clean on target constraints.",
    "Documentation includes die/layout visualization (GDSII snapshot)."
  ],
  tech: ["SystemVerilog","FPGA","Digital Design","Synthesis","STA","P&R","GDSII"],
  repo: "https://github.com/mixuanpan/starboy",
  demo: "https://www.youtube.com/watch?v=xY-p4uaP2Ss",
  cover: "images/starboy_gds_layout.png"
},

  {
    id: "tlv-cpu",
    title: "TL-Verilog RISC-V CPU Core",
    when: "Independent • Mar 2025",
    category: ["Hardware"],
    oneLiner:
      "Single-cycle RISC-V core in TL-Verilog with IF/ID/EX/MEM/WB and a self-checking testbench.",
    bullets: [
      "Implemented ALU, branch, load/store; verified with regression tests.",
      "Documented timing/area tradeoffs; staged for pipeline refinement.",
      "Waveforms and pipeline visualizations for debug."
    ],
    tech: ["TL-Verilog", "RISC-V", "RTL", "Testbench"],
    repo: "https://github.com/yourname/tlv-riscv",
    demo: null,
    cover: "images/CPUCore.png" // replace with a real screenshot when you have one
  },
  {
    id: "stock-tracker-xgb",
    title: "Stock Tracker + XGBoost Predictor",
    when: "Independent • Mar-Apr 2025",
    category: ["ML", "Web"],
    oneLiner:
      "Feature-engineered signals + XGBoost to forecast daily returns; shipped as a simple tracker.",
    bullets: [
      "Lagged price, MAs, RSI, MACD; rolling normalization per symbol.",
      "2.97% RMSE vs. 4.33% naïve carry-forward on held-out days.",
      "Web UI with watchlist, indicator overlays, prediction bands."
    ],
    tech: ["Python", "XGBoost", "Pandas", "Web"],
    repo: "https://github.com/mylesqpurdue/MatchaMarket",
    demo: null,
    cover: "images/MatchaMarket.png"
  },
  {
    id: "ai-accelerator",
    title: "AI Accelerator",
    when: "Research • 2025",
    category: ["Hardware", "ML"],
    oneLiner:
      "Explored systolic MAC arrays & INT8 quantization for edge inference with Verilog prototypes.",
    bullets: [
      "Compared WS/OS/IS dataflows; designed a 16×16 MAC array.",
      "On-chip SRAM tiling + simple DMA; ModelSim simulations.",
      "Measured accuracy/throughput tradeoffs on small CNNs."
    ],
    tech: ["Verilog", "Computer Architecture", "Quantization"],
    repo: "https://github.com/yourname/ai-accelerator",
    demo: null,
    cover: null
  }
];

export default function Projects() {
  useRevealOnScroll();

  const [activeTag, setActiveTag] = useState("All");
  const [openId, setOpenId] = useState(null);

const projects = useMemo(() => {
  if (activeTag === "All") return projectsData;
  return projectsData.filter((p) => cats(p).includes(activeTag));
}, [activeTag]);

  const open = (id) => setOpenId(id);
  const close = () => setOpenId(null);

  return (
    <main className="projects-section section-container">
      <div className="section-content">
        <h2 className="section-title">Projects</h2>

        {/* Filters */}
        <div className="projects-filter">
          {TAGS.map(tag => (
            <button
              key={tag}
              className={`chip ${activeTag === tag ? "chip-active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* One project per row (text left, image right) */}
        <div className="projects-list">
          {projects.map(p => {
            const rowClass = `project-row${p.cover ? "" : " no-media"}`;
            return (
              <article key={p.id} className={rowClass}>
                {/* Left: text */}
                <div className="project-body">
                 <div className="project-meta-row">
                    <div className="pill-row">
                      {cats(p).map((c) => (
                        <span key={c} className="pill">{c}</span>
                      ))}
                    </div>
                    <span className="meta">{p.when}</span>
                  </div>

                  <h3 className="project-title">{p.title}</h3>
                    {p.status && <span className="badge badge-tapeout">{p.status}</span>}
                  <p className="project-oneliner">{p.oneLiner}</p>

                  <div className="tech-chips">
                    {p.tech.map(t => (
                      <span key={t} className="chip chip-soft">{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {p.repo && (
                      <a className="btn-ghost" href={p.repo} target="_blank" rel="noreferrer">
                        <i className="fab fa-github" /> Repo
                      </a>
                    )}
                    {p.demo && (
                      <a className="btn" href={p.demo} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                    <button className="btn" onClick={() => open(p.id)}>
                      Read case study
                    </button>
                  </div>
                </div>

                {/* Right: image (optional) */}
                {p.cover && (
                  <div className="project-media">
                    <img src={p.cover} alt={`${p.title} cover`} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Pop-out modal */}
      {openId && (
        <ProjectModal
          project={projectsData.find(p => p.id === openId)}
          onClose={close}
        />
      )}
    </main>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-header">
          <h3>
            {project.title} {project.status && <span className="badge badge-tapeout">{project.status}</span>}
          </h3>
        <div className="modal-meta">
          <div className="pill-row">
            {cats(project).map((c) => (
              <span key={c} className="pill">{c}</span>
            ))}
          </div>
          <span className="meta">{project.when}</span>
        </div>
        </div>

        <p className="modal-oneliner">{project.oneLiner}</p>

        <h4>What I did</h4>
        <ul className="modal-bullets">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>

        <div className="modal-tech">
          {project.tech.map(t => <span key={t} className="chip chip-soft">{t}</span>)}
        </div>

        <div className="modal-actions">
          {project.repo && (
            <a className="btn-ghost" href={project.repo} target="_blank" rel="noreferrer">
              <i className="fab fa-github" /> View on GitHub
            </a>
          )}
          {project.demo && (
            <a className="btn" href={project.demo} target="_blank" rel="noreferrer">
              Open Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
