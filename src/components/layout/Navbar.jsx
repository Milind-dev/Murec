import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";
import murec from "../../assests/images/murecicon.png"

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  {
    name: "STORY",
    path: "/",
  },
  {
    name: "PROFILE",
    path: "/about",
  },
  {
    name: "GALLERY",
    path: "/contact",
  },
];

export default function Navbar() {
  const navRef = useRef(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const items = nav.querySelectorAll(".nav-item");
     const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,

          start: "top top",
          end: "500px top",

          scrub: 1,
        },
      });

      tl.to(
        items[0],
        {
          x: -100,
          y: -70,
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.to(
        items[1],
        {
          x: 0,
          y: -100,
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.to(
        items[2],
        {
          x: 100,
          y: -70,
          duration: 1,
          ease: "none",
        },
        0,
      );

      items.forEach((item) => {
        const shape = item.querySelector(".nav-shape");
        const text = item.querySelector(".nav-text");

        const enter = () => {
          gsap.fromTo(
            shape,
            {
              scale: 0.3,
              opacity: 0,
              rotation: -20,
            },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.5,
              ease: "power3.out",
            },
          );
          gsap.fromTo(
            text,
            {
              y: 8,
              filter: "blur(5px)",
            },
            {
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power3.out",
            },
          );
        };

        const leave = () => {
          gsap.to(shape, {
            scale: 0.5,
            opacity: 0,
            rotation: 20,
            duration: 0.35,
            ease: "power2.in",
          });
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        item._enter = enter;
        item._leave = leave;
      });
    }, nav);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="logo">
        {/* MY<span>SITE</span> */}
        <img src={murec} />
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className="nav-item">
            <span className="nav-shape"></span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <button className="nav-button">Get Started</button>
    </nav>
  );
}
