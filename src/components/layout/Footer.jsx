import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const location = useLocation();

  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const columnsRef = useRef([]);
  const newsletterRef = useRef(null);
  const contactRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Reset refs
    columnsRef.current = [];

    const ctx = gsap.context(() => {
      const elements = [
        logoRef.current,
        ...columnsRef.current,
        newsletterRef.current,
        contactRef.current,
      ].filter(Boolean);

      // Initially hide content
      gsap.set(elements, {
        y: 60,
        opacity: 0,
      });

      // Footer reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          columnsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          newsletterRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          contactRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        );

      // Circle animation
      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });

      // Important when navigating between routes
      ScrollTrigger.refresh();
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, [location.pathname]);

  const addColumnRef = (el) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current.push(el);
    }
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-cta">
        <div ref={circleRef} className="circle-button">
          <div className="circle-text">
            GET STARTED&nbsp;&nbsp; GET STARTED&nbsp;&nbsp; GET STARTED
          </div>

          <div className="circle-arrow">↗</div>
        </div>
      </div>

      <div className="footer-container">
        <div ref={logoRef} className="footer-logo">
          <span className="logo-p">M</span>
          <span className="logo-line"></span>

          <span className="logo-text">
            URE<span>C.</span>
          </span>
        </div>

        <div className="footer-grid">
          <div ref={addColumnRef} className="footer-column">
            <h3>Corporate Address:</h3>

            <a href="/">
              Madhusudan, 2nd Floor, Riana Towers, 51-52, Noida Sector 136,
              Uttar Pradesh - 201301
            </a>
          </div>

          <div ref={addColumnRef} className="footer-column">
            <h3>Phone Number</h3>

            <a href="/">97834858483</a>
          </div>

          <div ref={newsletterRef} className="footer-newsletter">
            <h3>Subscribe to our newsletter</h3>

            <div className="newsletter-input">
              <input type="email" placeholder="E-mail" />

              <button>↗</button>
            </div>
          </div>
        </div>

        <div ref={contactRef} className="footer-contact">
          This website is purely conceptual and not a legal document. All
          layouts, specifications, amenities, and visuals are subject to change
          as may be decided by MUREC or the competent authority. No information
          herein shall be construed as an offer, solicitation, or invitation to
          purchase.
        </div>

        <div className="footer-bottom">
          <span>© 2026 Platform</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;