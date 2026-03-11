'use client'

import { useProgressStore } from "@/stores/general.store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitType from "split-type"
import { Bus, PhoneCall, TriangleAlert } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSectionTransition } from "@/hooks/use-section-transition"
import ChartPointItem from "./chart-point-item"

const CMonthly = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const small = useMediaQuery('(max-width: 768px)')
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMobile = mounted ? small : false;
    const active = progress === index;

    useSectionTransition(ref, active);

    useGSAP(() => {
        if (!active || !ref.current) return;
        
        const titleElements = [ref.current?.querySelector('.monthly-badge'), ref.current?.querySelector('.monthly-title')].filter(Boolean);
        const points = ref.current?.querySelectorAll('.chart-point-item') || [];

        gsap.set(titleElements, { y: 30, opacity: 0 });
        if(points.length > 0) gsap.set(points, { y: 20, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(titleElements, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            delay: isMobile ? 0.3 : 0.5
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
        <div ref={ref}
            id="pain_point_1"
            className={`relative inset-0 snap-normal md:snap-start ${isMobile ? 'col-span-full' : 'col-span-1'} flex flex-col md:justify-start justify-center gap-4 overflow-hidden h-full 2xl:pt-ds-[128] sm:pt-ds-[80] py-[50px] sm:px-ds-[44] px-0 border-r border-[#00000050] bg-[#E5E8EF]`}>
            <h6 className="monthly-badge opacity-0 md:px-0 px-3.5 z-10 uppercase text-transparent bg-clip-text font-medium bg-gradient-to-r from-[#F14616] to-[#860000] text-sm sm:text-ds-[14]">tanks often 80% full</h6>
            <h2 className="monthly-title opacity-0 md:px-0 px-3.5 z-10 text-[32px] sm:text-ds-[32] font-medium text-[#111111] leading-[95%] mb-10 sm:mb-ds-[40] md:whitespace-pre-wrap">{`Monthly top-ups wasting\nresources`}</h2>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 801 900"
                className="absolute inset-0"
            >
                <g clipPath="url(#clip0_1_1183)">
                    <g filter="url(#filter0_f_1_1183)" opacity="0.15">
                        <path
                            fill="#0A7EEE"
                            fillRule="evenodd"
                            d="M-268.042 741.599c-39.909-49.803 106.012-156.821 183.765-238.004C-30.69 447.644 33.799 401.84 104.234 352.898c101.109-70.256 205.729-188.083 303.745-191.349 98.267-3.275 47.261 109.98 45.385 179.714-1.176 43.753-34.751 92.327-54.025 141.472-31.75 80.954 19.562 170.338-93.22 233.96-112.251 63.324-149.537-43.996-251.35-39.58-101.884 4.419-282.062 115.336-322.811 64.484"
                            clipRule="evenodd"
                        ></path>
                    </g>
                    <g filter="url(#filter1_f_1_1183)" opacity="0.1">
                        <path
                            fill="#FF8B00"
                            fillRule="evenodd"
                            d="M647.094 591.465c-56.259-21.847-118.214-65.261-108.045-144.561 9.977-77.805 107.936-114.79 150.634-187.562 41.714-71.093 24.781-178.53 87.609-218.483 61.666-39.214 111.082 23.52 148.089 68.6 27.893 33.979 26.693 89.738 26.487 144.057-.177 46.841-6.936 93.323-27.567 141.283-26.085 60.638-52.958 126.422-102.804 161.786-58.36 41.403-123.479 54.655-174.403 34.88"
                            clipRule="evenodd"
                        ></path>
                    </g>
                </g>
                <defs>
                    <filter
                        id="filter0_f_1_1183"
                        width="1383.08"
                        height="1233.43"
                        x="-594.826"
                        y="-158.521"
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
                            result="effect1_foregroundBlur_1_1183"
                            stdDeviation="160"
                        ></feGaussianBlur>
                    </filter>
                    <filter
                        id="filter1_f_1_1183"
                        width="1053.99"
                        height="1211.97"
                        x="217.945"
                        y="-291.493"
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
                            result="effect1_foregroundBlur_1_1183"
                            stdDeviation="160"
                        ></feGaussianBlur>
                    </filter>
                    <clipPath id="clip0_1_1183">
                        <path fill="#fff" d="M0 0h801v900H0z"></path>
                    </clipPath>
                </defs>
            </svg>
            <div className={`col-span-full ${isMobile ? 'flex' : 'hidden'} flex-col gap-[30px] sm:gap-ds-[32] relative z-10 mt-10 sm:mt-ds-[40]`}>
                <div className="chart-point-item opacity-0">
                    <ChartPointItem
                        color={{ line: ['#F14616', '#860000'], point: '#F14616' }}
                        direction="left"
                        icon={<PhoneCall className="icon-ds-[18]" color="#F14616" />}
                        title={"Emergency calls\nfrom customers\nin winter"}
                        index={0}
                    />
                </div>
                <div className="chart-point-item opacity-0">
                    <ChartPointItem
                        color={{ line: ['#F14616', '#860000'], point: '#F14616' }}
                        direction="left"
                        icon={<Bus className="icon-ds-[18]" color="#F14616" />}
                        title={"One-off deliveries\nthat waste time\nand fuel"}
                        index={1}
                    />
                </div>
                <div className="chart-point-item opacity-0">
                    <ChartPointItem
                        color={{ line: ['#F14616', '#860000'], point: '#F14616' }}
                        direction="left"
                        icon={<TriangleAlert className="icon-ds-[18]" color="#F14616" />}
                        title={"Hospitals\nand care homes\nat constant risk"}
                        index={2}
                    />
                </div>
            </div>
        </div>
    )
}

export default CMonthly
