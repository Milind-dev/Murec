import gsap from "gsap";

export const buttonHoverAnimation = (button) => {
  if (!button) return null;

  const bg = button.querySelector(".button-bg");
  const text = button.querySelector(".button-text");

  if (!bg || !text) return null;

  const tl = gsap.timeline({
    paused: true,
  });

  tl.to(
    bg,
    {
      scale: 8,
      duration: 0.45,
      ease: "power3.out",
    },
    0,
  )

    .to(
      text,
      {
        color: "#ffffff",
        duration: 0.2,
        ease: "power2.out",
      },
      0.08,
    );

  return {
    play: () => tl.play(),
    reverse: () => tl.reverse(),
    destroy: () => tl.kill(),
  };
};
