import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function Resume() {
  useRevealOnScroll();

  const resumeUrl = "resume.pdf"; // place resume.pdf in /public
  return (
    <main className="section-container">
      <div className="section-content">
        <h2 className="section-title">Resume</h2>
        <div style={{ height: "80vh", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
          <object data={resumeUrl} type="application/pdf" width="100%" height="100%">
            <p style={{ padding: 16 }}>
              Your browser can’t display PDFs inline.
              <a href={resumeUrl} download style={{ marginLeft: 8 }}>Download Resume</a>
            </p>
          </object>
        </div>
      </div>
    </main>
  );
}
