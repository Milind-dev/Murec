import React from "react";
import useGsapButton from "../../hooks/useGsapButton";
import "./AnimatedButton.css";

const AnimatedButton = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  const buttonRef = useGsapButton();

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`animated-button ${className}`}
    >
      <span className="button-bg" />
      <span className="button-text">{children}</span>
    </button>
  );
};

export default AnimatedButton;
