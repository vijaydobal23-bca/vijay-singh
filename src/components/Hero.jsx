import React, { useRef } from "react";
import TextRevel from "./TextRevel";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const Heading1Ref = useRef(null);
  const Heading2Ref = useRef(null);
  const Heading3Ref = useRef(null);
  const textRef = useRef(null);
  const bottomTextRef = useRef(null);

  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);

  useGSAP(() => {
    const splitedHeading1 = new SplitText(Heading1Ref.current, { type: "chars" });
    const splitedHeading2 = new SplitText(Heading2Ref.current, { type: "words" });
    const splitedHeading3 = new SplitText(Heading3Ref.current, { type: "chars" });
    const splitedText = new SplitText(textRef.current, { type: "words" });

    const heroTl = gsap.timeline();

    heroTl
      .from(imageRef.current, {
        duration: 1.2,
        y: 200,
        ease: "power3.out",
        rotate: -15,
        scale:0.9
      }, 0)
      .from(splitedHeading1.chars, {
        opacity: 0,
        y: 40,
        stagger: { each: 0.05, from: "start" },
        duration: 0.8,
        ease: "expo.inOut",
      }, 0.3) // runs with image
      .from(splitedHeading2.words, {
        opacity: 0,
        y: 80,
        stagger: { each: 0.1, from: "start" },
        duration: 1,
        ease: "power2.out",
      }, 0.3) // runs with image
      .from(splitedHeading3.chars, {
        opacity: 0,
        y: 30,
        stagger: { each: 0.05, from: "start" },
        duration: 0.3,
        ease: "expo.inOut",
      }, 0.3) // parallel with heading1
      .from(splitedText.words, {
        opacity: 0,
        y: 30,
        stagger: { each: 0.1, from: "start" },
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.5"); 

    return () => {
      splitedHeading1.revert();
      splitedHeading2.revert();
      splitedHeading3.revert();
      splitedText.revert();
    };
  });
  
  const handleMouseMove = (e) => {
    const rect = heroSectionRef.current.getBoundingClientRect();
    const xOffset = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yOffset = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    const textTargets = [
      Heading1Ref.current,
      Heading2Ref.current,
      Heading3Ref.current,
      textRef.current,
      bottomTextRef.current,
    ].filter(Boolean);

    // Each element moves with slightly different intensity for depth
    const intensities = [
      { x: 15, y: 10 },  // h2 "Hey, I'm a" — subtle
      { x: 25, y: 18 },  // h1 "MERN ENGINEER" — strongest, it's the hero
      { x: 18, y: 12 },  // h3 "Great products..." — medium
      { x: 12, y: 8 },   // p description — subtle
      { x: 10, y: 6 },   // bottom text — lightest
    ];

    textTargets.forEach((el, i) => {
      const { x, y } = intensities[i] || { x: 10, y: 6 };
      gsap.to(el, {
        x: xOffset * x,
        y: yOffset * y,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  // Spring back to original position when mouse leaves
  const handleMouseLeave = () => {
    const textTargets = [
      Heading1Ref.current,
      Heading2Ref.current,
      Heading3Ref.current,
      textRef.current,
      bottomTextRef.current,
    ].filter(Boolean);

    textTargets.forEach((el) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    });
  };

  return (
    <section
      ref={heroSectionRef}
      className="md:h-screen w-full h-[60vh] hero-section relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Vijay Singh — MERN Stack Developer Hero Section"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="hero-img h-full w-full flex items-end justify-center overflow-hidden">
        <img
          ref={imageRef}
          src="/hero-img.png"
          alt="Vijay Singh — MERN Stack Developer and Full-Stack Engineer from Haldwani, Uttarakhand"
          className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] max-w-[1400px]"
          loading="eager"
          fetchPriority="high"
          itemProp="image"
        />
      </div>

      <div className="text-section absolute h-full w-full top-0 flex flex-col justify-between px-[3vw] py-[3vw] text-white">
        <div className="upper-text flex w-full h-[80%] items-center justify-between">
          <div className="upper-left flex flex-col items-start justify-center text-left">
            <h2 ref={Heading1Ref} className="text-[1.4vw] font-medium text-white overflow-hidden"><span itemProp="name">Hey, I'm a</span></h2>
            <h1 ref={Heading2Ref} className="text-[6vw] font-bold tracking-tighter leading-none text-white overflow-hidden">
              <span className="inline-block overflow-hidden" itemProp="jobTitle"> MERN</span>
              <br />
              <span className="inline-block overflow-hidden">ENGINEER</span>
            </h1>
          </div>

          <div className="upper-right w-[30%] flex flex-col items-start justify-center text-left">
            <h3 ref={Heading3Ref} className="text-[1.6vw] font-semibold leading-tight text-white overflow-hidden">
              <span className="inline-block overflow-hidden">Great products start</span>
              <br />
              <span className="inline-block overflow-hidden">with solid systems.</span>
            </h3>
            <p ref={textRef} className="text-[1vw] mt-[0.7vw] text-white/70 leading-snug overflow-hidden" itemProp="description">
              from localhost to deployment, Born to be a Developer.
            </p>
          </div>
        </div>

        <div ref={bottomTextRef} className="bottom-text flex w-full justify-between items-end">
          {[
            { num: "#01", label: "Frontend Development" },
            { num: "#02", label: "Backend Architecture" },
            { num: "#03", label: "Generative AI" },
            { num: "#04", label: "Devops" },
          ].map((item) => (
            <div key={item.num} className="flex flex-col text-left">
              <span className="text-[1.1vw] font-bold text-white">{item.num}</span>
              <span className="text-[1vw] text-white/80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;