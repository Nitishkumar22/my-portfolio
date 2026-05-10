"use client";

import { useEffect, useState } from "react";

const CSS = `
  * {
    cursor: none !important;
  }

  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    background: #fafafa;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease-out, opacity 0.3s ease, width 0.15s ease, height 0.15s ease;
    mix-blend-mode: difference;
  }

  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border: 2px solid #fafafa;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.2s ease-out, opacity 0.3s ease, width 0.2s ease, height 0.2s ease;
    mix-blend-mode: difference;
  }

  .cursor-dot.hidden,
  .cursor-ring.hidden {
    opacity: 0;
  }

  .cursor-dot.hover {
    width: 4px;
    height: 4px;
  }

  .cursor-ring.hover {
    width: 48px;
    height: 48px;
  }

  @media (hover: none) and (pointer: coarse) {
    * {
      cursor: auto !important;
    }
    .cursor-dot,
    .cursor-ring {
      display: none;
    }
  }
`;

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isClickable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.onclick !== null ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isClickable);
    };

    const updateRingPosition = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animationFrame = setInterval(updateRingPosition, 16);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(animationFrame);
    };
  }, [position]);

  const dotOffset = isHovering ? 2 : 4;
  const ringOffset = isHovering ? 24 : 16;

  return (
    <>
      <style>{CSS}</style>
      <div
        className={`cursor-dot ${!isVisible ? "hidden" : ""} ${isHovering ? "hover" : ""}`}
        style={{
          transform: `translate(${position.x - dotOffset}px, ${position.y - dotOffset}px)`,
        }}
      />
      <div
        className={`cursor-ring ${!isVisible ? "hidden" : ""} ${isHovering ? "hover" : ""}`}
        style={{
          transform: `translate(${ringPosition.x - ringOffset}px, ${ringPosition.y - ringOffset}px)`,
        }}
      />
    </>
  );
}
