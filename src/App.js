import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./loader.css";

export default function Loader() {
  const barRef = useRef(null);
  const textRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const progress = { value: 1 };

    gsap.to(progress, {
      value: 100,
      duration: 15,
      ease: "power2.out",

      onUpdate: () => {
        const value = Math.round(progress.value);

        // Update bar width
        gsap.set(barRef.current, {
          width: `${value}%`,
        });

        // Update percentage
        if (textRef.current) {
          textRef.current.textContent = `${value}%`;
        }
      },

      onComplete: () => {
        setLoading(false);
      },
    });
  }, []);

  if (!loading) return null;

  return (
    <div className="loader">
      <div className="loader-content">
        <div className="percentage" ref={textRef}>
          1%
        </div>

        <div className="bar-container">
          <div className="bar" ref={barRef}></div>
        </div>
      </div>
    </div>
  );
}