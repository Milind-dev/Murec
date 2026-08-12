import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const columnsRef = useRef([]);
  const newsletterRef = useRef(null);
  const contactRef = useRef(null);
  const circleRef = useRef(null);

  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          logoRef.current,
          ...columnsRef.current,
          newsletterRef.current,
          contactRef.current,
        ],
        {
          y: 60,
          opacity: 0,
        },
      );

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

      gsap.to(circleRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addColumnRef = (el) => {
    if (el && !columnsRef.current.includes(el)) {
      columnsRef.current.push(el);
    }
  };

  return (
    <footer ref={footerRef} className="footer">
      {/* Circular CTA */}
      <div className="footer-cta">
        <div ref={circleRef} className="circle-button">
          <div className="circle-text">
            GET STARTED&nbsp;&nbsp; GET STARTED&nbsp;&nbsp; GET
            STARTED&nbsp;&nbsp;
          </div>

          <div className="circle-arrow">↗</div>
        </div>
      </div>

      <div className="footer-container">
        {/* Logo */}
        <div ref={logoRef} className="footer-logo">
          <span className="logo-p">M</span>
          <span className="logo-line"></span>
          <span className="logo-text">
            URE<span>C.</span>
          </span>
        </div>

        <div className="footer-grid">
          {/* Column 1 */}
          <div ref={addColumnRef} className="footer-column">
            <h3>Corporate Address:</h3>

            <a href="/">
              Madhusudan, 2nd Floor, Riana Towers, 51-52, Noida Sector 136,
              Uttar Pradesh - 201301
            </a>
            {/* <a href="/">Webinars</a>
            <a href="/">Case Studies</a>
            <a href="/">Whitepapers</a>
            <a href="/">Blog</a> */}
          </div>

          {/* Column 2 */}
          {/* <div ref={addColumnRef} className="footer-column">
            <h3>Company</h3>

            <a href="/">Our story</a>
            <a href="/">Team</a>
            <a href="/">Awards & Recognition</a>
            <a href="/">Partners</a>
            <a href="/">Career</a>
          </div> */}

          {/* Column 3 */}
          <div ref={addColumnRef} className="footer-column">
            <h3>Phone Number</h3>

            <a href="/">97834858483</a>
            {/* <a href="/">Product Engineering</a>
            <a href="/">Digital Transformation</a>
            <a href="/">Incubate Ideas</a> */}
          </div>

          {/* Newsletter */}
          <div ref={newsletterRef} className="footer-newsletter">
            <h3>Subscribe to our newsletter</h3>

            <div className="newsletter-input">
              <input type="email" placeholder="E-mail" />

              <button>↗</button>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div ref={contactRef} className="footer-contact">
          This website is purely conceptual and not a legal document. All
          layouts, specifications, amenities, and visuals are subject to change
          as may be decided by MUREC or the competent authority. No information
          herein shall be construed as an offer, solicitation, or invitation to
          purchase. Interested parties are requested to verify all details,
          including approvals, specifications, and prices, directly with MUREC
          before making any commitments.
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Platform</span>

          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
