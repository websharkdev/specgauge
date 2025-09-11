"use client"

import { useProgressStore } from "@/stores/general.store";
import { BChart, BForm, BHero, BSlider, BWhyUs } from "./(components)";

const sections = [
  <BHero key="hero" />,
  <BChart key="chart" />,
  <BSlider key="slider" />,
  <BWhyUs key="whyus" />,
  <BForm key="form" />
]

export default function Home() {
  const { progress } = useProgressStore()
  return (
    <div className="w-full h-full overflow-hidden">
      {sections.map((section, i) => i === progress ? section : null)}
    </div>
  );
}
