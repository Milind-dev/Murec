import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";

import murec from "../../assests/images/murecicon.png";
import AnimatedButton from "../common/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  {
    name: "STORY",
    path: "/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },

  {
    name: "PROFILE",
    path: "/about",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21c.8-4 3.2-6 7-6s6.2 2 7 6" />
      </svg>
    ),
  },

  {
    name: "GALLERY",
    path: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8" cy="9" r="1.5" />
        <path d="m5 17 4-4 3 3 2-2 5 4" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileItemsRef = useRef([]);

  const [menuOpen, setMenuOpen] = useState(false);

 

  const handleLogin = () => {
    console.log("Login clicked");
  };

 

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const ctx = gsap.context(() => {
      const items = nav.querySelectorAll(".nav-item");

      if (!items.length) return;

      /*
       * Scroll animation
       */

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
          x: -25,
          y: -12,
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.to(
        items[1],
        {
          x: 0,
          y: -18,
          duration: 1,
          ease: "none",
        },
        0,
      );

      tl.to(
        items[2],
        {
          x: 25,
          y: -12,
          duration: 1,
          ease: "none",
        },
        0,
      );

  

      items.forEach((item) => {
        const shape = item.querySelector(".nav-shape");
        const text = item.querySelector(".nav-text");
        const icon = item.querySelector(".nav-icon");

        const enter = () => {
          gsap.to(shape, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
          });

          gsap.to(text, {
            y: -1,
            duration: 0.3,
            ease: "power3.out",
          });

          gsap.to(icon, {
            y: -2,
            scale: 1.08,
            duration: 0.3,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(shape, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          });

          gsap.to(text, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        item._enter = enter;
        item._leave = leave;
      });
    }, nav);

    return () => {
      const items = nav.querySelectorAll(".nav-item");

      items.forEach((item) => {
        if (item._enter) {
          item.removeEventListener("mouseenter", item._enter);
        }

        if (item._leave) {
          item.removeEventListener("mouseleave", item._leave);
        }
      });

      ctx.revert();
    };
  }, []);



  useEffect(() => {
    const menu = mobileMenuRef.current;

    if (!menu) return;

    const items = mobileItemsRef.current.filter(Boolean);

    if (menuOpen) {
      gsap.set(menu, {
        display: "flex",
      });

      gsap.fromTo(
        menu,
        {
          opacity: 0,
          y: -15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: -12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          delay: 0.08,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(menu, {
            display: "none",
          });
        },
      });
    }
  }, [menuOpen]);



  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

 

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };


  return (
    <nav ref={navRef} className={`navbar ${menuOpen ? "mobile-open" : ""}`}>
   
      <div className="brand-section">
        <div className="logo">
          <img src={murec} alt="Madhusudan" />
        </div>

        <div className="brand-divider"></div>

        <div className="brand-content">
          <div className="brand-name">MADHUSUDAN</div>

          <div className="brand-tagline">78+ YEARS OF LEGACY</div>
        </div>
      </div>

  
      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-shape"></span>

            <span className="nav-icon">{item.icon}</span>

            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </div>

  
      <div className="right-section">
  
        <div className="login-section">
          <AnimatedButton onClick={handleLogin}>
            <span className="login-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 12h10" />
                <path d="m16 8 4 4-4 4" />
                <path d="M20 12H9" />
              </svg>
            </span>

            <span>Login</span>
          </AnimatedButton>
        </div>

        {/* HAMBURGER */}

        <button
          type="button"
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

   
      <div ref={mobileMenuRef} className="mobile-menu">
        <div className="mobile-menu-inner">
          <div className="mobile-menu-label">NAVIGATION</div>

          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                ref={(element) => {
                  mobileItemsRef.current[index] = element;
                }}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `mobile-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="mobile-nav-number">0{index + 1}</span>

                <span className="mobile-nav-icon">{item.icon}</span>

                <span className="mobile-nav-text">{item.name}</span>

                <span className="mobile-nav-arrow">→</span>
              </NavLink>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <span>78+ YEARS OF LEGACY</span>

            <span>MADHUSUDAN</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
