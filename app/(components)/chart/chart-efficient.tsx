'use client'

import { useProgressStore } from "@/stores/general.store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { BadgeCheck, ClockPlus, Radio } from "lucide-react"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChartPointItem from "./chart-point-item"

const CEfficient = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const isMobile = useMediaQuery('(max-width: 768px)', {
        defaultValue: false,
        initializeWithValue: false,
    })
    const active = progress === index;

    useGSAP(() => {
        if (!active || !ref.current) return;
        
        const titleElements = [ref.current?.querySelector('.efficient-badge'), ref.current?.querySelector('.efficient-title')].filter(Boolean);
        const points = ref.current?.querySelectorAll('.chart-point-item') || [];

        gsap.set(titleElements, { y: 30, opacity: 0 });
        if(points.length > 0) gsap.set(points, { y: 20, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(titleElements, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            delay: isMobile ? 0.3 : 0.8
        });

        if(points.length > 0) {
            tl.to(points, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
            }, "-=0.5");
        }

    }, { dependencies: [active, isMobile], scope: ref })

    return (
        <div
            className={`relative inset-0 snap-normal md:snap-start ${isMobile ? 'col-span-full' : 'col-span-1'} flex flex-col md:justify-start justify-center gap-4 overflow-hidden h-full 2xl:pt-ds-[128] sm:pt-ds-[80] py-[50px] sm:px-ds-[44] px-0 bg-white`}
            ref={ref}
        >
            <h6 className="efficient-badge opacity-0 md:px-0 px-3.5 z-10 uppercase text-transparent bg-clip-text font-medium bg-gradient-to-r from-[#0B9C36] to-[#175F49] text-sm sm:text-ds-[14]">With SpecGauge</h6>
            <h2 className="efficient-title opacity-0 md:px-0 px-3.5 z-10 text-[32px] sm:text-ds-[32] font-medium text-[#111111] leading-[95%] sm:mb-ds-[40] md:whitespace-pre-wrap">{'Efficient refills only when\nthey’re needed'}</h2>

            <svg className="flex-1 absolute hidden md:flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 610 900">
                <g filter="url(#filter0_f_1_1182)" opacity="0.15">
                    <path
                        fill="#5C98FF"
                        fillRule="evenodd"
                        d="M388.222 753.992c-96.717-67.624-195.296-178.034-143.717-320.399 50.606-139.679 249.738-161.249 359.739-275.847C711.707 45.792 723.908-161.852 858.275-205.828c131.88-43.163 198.995 97.093 250.035 198.6 38.47 76.509 13.38 179.473-9.25 280.24-19.52 86.894-51.25 169.958-109.646 249.093-73.828 100.056-151.245 209.289-259.349 250.985-126.566 48.818-254.299 42.111-341.843-19.098"
                        clipRule="evenodd"
                    ></path>
                </g>
                <defs>
                    <filter
                        id="filter0_f_1_1182"
                        width="1357.93"
                        height="1479.22"
                        x="0.324"
                        y="-443.853"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        ></feBlend>
                        <feGaussianBlur
                            result="effect1_foregroundBlur_1_1182"
                            stdDeviation="115"
                        ></feGaussianBlur>
                    </filter>
                </defs>
            </svg>

            <div className={`col-span-full ${isMobile ? 'flex' : 'hidden'} flex-col gap-[30px] sm:gap-ds-[32] relative z-10 mt-10 sm:mt-ds-[40]`}>
                <div className="chart-point-item opacity-0">
                    <ChartPointItem
                        color={{ line: ['#0B9C36', '#175F49'], point: '#0B9C36' }}
                        direction="right"
                        icon={<Radio className="icon-ds-[18]" color="#0B9C36" />}
                        title={"Real-time visibility\nof every tank"}
                        index={0}
                    />
                </div>
                <div className="chart-point-item opacity-0">
                    <ChartPointItem
                        color={{ line: ['#0B9C36', '#175F49'], point: '#0B9C36' }}
                        direction="right"
                        icon={<ClockPlus className="icon-ds-[18]" color="#0B9C36" />}
                        title={"Smart scheduling and combined\ndelivery runs"}
                        index={1}
                    />
                </div>
                <div className="chart-point-item opacity-0">
                    <ChartPointItem
                        color={{ line: ['#0B9C36', '#175F49'], point: '#0B9C36' }}
                        direction="right"
                        icon={<BadgeCheck className="icon-ds-[18]" color="#0B9C36" />}
                        title={"No more surprises\nat critical sites"}
                        index={2}
                    />
                </div>
            </div>
        </div>
    )
}

export default CEfficient
