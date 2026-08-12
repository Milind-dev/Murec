import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Association.css";
import yesbank from "../assests/images/yesbank.png";
import standingman from "../assests/images/connectingdots.gif";

gsap.registerPlugin(ScrollTrigger);

export default function Associations() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const logoRefs = useRef([]);
  const artworkRef = useRef(null);



  const associations = [
    {
      id: 1,
      image: "/images/logo1.png",
      name: "Association 01",
    },
    {
      id: 2,
      image: "/images/logo2.png",
      name: "Association 02",
    },
    {
      id: 3,
      image: "/images/logo3.png",
      name: "Association 03",
    },
    {
      id: 4,
      image: "/images/logo4.png",
      name: "Association 04",
    },
    {
      id: 5,
      image: "/images/logo5.png",
      name: "Association 05",
    },
    {
      id: 6,
      image: "/images/logo6.png",
      name: "Association 06",
    },
    {
      id: 7,
      image: "/images/logo7.png",
      name: "Association 07",
    },
    {
      id: 8,
      image: "/images/logo8.png",
      name: "Association 08",
    },
    {
      id: 9,
      image: "/images/logo9.png",
      name: "Association 09",
    },
    {
      id: 10,
      image: "/images/logo10.png",
      name: "Association 10",
    },
    {
      id: 11,
      image: "/images/logo11.png",
      name: "Association 11",
    },
    {
      id: 12,
      image: "/images/logo12.png",
      name: "Association 12",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
  

      gsap.set(titleRef.current, {
        yPercent: -120,
        opacity: 0,
        rotateX: -35,
      });

    

      gsap.set(artworkRef.current, {
        xPercent: 100,
        opacity: 0,
        scale: 0.9,
      });

      const directions = [
        {
          x: -120,
          y: 40,
          rotate: -8,
        },
        {
          x: 100,
          y: -60,
          rotate: 7,
        },
        {
          x: -80,
          y: -100,
          rotate: -5,
        },
        {
          x: 120,
          y: 80,
          rotate: 8,
        },
        {
          x: -100,
          y: 60,
          rotate: -7,
        },
        {
          x: 80,
          y: -80,
          rotate: 6,
        },
        {
          x: -120,
          y: -50,
          rotate: -6,
        },
        {
          x: 100,
          y: 70,
          rotate: 7,
        },
        {
          x: -70,
          y: -90,
          rotate: -8,
        },
        {
          x: 100,
          y: 50,
          rotate: 6,
        },
        {
          x: -90,
          y: -60,
          rotate: -5,
        },
        {
          x: 70,
          y: 80,
          rotate: 7,
        },
      ];

      logoRefs.current.forEach((logo, index) => {
        const direction = directions[index % directions.length];

        gsap.set(logo, {
          x: direction.x,
          y: direction.y,
          rotate: direction.rotate,
          scale: 0.8,
          opacity: 0,
        });
      });

   

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top 75%",
          end: "top 15%",

          scrub: 1,
        },
      });

 

      tl.to(
        titleRef.current,
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,

          duration: 1,

          ease: "power4.out",
        },
        0,
      );

   

      tl.to(
        artworkRef.current,
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,

          duration: 1.2,

          ease: "power3.out",
        },
        0,
      );

 
      tl.to(
        logoRefs.current,
        {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,

          duration: 1,

          stagger: {
            each: 0.08,
            from: "random",
          },

          ease: "power4.out",
        },
        0.25,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="associations-section">
   

      <div className="associations-heading-wrapper">
        <h2 ref={titleRef} className="associations-title">
          OUR ASSOCIATION
        </h2>
      </div>


      <div className="associations-left">
        <div className="associations-grid">
          {associations.map((association, index) => (
            <div
              className="association-item"
              key={association.id}
              ref={(el) => {
                logoRefs.current[index] = el;
              }}
            >
              <img src={yesbank} alt={association.name} />
            </div>
          ))}
        </div>
      </div>

 

      <div ref={artworkRef} className="associations-artwork">
        <img src={standingman} alt="" />
      </div>
    </section>
  );
}
