import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor lag effect (creates that premium momentum feel)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Direct spotlight position (lag-free for visual lighting masks)
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Instantly position background spotlight to avoid visual latency
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("clickable") ||
          target.closest(".clickable"));
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Background radial spotlight that illuminates the page layout & grid lines */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] opacity-55 mix-blend-screen transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)",
          willChange: "transform",
        }}
      />

      {/* Cybernetic glowing outer cursor ring */}
      <motion.div
        ref={cursorRef}
        style={{
          x: cursorX,
          y: cursorY,
          transform: "translate3d(-50%, -50%, 0)",
        }}
        animate={{
          width: isHovered ? 48 : 20,
          height: isHovered ? 48 : 20,
          backgroundColor: isHovered ? "rgba(168, 85, 247, 0.05)" : "transparent",
          borderColor: isHovered ? "#a855f7" : "#3b82f6",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        className="fixed top-0 left-0 border-2 rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      />

      {/* Futuristic inner cursor point */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          transform: "translate3d(-50%, -50%, 0)",
        }}
        animate={{
          scale: isHovered ? 0.3 : 1,
          backgroundColor: isHovered ? "#a855f7" : "#3b82f6",
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      />
    </>
  );
}
