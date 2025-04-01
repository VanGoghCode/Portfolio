// footer.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import FlipText from "../../common/styling/flipText";
import { SocialIcons } from "@/app/common/constants/constants";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmailToClipboard = () => {
    const email = "vangoghcode@protonmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <footer className="w-full py-4 sm:py-6">
      <div className="container-custom px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3
              className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
              style={{ color: "var(--color-text-light)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {["About me", "Projects", "Blogs", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    key={item == "About me" ? "About" : item}
                    href={`#${
                      item == "About me" ? "about" : item.toLowerCase()
                    }`}
                    className="hover:text-white transition-colors inline-block text-[var(--color-text-secondary)]"
                  >
                    <FlipText text={item} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h3
              className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
              style={{ color: "var(--color-text-light)" }}
            >
              Connect With Me
            </h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-3 sm:mb-4">
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
            <div className="relative flex justify-center md:justify-start">
              <p
                onClick={copyEmailToClipboard}
                className="cursor-pointer inline-flex items-center transition-colors max-w-full overflow-hidden text-sm sm:text-base"
                style={{ color: "var(--color-text-secondary)" }}
                title="Click to copy email"
              >
                <span className="mr-1">Email:</span>
                <span className="truncate">
                  <FlipText text="vangoghcode@protonmail.com" />
                </span>
                {copied && (
                  <span
                    className="absolute -top-6 md:-top-0 md:right-43 right-0 px-2 py-1 text-xs rounded"
                    style={{
                      backgroundColor: "var(--color-success)",
                      color: "var(--color-text-light)",
                    }}
                  >
                    Copied!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <hr
          className="my-4 sm:my-6"
          style={{
            borderColor: "color-mix(in srgb, var(--color-primary) 70%, white)",
          }}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p
            className="text-center sm:text-left text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <FlipText
              text={`© ${new Date().getFullYear()} All rights reserved`}
            />
          </p>
          <div className="flex flex-wrap justify-center space-x-4 text-xs sm:text-sm">
            {["Privacy Policy", "Terms of Service"].map((title) => (
            <Link
              key={title}
              href={title == "Privacy Policy" ? "privacy" : "terms" }
              className="hover:text-white transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <FlipText text={title} />
            </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
