// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Madusudan from "../assests/images/madhusudan.png";
// import "./Legacy.css";

// gsap.registerPlugin(ScrollTrigger);

// export default function Legacy() {
//   const sectionRef = useRef(null);
//   const logoRef = useRef(null);
//   const titleRef = useRef(null);
//   const brandRef = useRef(null);
//   const lineRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const title = titleRef.current;
//       const text = title.textContent;
//       title.innerHTML = text
//         .split("")
//         .map((char) => {
//           if (char === " ") {
//             return `<span class="char">&nbsp;</span>`;
//           }
//           return `<span class="char">${char}</span>`;
//         })
//         .join("");

//       const chars = title.querySelectorAll(".char");

//       gsap.set(chars, {
//         y: 80,
//         opacity: 0,
//         rotateX: -90,
//         duration: 1.5,
//       });

//       gsap.set(logoRef.current, {
//         x: -500,
//         opacity: 0,
//         scale: 0.8,
//           duration: 1.5,
//         rotate: -5,
//       });

//       gsap.set(brandRef.current, {
//         y: -30,
//         opacity: 0,
//       });

//       gsap.set(lineRef.current, {
//         scaleX: 0,
//         transformOrigin: "left center",
//       });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//           end: "bottom 30%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       tl.to(brandRef.current, {
//         y: 0,
//         opacity: 1,
//         duration: 2.8,
//         ease: "power3.out",
//       })

//         .to(
//           chars,
//           {
//             y: 0,
//             opacity: 1,
//             rotateX: 0,
//             duration: 0.7,
//             stagger: 0.035,
//             ease: "power3.out",
//           },
//           "-=0.3",
//         )
//         .to(
//           lineRef.current,
//           {
//             scaleX: 1,
//             duration: 0.8,
//             ease: "power3.inOut",
//           },
//           "-=0.3",
//         )

//         .to(
//           logoRef.current,
//           {
//             x: 0,
//             opacity: 1,
//             scale: 1,
//             rotate: 0,
//             duration: 1.4,
//             ease: "power4.out",
//           },
//           "-=0.2",
//         );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="legacy-section">
//       <div className="legacy-inner">       

//         <div className="legacy-heading-wrapper">
//           <h2 ref={titleRef} className="legacy-heading">
//             78+ YEARS OF LEGACY
//           </h2>
//         </div>

//         <div ref={lineRef} className="legacy-line" />

//         <div className="legacy-logo-wrapper">
//           <img
//             ref={logoRef}
//             src={Madusudan}
//             alt="Madhusudan"
//             className="legacy-logo"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Madusudan from "../assests/images/madhusudan.png";
import "./Legacy.css";

gsap.registerPlugin(ScrollTrigger);

export default function Legacy() {
  const sectionRef = useRef(null);

  const videoRef = useRef(null);
  const videoBoxRef = useRef(null);
  const videoOverlayRef = useRef(null);

  const titleRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const video = videoRef.current;
      const videoBox = videoBoxRef.current;

      if (!video || !videoBox) return;

      /*
       * Initially hide the normal legacy content.
       */
      gsap.set(titleRef.current, {
        opacity: 0,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.8,
      });

      /*
       * Video starts as full screen.
       */
      gsap.set(videoBox, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 0,
        overflow: "hidden",
      });

      /*
       * Start video.
       */
      video.currentTime = 0;

      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Autoplay blocked:", error);
        }
      };

      playVideo();

      /*
       * VIDEO FINISHED
       */
      const handleVideoEnd = () => {
        const tl = gsap.timeline();

        /*
         * 1. Shrink video to top-right rectangle
         */
        tl.to(videoBox, {
          top: "72px",
          right: "32px",
          left: "auto",
          width: "105px",
          height: "90px",
          borderRadius: "10px",
          duration: 1.4,
          ease: "power4.inOut",
        })

          /*
           * 2. Slightly fade video
           */
          .to(
            video,
            {
              opacity: 0.15,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.2"
          )

          /*
           * 3. Reveal image inside rectangle
           */
          .to(
            videoOverlayRef.current,
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.1"
          )

          /*
           * 4. Show heading
           */
          .to(
            titleRef.current,
            {
              opacity: 1,
              duration: 0.5,
            },
            "-=0.1"
          )

          /*
           * 5. Animate heading letters
           */
          .to(
            ".legacy-heading .char",
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.7,
              stagger: 0.035,
              ease: "power3.out",
            },
            "-=0.2"
          )

          /*
           * 6. Line
           */
          .to(
            lineRef.current,
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
            },
            "-=0.3"
          )

          /*
           * 7. Large Madhusudan logo
           */
          .to(
            logoRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
            },
            "-=0.2"
          );
      };

      video.addEventListener("ended", handleVideoEnd);

      /*
       * Prepare heading characters
       */
      const title = titleRef.current;

      if (title) {
        const text = title.textContent.trim();

        title.innerHTML = text
          .split("")
          .map((char) => {
            if (char === " ") {
              return `<span class="char">&nbsp;</span>`;
            }

            return `<span class="char">${char}</span>`;
          })
          .join("");

        const chars = title.querySelectorAll(".char");

        gsap.set(chars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
        });
      }

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="legacy-section">

      {/* ================= VIDEO ================= */}
      <div ref={videoBoxRef} className="legacy-video-box">

        <video
          ref={videoRef}
          className="legacy-video"
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://murec.com/images/v2.mp4"
            type="video/mp4"
          />
        </video>

        {/* Image shown after video reaches small box */}
        <div
          ref={videoOverlayRef}
          className="legacy-video-image"
        >
          <img
            src={Madusudan}
            alt="Madhusudan"
          />
        </div>

      </div>


      {/* ================= CONTENT ================= */}
      <div className="legacy-inner">

        <div className="legacy-heading-wrapper">
          <h2
            ref={titleRef}
            className="legacy-heading"
          >
            78+ YEARS OF LEGACY
          </h2>
        </div>

        <div
          ref={lineRef}
          className="legacy-line"
        />

        <div className="legacy-logo-wrapper">

          <img
            ref={logoRef}
            src={Madusudan}
            alt="Madhusudan"
            className="legacy-logo"
          />

        </div>

      </div>

    </section>
  );
}