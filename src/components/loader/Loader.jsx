

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./loader.css";

// import splashVideo from "../../assests/videos/homevideo.mp4";
// import splashVideo from "https://www.murec.com/images/homevideo.mp4";
// import splashVideo from "../../../public/homevideo.mp4";

export default function Loader() {
  const textRef = useRef(null);
  const loaderRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const progress = { value: 1 };

    const animation = gsap.to(progress, {
      value: 100,
      duration: 1, 
      ease: "none",

      onUpdate: () => {
        const value = Math.round(progress.value);

        if (textRef.current) {
          textRef.current.textContent = `${value}%`;
        }
      },

      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",

          onComplete: () => {
            setLoading(false);
          },
        });
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="loader" ref={loaderRef}>
      {/* Background Video */}
      {/* <video
        className="loader-video"
        src={splashVideo}
        autoPlay
        muted
        loop
        playsInline
      /> */}
      <video autoPlay muted loop playsInline className="loader-video">
        <source
          src="https://www.murec.com/images/homevideo.mp4"
          type="video/mp4"
        />
      </video>

      {/* Optional overlay */}
      <div className="loader-overlay"></div>

      {/* Percentage - TOP RIGHT */}
      <div className="loader-percentage" ref={textRef}>
        1%
      </div>
    </div>
  );
}