import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Madusudan from "../assests/images/madhusudan.png";
import "./Legacy.css";

gsap.registerPlugin(ScrollTrigger);

export default function Legacy() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const brandRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const text = title.textContent;
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
        duration: 1.5,
      });

      gsap.set(logoRef.current, {
        x: -500,
        opacity: 0,
        scale: 0.8,
          duration: 1.5,
        rotate: -5,
      });

      gsap.set(brandRef.current, {
        y: -30,
        opacity: 0,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(brandRef.current, {
        y: 0,
        opacity: 1,
        duration: 2.8,
        ease: "power3.out",
      })

        .to(
          chars,
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.035,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.3",
        )

        .to(
          logoRef.current,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="legacy-section">
      <div className="legacy-inner">       

        <div className="legacy-heading-wrapper">
          <h2 ref={titleRef} className="legacy-heading">
            78+ YEARS OF LEGACY
          </h2>
        </div>

        <div ref={lineRef} className="legacy-line" />

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
