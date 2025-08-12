import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top whenever the route changes.
 * If there's a hash (#section), it tries to scroll to that element instead.
 */
export default function ScrollToTop({ behavior = "instant" }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: behavior === "instant" ? "auto" : behavior });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: behavior === "instant" ? "auto" : behavior });
  }, [pathname, hash, behavior]);

  return null;
}
