import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    img: "/skill-0.png",
    title: "React.js",
    desc: "Building dynamic, component-driven UIs with React.",
  },
  {
    img: "/skill-1.png",
    title: "Node.js",
    desc: "Server-side JavaScript for scalable backends.",
  },
  {
    img: "/skill-2.jpeg",
    title: "MongoDB",
    desc: "NoSQL database for flexible data storage.",
  },
  {
    img: "/skill-3.jpeg",
    title: "Express.js",
    desc: "Minimal & fast web framework for Node.js.",
  },
];

const Skills = () => {
  const container = useRef(null);
  const isPC = typeof window !== "undefined" && window.innerWidth > 600;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".skill-card-container");

      if (isPC) {
        // Floating / swinging idle animation
        const swingTween = gsap.fromTo(
          ".skill-card",
          {
            y: -10,
          },
          {
            y: 10,
            stagger: { each: 0.3, yoyo: true, repeat: -1 },
            ease: "power1.inOut",
            duration: 1.5,
            paused: true,
          },
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".skills-headings",
            start: "top 70%",
            end: "top -100%",
            scrub: 2,
            pin: ".skills-wrapper",
          },
          onStart: () => swingTween.play(),
        });

        tl.to(".skills-inner", {
          backgroundColor: "#903ED6",
        })
          .to(
            cards[0],
            { rotateZ: -20, ease: "back.inOut", duration: 0.3 },
            "<+0.3",
          )
          .to(cards[1], { rotateZ: -5, ease: "back.inOut", duration: 0.3 }, "<")
          .to(cards[2], { rotateZ: 5, ease: "back.inOut", duration: 0.3 }, "<")
          .to(cards[3], { rotateZ: 20, ease: "back.inOut", duration: 0.3 }, "<")
          .to(cards, { margin: "0", ease: "power1.inOut" }, "-=0.1")
          .to(
            ".skill-card .skill-bg",
            { rotateY: -90, stagger: 0.1, ease: "back.in" },
            "<",
          )
          .to(
            ".skill-card .skill-details",
            { display: "flex", rotateY: 0, stagger: 0.1, ease: "back.out" },
            "<+=0.5",
          )
          .to(cards, { rotateZ: 0, ease: "back.inOut" }, "<")
          .to(cards, { margin: "10px", ease: "back.inOut" }, "<")
          .set(
            ".skill-card .skill-bg",
            { display: "none", stagger: 0.1 },
            "<+0.2",
          );
      } else {
        // Mobile: per-card flip on scroll
        cards.forEach((card) => {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              start: "top 50%",
              trigger: card,
              scrub: 5,
              end: "top 49%",
            },
          });

          cardTl
            .to(".skills-inner", {
              backgroundColor: "#903ED6",
            })
            .to(card.querySelector(".skill-bg"), {
              rotateY: -90,
              stagger: 0.1,
              ease: "back.in",
            })
            .to(
              card.querySelector(".skill-details"),
              { display: "flex", rotateY: 0, stagger: 0.1, ease: "back.out" },
              "<+=0.5",
            )
            .set(
              card.querySelector(".skill-bg"),
              { display: "none", stagger: 0.1 },
              "<+0.2",
            )
            .to(
              card.querySelector("img"),
              { scale: 1.2, ease: "power1.inOut", duration: 0.5 },
              "<",
            );
        });
      }

      // Hover animation for individual cards
      cards.forEach((card) => {
        const img = card.querySelector("img");
        if (!img) return;
        const tw = gsap.to(img, {
          scale: 1.2,
          ease: "power1.inOut",
          paused: true,
        });
        card.addEventListener("mouseenter", () => tw.play());
        card.addEventListener("mouseleave", () => tw.reverse());
        card.addEventListener("touchstart", () => tw.play(), { passive: true });
        card.addEventListener("touchend", () => tw.reverse(), {
          passive: true,
        });
        card.addEventListener("touchcancel", () => tw.reverse(), {
          passive: true,
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="skills-wrapper w-full">
      <div className="skills-inner w-full bg-[#C22A1A]">
        {/* ── Heading ── */}
        <section
          id="my-skills"
          className="skills-headings sm:pt-[20rem] pt-[10vh]"
        >
          <div className="w-full text-white">
            <div className="flex justify-between items-center sm:px-12 px-4">
              <h1 className="text-[12vw] w-fit whitespace-nowrap font-neuehaas leading-none tracking-wide font-bold antialiased">
                My Skills
              </h1>
              <div className="w-full sm:block hidden sm:w-[20%] h-full">
                <h5 className="text-[0.9vw] font-neuehaas font-semibold tracking-wider uppercase">
                  Technologies I work with as a MERN Stack Engineer
                </h5>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cards ── */}
        <section className="skills-cards-section text-black relative flex flex-col sm:flex-row justify-center items-center py-[5vh] sm:h-screen w-full">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="skill-card-container m-[4vh] sm:-m-[11vw] cursor-pointer z-10 hover:scale-[110%] transition-transform duration-300"
          >
            <div
              className="skill-card w-[90vw] sm:w-[22vw] relative"
              style={{ aspectRatio: "2/3", perspective: "400px" }}
            >
              {/* Front face — details (hidden initially, flipped in) */}
              <div
                className="skill-details hidden absolute top-0 left-0 w-full h-full bg-white px-[4%] rounded-[14px] py-[10%] flex-col justify-between gap-[5%]"
                style={{ transform: "rotateY(90deg)" }}
              >
                <div className="w-full h-[70%] rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 p-1">
                  <img
                    src={skill.img}
                    className="w-full h-full object-contain scale-[150%]"
                    alt={skill.title}
                  />
                </div>
                <h1 className="font-neuehaas text-2xl font-bold">
                  {skill.title}
                </h1>
                <p className="font-neuehaas font-medium tracking-wide text-sm opacity-80">
                  {skill.desc}
                </p>
              </div>

              {/* Back face — plain card back */}
              <div
                className="skill-bg bg-cover absolute top-0 left-0 w-full h-full rounded-[14px] bg-white bg-center"
                style={{ backgroundImage: "url(/cardback.png)" }}
              ></div>
            </div>
          </div>
        ))}
        </section>
      </div>
    </div>
  );
};

export default Skills;
