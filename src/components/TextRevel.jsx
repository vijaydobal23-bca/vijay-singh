import React, { forwardRef, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

const TextRevel = forwardRef(({ children }, ref) => {
  const container = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(ref.current, {
        type: "chars",
      });

      gsap.from(split.chars, {
        opacity: 0,
        y: 40,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      return () => split.revert();
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div ref={ref}>{children}</div>
    </div>
  );
});

export default TextRevel;