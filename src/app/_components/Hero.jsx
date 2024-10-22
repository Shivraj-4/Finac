"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Moonbeam",
    thumbnail: "/images/pexels-fauxels-3183153.jpg", // Correct local path
  },
  {
    title: "Cursor",
    thumbnail: "/images/pexels-cheepo2109-303159.jpg", // Correct local path
  },
  {
    title: "Rogue",
    thumbnail: "/images/pexels-thisisengineering-3861969.jpg", // Correct local path
  },
  {
    title: "Editorially",
    thumbnail: "/images/pexels-startup-stock-photos-212286.jpg", // Correct local path
  },
  {
    title: "Editrix AI",
    thumbnail: "/images/pexels-ruslan-burlaka-40570-140945.jpg", // Correct local path
  },
  {
    title: "Pixel Perfect",
    thumbnail: "/images/pexels-rdne-8369676.jpg", // Correct local path
  },
  {
    title: "Algochurn",
    thumbnail: "/images/pexels-pixabay-265087.jpg", // Correct local path
  },
  {
    title: "Aceternity UI",
    thumbnail: "/images/pexels-pixabay-60504.jpg", // Correct local path
  },
  {
    title: "Tailwind Master Kit",
    thumbnail: "/images/pexels-nappy-3360204.jpg", // Correct local path
  },
  {
    title: "SmartBridge",
    thumbnail: "/images/pexels-nappy-935949.jpg", // Correct local path
  },
  {
    title: "Renderwork Studio",
    thumbnail: "/images/pexels-fauxels-3184465.jpg", // Correct local path
  },
  {
    title: "Creme Digital",
    thumbnail: "/images/pexels-fauxels-3183153.jpg", // Correct local path
  },
  {
    title: "Golden Bells Academy",
    thumbnail: "/images/pexels-energepic-com-27411-159888.jpg", // Correct local path
  },
  {
    title: "Invoker Labs",
    thumbnail: "/images/pexels-divinetechygirl-1181675.jpg", // Correct local path
  },
  {
    title: "E Free Invoice",
    thumbnail: "/images/pexels-davidmcbee-730547.jpg", // Correct local path
  },
];
