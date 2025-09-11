"use client"

import { useProgressStore } from "@/stores/general.store";
import { BChart, BForm, BHero, BSlider, BWhyUs } from "./(components)";
import { useMediaQuery } from "usehooks-ts";
import { useMemo } from "react";
import { CEfficient, CMonthly } from "./(components)/chart";


export default function Home() {
  const { progress } = useProgressStore()
  const small = useMediaQuery('(max-width: 768px)')


  const sections = useMemo(() => {
    if (small) {
      return [
        <BHero key="hero" />,
        <CMonthly key="chart" />,
        <CEfficient key="chart" />,
        <BSlider key="slider" />,
        <BWhyUs key="whyus" />,
        <BForm key="form" />
      ]
    }

    return [
      <BHero key="hero" />,
      <BChart key="chart" />,
      <BSlider key="slider" />,
      <BWhyUs key="whyus" />,
      <BForm key="form" />
    ]
  }, [small])

  return (
    <div className="w-full h-full overflow-hidden">
      {sections.map((section, i) => i === progress ? section : null)}
    </div>
  );
}
