"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import { BChart, BForm, BHero, BSlider, BWhyUs } from "./(components)";

const CMonthly = dynamic(() => import("./(components)/chart").then((mod) => ({ default: mod.CMonthly })));
const CEfficient = dynamic(() => import("./(components)/chart").then((mod) => ({ default: mod.CEfficient })));


export default function Home() {
  const small = useMediaQuery('(max-width: 768px)', {
    defaultValue: false,
    initializeWithValue: false,
  })

  const sections = useMemo(() => {
    if (small) {
      return [
        <BHero index={0} key="hero" />,
        <CMonthly index={1} key="chart_1" />,
        <CEfficient index={2} key="chart_2" />,
        <BSlider index={3} key="slider" />,
        <BWhyUs index={4} key="whyus" />,
        <BForm index={5} key="form" />
      ]
    }

    return [
      <BHero index={0} key="hero" />,
      <BChart index={1} key="chart" />,
      <BSlider index={2} key="slider" />,
      <BWhyUs index={3} key="whyus" />,
      <BForm index={4} key="form" />
    ]
  }, [small])

  return (
    <div className="w-full h-full lg:overflow-hidden">
      {sections.map((section) => section)}
    </div>
  );
}
