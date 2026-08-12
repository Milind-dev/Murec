import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./History.css";

gsap.registerPlugin(ScrollTrigger);

export default function History({ historytext }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const btnref = useRef(null);

  useLayoutEffect(() => {
    if (!historytext?.description) return;

    const ctx = gsap.context(() => {
      const text = textRef.current;
      const button = btnref.current;

      // Initial position
      gsap.set(text, {
        yPercent: 120,
        rotateX: -70,
        skewY: 8,
        scaleY: 1.15,
        opacity: 0,
      });

      gsap.to(text, {
        yPercent: 0,
        rotateX: 0,
        skewY: 0,
        scaleY: 1,
        opacity: 1,

        duration: 1.4,

        ease: "power4.out",

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top 75%",
          end: "top 25%",

          scrub: 1,
        },
      });
        const waterAnimation = gsap.timeline({
        repeat: -1,
        yoyo: true,
        });

        waterAnimation
        .to(text, {
            y: -6,
            skewX: 1.5,
            rotateZ: 0.3,
            duration: 2.2,
            ease: "sine.inOut",
        })
        .to(text, {
            y: 5,
            skewX: -1.5,
            rotateZ: -0.3,
            duration: 2.5,
            ease: "sine.inOut",
        });
         if (button) {
           const buttonX = gsap.quickTo(button, "x", {
             duration: 0.4,
             ease: "power3.out",
           });

           const buttonY = gsap.quickTo(button, "y", {
             duration: 0.4,
             ease: "power3.out",
           });

           const handleMouseMove = (event) => {
             const rect = button.getBoundingClientRect();

             const mouseX = event.clientX - rect.left;
             const mouseY = event.clientY - rect.top;

             const centerX = rect.width / 2;
             const centerY = rect.height / 2;

             const moveX = (mouseX - centerX) * 0.25;
             const moveY = (mouseY - centerY) * 0.25;

             buttonX(moveX);
             buttonY(moveY);
           };

           const handleMouseEnter = () => {
             gsap.to(button, {
               scale: 1.08,
               duration: 0.4,
               ease: "power3.out",
             });
           };

           const handleMouseLeave = () => {
             buttonX(0);
             buttonY(0);

             gsap.to(button, {
               scale: 1,
               duration: 0.5,
               ease: "elastic.out(1, 0.5)",
             });
           };

           button.addEventListener("mousemove", handleMouseMove);

           button.addEventListener("mouseenter", handleMouseEnter);

           button.addEventListener("mouseleave", handleMouseLeave);

           return () => {
             button.removeEventListener("mousemove", handleMouseMove);

             button.removeEventListener("mouseenter", handleMouseEnter);

             button.removeEventListener("mouseleave", handleMouseLeave);
           };
         }
        
    }, sectionRef);

    return () => ctx.revert();
  }, [historytext]);

  return (
    <section
      ref={sectionRef}
      className="history-section"
    >
      <div className="history-container">

     

        <div className="history-text-wrapper">
          <p
            ref={textRef}
            className="history-description"
          >
            {historytext?.description}
          </p>
        </div>

        <button
          className="history-button"
          onClick={() => console.log("History clicked!")}
          ref={btnref}
        >
          History
        </button>

      </div>
    </section>
  );
}