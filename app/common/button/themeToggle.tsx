"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../../../app/globals.css";

import sunImage from "../../media/png/SunSmall.png";
import moonImage from "../../media/png/MoonSmall.png";

const dayLightVideoPath = "/media/mp4/dayLight.mp4";
const nightStarsVideoPath = "/media/mp4/nightStars.mp4";

gsap.registerPlugin(MotionPathPlugin);

type ThemeToggleProps = {
  onToggle: (isDarkMode: boolean) => void;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onToggle }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationTlRef = useRef<gsap.core.Timeline | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sunImageUrl, setSunImageUrl] = useState<string>("");
  const [moonImageUrl, setMoonImageUrl] = useState<string>("");

  useLayoutEffect(() => {
    setSunImageUrl(sunImage.src);
    setMoonImageUrl(moonImage?.src || sunImage.src);

    if (!svgRef.current || !coverRef.current) return;

    gsap.set(svgRef.current, { autoAlpha: 1 });
    gsap.set("#face", {
      attr: {
        cx: isDarkMode ? 190 : 10,
        cy: 132,
        r: 60,
      },
    });

    animationTlRef.current = gsap.timeline({
      paused: true,
      defaults: { duration: 3, ease: "power2.inOut" },
    });

    animationTlRef.current.to("#face", {
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0.5, 0.5],
      },
    });

    return () => {
      animationTlRef.current?.kill();
    };
  }, []);

  const turnOnDarkMode = () => {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    gsap
      .to(coverRef.current, {
        duration: 0,
      })
      .then(() => {
        document.body.style.backgroundColor = "var(--foreground)";
      });
  };

  const turnOnLightMode = () => {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    gsap
      .to(coverRef.current, {
        duration: 0,
      })
      .then(() => {
        document.body.style.backgroundColor = "var(--background)";
      });
  };

  const handleToggleClick = () => {
    if (coverRef.current) {
      gsap.set(coverRef.current, { width: "75px", height: "75px" });
    }

    const newDarkMode = !isDarkMode;

    if (newDarkMode) {
      animationTlRef.current?.play().eventCallback("onComplete", () => {
        setIsDarkMode(true);
        onToggle(true);
        turnOnDarkMode();
      });
    } else {
      animationTlRef.current
        ?.reverse()
        .eventCallback("onReverseComplete", () => {
          setIsDarkMode(false);
          onToggle(false);
          turnOnLightMode();
        });
    }
  };

  return (
    <div className="overflow-hidden h-[52px] flex items-center justify-center">
      <div ref={coverRef} className="absolute z-[-1]"></div>

      <button
        ref={buttonRef}
        onClick={handleToggleClick}
        className={`w-11.5 h-5 border-0 relative
            ${isDarkMode ? "bg-transparent" : "bg-transparent"}
            flex items-end p-0 cursor-pointer`}
      >
        <video
          key={isDarkMode ? "night" : "day"}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute border inset-0 z-[-1] w-full h-full object-cover
          ${isDarkMode ? "opacity-100 border-white" : "opacity-50 border-black"}
          rounded-[50px]`}
        >
          <source
            src={isDarkMode ? nightStarsVideoPath : dayLightVideoPath}
            type="video/mp4"
          />
        </video>

        <svg
          ref={svgRef}
          id="stick-figure-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-70 -250 410 410"
          className="w-[300%] h-[300%] z-0"
        >
          {sunImageUrl && moonImageUrl && (
            <defs>
              <pattern
                id="sun-pattern"
                patternUnits="userSpaceOnUse"
                width="130"
                height="130"
                patternTransform="translate(-60, -60)"
              >
                <image
                  href={sunImageUrl}
                  x="0"
                  y="0"
                  width="145"
                  height="120"
                />
              </pattern>

              <pattern
                id="moon-pattern"
                patternUnits="userSpaceOnUse"
                width="130"
                height="130"
                patternTransform="translate(-60, -60)"
              >
                <image
                  href={moonImageUrl}
                  x="0"
                  y="0"
                  width="145"
                  height="120"
                />
              </pattern>

              <path
                id="motionPath"
                d="M10 132 A 42 42 0 0 1 255 132"
                fill="none"
                stroke="none"
              />

              <filter
                id="sunGlow"
                x="-150%"
                y="-150%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feFlood
                  floodColor="#ec5005"
                  floodOpacity="0.8"
                  result="color"
                />
                <feComposite
                  in="color"
                  in2="blur"
                  operator="in"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="moonGlow"
                x="-150%"
                y="-150%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feFlood
                  floodColor="white"
                  floodOpacity="0.8"
                  result="color"
                />
                <feComposite
                  in="color"
                  in2="blur"
                  operator="in"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}

          <circle
            id="face"
            cx="10"
            cy="132"
            r="60"
            fill={
              sunImageUrl && moonImageUrl
                ? `url(#${isDarkMode ? "moon-pattern" : "sun-pattern"})`
                : isDarkMode
                ? "#A0A0A0"
                : "#FFAA00"
            }
            filter={isDarkMode ? "url(#moonGlow)" : "url(#sunGlow)"}
          />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;
