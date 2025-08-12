import React from "react";
import Masonry from "../components/Masonry"; // your Masonry.jsx
import useRevealOnScroll from "../hooks/useRevealOnScroll";

const photoNames = [
  "IMG_1760","IMG_1954","IMG_2054","IMG_2405","IMG_2588",
  "IMG_3176","IMG_3214","IMG_3400","IMG_3729","IMG_3731",
  "IMG_3752","IMG_4023","IMG_5010","IMG_6010","IMG_6572",
  "IMG_6593","IMG_6635","IMG_9267","IMG_9610"
];

// Cycle a few nice tile heights for variety (since all are landscape)
const tileHeights = [440, 480, 520, 560, 600];

const items = photoNames.map((name, i) => ({
  id: name,
  img: `images/${name}.jpg`,
  url: `images/${name}.jpg`,   // opens the full image on click
  height: tileHeights[i % tileHeights.length],
}));

export default function Photos() {
  useRevealOnScroll();

  React.useEffect(() => {
    document.body.classList.add("photos-body-dark");
    return () => document.body.classList.remove("photos-body-dark");
  }, []);

    return (
    <main className="section-container photos-page photos-dark">
      <div className="section-content">
        <h2 className="section-title">Photos</h2>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.97}
          blurToFocus={true}
          colorShiftOnHover={false}
          gutter={16}
        />
      </div>
    </main>
  );
}