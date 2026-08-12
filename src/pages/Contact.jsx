

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import arrowIcon from "../assests/images/icons8-squiggly-arrow.gif";
import   "./Contact.css";

export default function Contact() {
  const lettersRef = useRef([]);

  const text = "CONTACT US";

  useLayoutEffect(() => {
    const letters = lettersRef.current;

    const handleMouseMove = (e) => {
      letters.forEach((letter) => {
        if (!letter) return;

        const rect = letter.getBoundingClientRect();

        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - letterX, 2) + Math.pow(e.clientY - letterY, 2),
        );

        const radius = 100;

        if (distance < radius) {
          const strength = 1 - distance / radius;

          const moveX = (letterX - e.clientX) * strength * 0.25;

          const moveY = (letterY - e.clientY) * strength * 0.25;

          const rotate = (letterX - e.clientX) * strength * 0.08;

          gsap.to(letter, {
            x: moveX,
            y: moveY,
            rotate: rotate,
            scale: 1 + strength * 0.15,

            duration: 0.35,

            ease: "power2.out",

            overwrite: true,
          });
        } else {
          gsap.to(letter, {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,

            duration: 0.6,

            ease: "elastic.out(1, 0.5)",

            overwrite: true,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="contact"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#f4f4f2",
        flexDirection: "column",
        padding: "100px 40px",
      }}
    >
      <div>
        <h1 className="contact-heading">Get In Touch |</h1>

        <p>
          Looking to collaborate, invest, or simply know more? Reach out and
          let’s connect.
        </p>
      </div>

      <div
        className="contact-link"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <img
          src={arrowIcon}
          alt=""
          style={{
            borderRadius: "10%",
            width: "25px",
            height: "25px",
          }}
        />

        <p className="water-text">
          {text.split("").map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              className="water-letter"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}