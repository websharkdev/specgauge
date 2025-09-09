"use client"

import useSectionScroll from "@/hooks/use-section-scroll";
import { BChart, BHero, BSlider, BWhyUs, BForm } from "./(components)";

const sections = [
  <BHero key="hero" />,
  <BChart key="chart" />,
  <BSlider key="slider" />,
  <BWhyUs key="whyus" />,
  <BForm key="form" />
]

export default function Home() {
  const sectionRefs = useSectionScroll(5); // 5 секций
  return (
    <div className="w-full h-full overflow-hidden">
      {sectionRefs.map((ref, i) => (
        <section
          key={i}
          ref={ref}
          className="transition-colors duration-700"
        >
          {sections[i]}
        </section>
      ))}
    </div>
  );
}
