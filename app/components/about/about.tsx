"use client";

import React from "react";
import Image from "next/image";
import {
  SocialIcons,
  TimelineItems,
} from "../../common/constants/constants";
import FlipText from "@/app/common/styling/flipText";
import TechStackCategories from "./TechStackCategories";

// Individual timeline item component
const TimelineItem = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => (
  <div className="relative pl-8 pb-6 m-3">
    <div className="absolute left-0 top-0 h-full">
      <div
        className="timeline-line"
        style={{
          background: `linear-gradient(to bottom, ${item.color} 0%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
      <div
        className="timeline-planet"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${item.color}, rgba(0,0,0,1))`,
          boxShadow: `0 0 10px ${item.color}`,
        }}
      >
        {index % 2 === 0 && <div className="planet-ring" />}
      </div>
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-primary">
      {item.title}
    </h3>
    <p className="text-xs sm:text-sm text-secondary">{item.period}</p>
    <p className="mt-2 text-sm sm:text-base text-secondary">
      {item.description}
    </p>
  </div>
);

const About = () => {
  return (
    <div className="w-full container-custom py-6 md:py-12 lg:py-16">
      {/* Top Section: Image on left, Name & Intro on right */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Profile Image */}
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <div className="profile-image">
            <Image
              src="/media/png/profile2.png"
              alt="Profile Photo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name & Introduction */}
        <div className="md:w-2/3 space-y-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold flip-text-container heading-size">
            <FlipText text="Kirtankumar Thummar" />
          </h2>

          <h3 className="text-lg sm:text-xl text-secondary text-gradient animate-fade-in">
            Full-Stack Developer & Data Visualization Engineer
          </h3>

          <p className="text-base sm:text-lg text-secondary animate-fade-in max-w-md mx-auto md:mx-0">
            Software engineer specializing in web development and data visualization with expertise in Django, React.js, and Next.js. Currently pursuing a Master's in Information Technology at Arizona State University with professional experience in building interactive web applications and analytics dashboards.
          </p>

          <div className="flex space-x-4 mt-4 justify-center md:justify-start">
            {SocialIcons.map(({ Icon, link, label, className }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={{ color: "var(--color-text-secondary)" }}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline on left, Tech Stack on right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Timeline Column */}
        <div className="md:w-7/10 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gradient text-center md:text-left">
            Professional Journey
          </h2>

          <div className="timeline-container">
            {TimelineItems.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Tech Stack Column */}
        <div className="md:w-3/10">
          <div className="tech-container">
            <h3 className="text-lg sm:text-xl font-semibold text-gradient mb-3 sm:mb-4 text-center md:text-left">
              Technical Skills
            </h3>
            
            {/* Replace the old TechStack map with the new categorized component */}
            <TechStackCategories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;