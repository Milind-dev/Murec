import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./History.css";
import historymurec from "../assests/images/murecicon.png"

gsap.registerPlugin(ScrollTrigger);

export default function History({ historytext }) {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (!historytext?.description) return;

    const ctx = gsap.context(() => {
      const words = wordsRef.current;
      const button = buttonRef.current;
      gsap.set(words, {
        y: 80,
        rotate: 40,
        opacity: 0,
        scale: 0.95,

        transformOrigin: "0% 100%",
      });

 
gsap.set(words, {
  y: 25,
  rotate: 30,
  opacity: 0,
  scale: 0.98,
  transformOrigin: "0% 100%",
});

gsap.to(words, {
  y: 0,
  rotate: 0,
  opacity: 1,
  scale: 1,

  duration: 2.7,

  stagger: 0.08,

  ease: "power3.out",

  scrollTrigger: {
    trigger: sectionRef.current,

    start: "top 70%",

    toggleActions: "play none none reverse",
  },
});

   

      if (!button) return;

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
        const moveX = (mouseX - centerX) * 0.2;
        const moveY = (mouseY - centerY) * 0.2;
        buttonX(moveX);
        buttonY(moveY);
      };

   

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.08,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      /*
      Mouse leave
      */

      const handleMouseLeave = () => {
        buttonX(0);
        buttonY(0);

        gsap.to(button, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
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
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [historytext]);

  const descriptionWords = historytext?.description?.split(" ") || [];

  return (
    <section ref={sectionRef} className="history-section">
      <div className="history-container">
          <img src={historymurec} className="historyicon" alt="History Icon" />
        <div className="history-text-wrapper">
          <div className="history-text-inner">

            <h2 className="history-heading">LIVING BY PRINCIPLES</h2>

            <p className="history-description">
              {descriptionWords.map((word, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    wordsRef.current[index] = el;
                  }}
                  className="history-word"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

             <button
          ref={buttonRef}
          className="history-button"
          onClick={() => console.log("History clicked!")}
        >
          <span>HISTORY</span>

          <span className="history-arrow">↗</span>
        </button>
      </div>
    </section>
  );
}
