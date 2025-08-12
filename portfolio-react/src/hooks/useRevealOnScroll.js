import { useEffect } from "react";

export default function useRevealOnScroll() {
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll(".section-container").forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) sec.classList.add("animate");
      });
    };
    reveal();
    window.addEventListener("scroll", reveal);
    window.addEventListener("resize", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("resize", reveal);
    };
  }, []);
}
