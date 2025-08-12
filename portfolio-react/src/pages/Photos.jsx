import useRevealOnScroll from "../hooks/useRevealOnScroll";
import Masonry from "../components/Masonry";

export default function Photos() {
  useRevealOnScroll();

  // Use your real images from /public/images (no '?grayscale')
  const items = [
    { id: "1", img: "images/altheadshot.jpg",   url: "images/altheadshot.jpg",   height: 500 },
    { id: "2", img: "images/mylesheadshot.jpg", url: "images/mylesheadshot.jpg", height: 360 },
    { id: "3", img: "images/mylespiano.jpg",    url: "images/mylespiano.jpg",    height: 600 },
    // add more here: drop files into /public/images and add objects with a nice height
  ];

  return (
    <main className="section-container">
      <div className="section-content">
        <h2 className="section-title">Photos</h2>

        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}   // keep colors natural
        />
      </div>
    </main>
  );
}
