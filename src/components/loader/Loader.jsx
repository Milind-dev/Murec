// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import "./loader.css";

// // import splashVideo from "../../assests/videos/96807-657132078_medium.mp4";
// import splashVideo from "../../assests/videos/96654-656479064_medium.mp4";

// export default function Loader() {
//   const barRef = useRef(null);
//   const textRef = useRef(null);
//   const loaderRef = useRef(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const progress = { value: 1 };

//     const animation = gsap.to(progress, {
//       value: 100,
//       duration: 1, // Loader runs for 30 seconds
//       ease: "none",

//       onUpdate: () => {
//         const value = Math.round(progress.value);

//         // Progress bar
//         gsap.set(barRef.current, {
//           width: `${value}%`,
//         });

//         // Percentage
//         if (textRef.current) {
//           textRef.current.textContent = `${value}%`;
//         }
//       },

//       onComplete: () => {
//         // Loader finished
//         gsap.to(loaderRef.current, {
//           yPercent: -100,
//           duration: 1,
//           ease: "power4.inOut",

//           onComplete: () => {
//             setLoading(false);
//           },
//         });
//       },
//     });

//     // Cleanup animation
//     return () => {
//       animation.kill();
//     };
//   }, []);

//   if (!loading) return null;

//   return (
//     <div className="loader" ref={loaderRef}>
//       {/* Background Video */}
//       <video
//         className="loader-video"
//         src={splashVideo}
//         autoPlay
//         muted
//         loop
//         playsInline
//       />

//       {/* Optional dark overlay */}
//       <div className="loader-overlay"></div>

//       {/* Loader Content */}
//       <div className="loader-content">
//         <div className="percentage" ref={textRef}>
//           1%
//         </div>

//         <div className="bar-container">
//           <div className="bar" ref={barRef}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./loader.css";

import splashVideo from "../../assests/videos/homevideo.mp4";

export default function Loader() {
  const textRef = useRef(null);
  const loaderRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const progress = { value: 1 };

    const animation = gsap.to(progress, {
      value: 100,
      duration: 1, // change this to 5, 10, 20 etc.
      ease: "none",

      onUpdate: () => {
        const value = Math.round(progress.value);

        if (textRef.current) {
          textRef.current.textContent = `${value}%`;
        }
      },

      onComplete: () => {
        // Move loader upward after reaching 100%
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
      <video
        className="loader-video"
        src={splashVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Optional overlay */}
      <div className="loader-overlay"></div>

      {/* Percentage - TOP RIGHT */}
      <div className="loader-percentage" ref={textRef}>
        1%
      </div>
    </div>
  );
}