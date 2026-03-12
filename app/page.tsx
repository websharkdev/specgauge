"use client"

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { BChart, BForm, BHero, BSlider, BWhyUs } from "./(components)";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { useProgressStore } from "@/stores/general.store";

const CMonthly = dynamic(() => import("./(components)/chart").then((mod) => ({ default: mod.CMonthly })));
const CEfficient = dynamic(() => import("./(components)/chart").then((mod) => ({ default: mod.CEfficient })));


export default function Home() {
  const { progress, setProgress } = useProgressStore();
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

  const sectionsCount = sections.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(progress);
  const animatingRef = useRef(false);

  useGSAP(() => {
    if (small) return;

    gsap.registerPlugin(Observer);

    const sectionElements = gsap.utils.toArray<HTMLElement>(".section-container");
    const outerWrappers = gsap.utils.toArray<HTMLElement>(".outer");
    const innerWrappers = gsap.utils.toArray<HTMLElement>(".inner");

    // Initialize all sections
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    
    // Set first section or current progress as active
    const startIdx = currentIndexRef.current;
    gsap.set(sectionElements[startIdx], { autoAlpha: 1, zIndex: 1 });
    gsap.set(outerWrappers[startIdx], { yPercent: 0 });
    gsap.set(innerWrappers[startIdx], { yPercent: 0 });

    function gotoSection(index: number, direction: number) {
      if (animatingRef.current) return;
      index = gsap.utils.clamp(0, sectionsCount - 1, index);
      
      const prevIndex = currentIndexRef.current;
      if (index === prevIndex) return;

      animatingRef.current = true;
      const isNext = direction === 1;
      
      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false;
          // Clean up old section - ensure it's hidden and ignored
          if (prevIndex >= 0) {
            gsap.set(sectionElements[prevIndex], { autoAlpha: 0, zIndex: 0 });
          }
        }
      });

      // Update global progress store
      setProgress(index);

      // Incoming section: prepare
      gsap.set(sectionElements[index], { autoAlpha: 1, zIndex: 1 });
      
      // Outgoing section: prepare
      if (prevIndex >= 0) {
        gsap.set(sectionElements[prevIndex], { zIndex: 0 });
        
        // Parallax exit + fade out for the previous section
        tl.to(outerWrappers[prevIndex], {
          yPercent: isNext ? -20 : 20,
          duration: 1.25,
          ease: "power2.inOut"
        }, 0).to(innerWrappers[prevIndex], {
          yPercent: isNext ? 20 : -20,
          duration: 1.25,
          ease: "power2.inOut"
        }, 0).to(sectionElements[prevIndex], {
          scale: 0.95,
          autoAlpha: 0, // Explicit fade out
          duration: 1.25,
          ease: "power2.inOut"
        }, 0);
      }

      // Main entry animation for the new section (fadeIn + slide + scale)
      tl.fromTo(outerWrappers[index], 
        { yPercent: isNext ? 100 : -100 }, 
        { yPercent: 0, duration: 1.25, ease: "power2.inOut" },
        0
      ).fromTo(innerWrappers[index], 
        { yPercent: isNext ? -100 : 100 }, 
        { yPercent: 0, duration: 1.25, ease: "power2.inOut" }, 
        0
      ).fromTo(sectionElements[index],
        { scale: 1.05, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.25, ease: "power2.inOut" },
        0
      );

      currentIndexRef.current = index;
    }

    const observer = Observer.create({
      type: "wheel",
      onDown: () => {
        if (!animatingRef.current && currentIndexRef.current < sectionsCount - 1) {
          gotoSection(currentIndexRef.current + 1, 1);
        }
      },
      onUp: () => {
        if (!animatingRef.current && currentIndexRef.current > 0) {
          gotoSection(currentIndexRef.current - 1, -1);
        }
      },
      tolerance: 10,
      preventDefault: true
    });

    return () => {
      observer.kill();
    }
  }, { scope: containerRef, dependencies: [sectionsCount, small] });

  return (
    <div ref={containerRef} className="w-full h-screen lg:overflow-hidden relative">
      {sections.map((section, i) => (
        <div key={i} className="section-container">
          <div className="outer">
            <div className="inner">
               {section}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
