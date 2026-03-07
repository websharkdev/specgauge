'use client'

import { useProgressStore } from "@/stores/general.store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitType from "split-type"
import Image from "next/image"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSectionTransition } from "@/hooks/use-section-transition"

const WhyUsItem = ({
    icon,
    iconBG = '',
    title,
    subtitle,
    index
}: {
    icon: React.ReactNode,
    iconBG: string
    title: string,
    subtitle: string
    index: number
}) => {
    return <div className="why-us-item flex gap-3 md:gap-4 opacity-0 translate-y-10">
        <div
            className={`why-us-icon size-10 md:size-ds-[48] rounded-lg flex justify-center items-center`}
            style={{
                background: iconBG
            }}>
            {icon}
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-ds-[10] flex-1">
            <h3 className="why-us-title text-[18px] sm:text-ds-[22] font-medium whitespace-pre leading-[110%]">{title}</h3>
            <h6 className="why-us-subtitle text-sm sm:text-ds-[14] text-[#111111] leading-snug opacity-50">{subtitle}</h6>
        </div>
    </div>
}

const BWhyUs = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const small = useMediaQuery('(max-width: 768px)')

    const active = progress === index || small;

    useSectionTransition(containerRef, active);

    useGSAP(() => {
        if (!active || !containerRef.current || !titleRef.current) return;

        const splitTitle = new SplitType(titleRef.current, { types: 'lines,words' });
        
        // Initial set
        gsap.set(splitTitle.words, { y: 50, opacity: 0 });
        gsap.set('.why-us-badge', { y: 20, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to('.why-us-badge', {
            y: 0,
            opacity: 1,
            duration: 0.8
        })
        .to(splitTitle.words, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05
        }, "-=0.6")
        .to('.why-us-item', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        }, "-=0.6");

        // Optional scroll-trigger parallax on the image if not on a full-page scroll layout
        if (small) {
            gsap.fromTo('.why-us-image', 
                { backgroundPosition: '50% 0%' },
                {
                    backgroundPosition: '50% 100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }

        return () => {
            splitTitle.revert();
        };
    }, { dependencies: [active], scope: containerRef });

    return (
        <div
            id="advantages"
            ref={containerRef}
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full grid grid-cols-10 items-center min-h-dvh justify-end">
            <div className="lg:col-span-5 col-span-full flex flex-col relative overflow-hidden h-max justify-between py-14 sm:pt-ds-[65] sm:pb-ds-[25] sm:px-ds-[80] px-3.5 gap-[25px] sm:gap-ds-[40]">
                <div className="flex flex-col gap-3.5 sm:gap-ds-[14]">
                    <h5
                        className="why-us-badge text-transparent bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] text-sm sm:text-ds-[14] uppercase font-medium">Real-Time Advantage</h5>
                    <h2
                        ref={titleRef}
                        className="text-[32px] sm:text-ds-[36] font-medium leading-[95%] text-[#111111] sm:whitespace-pre-wrap w-full"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0% 120%)' }}
                    >{`Why oil companies choose\nSpecGauge`}</h2>
                </div>
                <div className="md:flex-1" />
                <div className="flex flex-col gap-5 sm:gap-ds-[24]">
                    <WhyUsItem index={1} icon={<Image src='/icons/coins-hand.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(205.6deg, #EBF3F9 11.6%, #F9F0F0 83.8%)" title={"Save costs\n\on every delivery"} subtitle="Cut wasted trips, reduce fuel consumption, and maximize the efficiency of every delivery run — saving your depot money with every mile driven." />
                    <WhyUsItem index={2} icon={<Image src='/icons/building-07.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(211.73deg, #F3F5FC 9.55%, #F2F0F4 80.9%)" title={"Increase reliability\n\at critical facilities"} subtitle="Ensure that hospitals, care homes, and essential services never face fuel shortages, giving your customers complete peace of mind and building long-term trust" />
                    <WhyUsItem index={3} icon={<Image src='/icons/clock-check.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(203.58deg, #EEF7F1 15.19%, #EAF2F7 91.35%)" title={"Boost efficiency\n\with real-time data"} subtitle="Plan optimized delivery schedules based on live tank information, combining multiple stops into one run and transforming daily logistics into smooth operations" />
                    <WhyUsItem index={4} icon={<Image src='/icons/bar-line-chart.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(205.6deg, #F3F9EB 11.6%, #F9F0F0 83.8%)" title={"Predict with confidence,\n\stay ahead always"} subtitle="Move from reactive to proactive planning by knowing tank levels before customers even call, ensuring your business is always one step ahead of demand" />
                </div>
            </div>
            <div className="why-us-image col-span-5 lg:flex hidden flex-col gap-4 relative overflow-hidden h-full"
                style={{
                    background: 'url("/why_us.png") center center / cover no-repeat',
                }}
            />
        </div>
    )
}

export default BWhyUs