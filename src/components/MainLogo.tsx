import React from "react";
import svgPaths from "@/imports/1920X1080/svg-acf38vze5p";

interface MainLogoProps {
  className?: string;
  colorMain?: string;
  colorAccent?: string;
}

/**
 * Main Logo component for "Пробибику".
 * Centralized SVG representation using paths from Figm-imported assets.
 */
export function MainLogo({ 
  className = "", 
  colorMain = "#314158", 
  colorAccent = "#C89F87" 
}: MainLogoProps) {
  return (
    <svg
      className={`block ${className}`}
      fill="none"
      viewBox="0 0 198.092 32.076"
      preserveAspectRatio="xMinYMin meet"
    >
      <g>
        {/* Accent parts (first three paths) */}
        <path d={svgPaths.p36766480} fill={colorAccent} />
        <path d={svgPaths.p274cc40} fill={colorAccent} />
        <path d={svgPaths.p23ac0b00} fill={colorAccent} />
        
        {/* Main parts (rest of the paths) */}
        <path d={svgPaths.p2aba1400} fill={colorMain} />
        <path d={svgPaths.p180e4300} fill={colorMain} />
        <path d={svgPaths.p3eb54470} fill={colorMain} />
        <path d={svgPaths.pead7070} fill={colorMain} />
        <path d={svgPaths.p179bfa00} fill={colorMain} />
        <path d={svgPaths.p169d1200} fill={colorMain} />
      </g>
    </svg>
  );
}
