import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Partners.css";

gsap.registerPlugin(ScrollTrigger);

export default function Partners({ partners }) {
  const wrapRef = useRef(null);
  const panelRefs = useRef([]);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!partners || partners.length === 0) return;

    const panels = panelRefs.current;
    const total = panels.length;
    const stepsCount = total - 1;

    // Initial state
    gsap.set(panels, {
      autoAlpha: 0,
    });

    gsap.set(panels[0], {
      autoAlpha: 1,
    });

    const goToIndex = (nextIndex) => {
      const current = activeIndexRef.current;

      if (nextIndex === current) return;

      gsap.to(panels[current], {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(panels[nextIndex], {
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };
    const st = ScrollTrigger.create({
      trigger: wrapRef.current,

      start: "top top",

      end: `+=${stepsCount * 100}%`,

      pin: true,

      scrub: false,

      anticipatePin: 1,

      snap:
        stepsCount > 0
          ? {
              snapTo: 1 / stepsCount,
              duration: 0.35,
              ease: "power1.inOut",
            }
          : false,

      onUpdate: (self) => {
        if (stepsCount <= 0) return;

        const targetIndex = Math.round(self.progress * stepsCount);

        goToIndex(targetIndex);
      },
    });

    return () => {
      st.kill();
    };
  }, [partners]);

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section ref={wrapRef} className="partners-section">
      <div className="partners-counter">
        <span className="partners-counter-active">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <span className="partners-counter-total">
          {" "}
          / {String(partners.length).padStart(2, "0")}
        </span>
      </div>

      {partners.map((partner, index) => (
        <div
          key={partner.id}
          ref={(el) => {
            panelRefs.current[index] = el;
          }}
          className="partner-panel"
        >

          <div className="partner-content">
            <div className="partner-eyebrow">
              Partner — {String(index + 1).padStart(2, "0")}
            </div>

            <h2 className="partner-title">{partner.name}</h2>

            <p className="partner-description">{partner.description}</p>

            <div className="partner-info">
              <div className="partner-info-item">
                <span>Partner</span>
                <strong>{partner.name}</strong>
              </div>

              <div className="partner-info-item">
                <span>Number</span>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
              </div>
            </div>
          </div>



          <div className="partner-image-wrapper">
            <img
              src={partner.img}
              alt={partner.name}
              className="partner-image"
            />

            <div className="partner-image-number">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
