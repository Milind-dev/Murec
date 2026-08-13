import { useEffect, useRef } from "react";
import { buttonHoverAnimation } from "../utils/gsapAnimations";

const useGsapButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    const animation = buttonHoverAnimation(button);

    if (!animation) return;

    const handleMouseEnter = () => {
      animation.play();
    };

    const handleMouseLeave = () => {
      animation.reverse();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);

      animation.destroy();
    };
  }, []);

  return buttonRef;
};

export default useGsapButton;
