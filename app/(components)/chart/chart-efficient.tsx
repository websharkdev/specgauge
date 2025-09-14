'use client'

import { useProgressStore } from "@/stores/general.store"
import { BadgeCheck, ClockPlus, Radio } from "lucide-react"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChartPointItem from "./chart-point-item"

const CEfficient = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')

    const isInView = useInView(ref, {
        once: small
    })

    return (
        <motion.div
            initial={{ opacity: small ? 1 : 0 }}
            animate={isInView && (progress === index || small) ? {
                opacity: 1,
            } : {}}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'linear'
            }}
            className={`relative inset-0 snap-normal md:snap-start ${small ? 'col-span-full' : 'col-span-1'} flex flex-col md:justify-start justify-center gap-4  overflow-hidden h-full 2xl:pt-ds-[128] md:pt-ds-[80] py-[50px] md:px-ds-[44] px-0 bg-white`}
            ref={ref}
        >
            <motion.h6
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0,
                } : {}}
                transition={{
                    duration: .6,
                    delay: small ? 0.3 : 1.3,
                    ease: 'easeIn',
                }}
                className="md:px-0 px-3.5 z-10 uppercase text-transparent bg-clip-text font-medium bg-gradient-to-r from-[#0B9C36] to-[#175F49] text-sm">With SpecGauge</motion.h6>
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0,
                } : {}}
                transition={{
                    duration: 1,
                    delay: small ? 0.5 : 1.5,
                    ease: 'easeIn',
                }}
                className="md:px-0 px-3.5 z-10 text-[32px] md:text-ds-[32] font-medium text-[#111111] leading-[95%] mb-ds-[40] md:whitespace-pre-wrap">{'Efficient refills only when\nthey’re needed'}</motion.h2>

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

            <div className={`col-span-full ${small ? 'flex' : 'hidden'} flex-col gap-[30px] md:gap-ds-[32] relative z-10 mt-10 md:mt-ds-[40]`}>                <ChartPointItem
                color={{ line: ['#0B9C36', '#175F49'], point: '#0B9C36' }}
                direction="right"
                icon={<Radio size={18} color="#0B9C36" />}
                title={"Real-time visibility\nof every tank"}
                index={0}
            />
                <ChartPointItem
                    color={{ line: ['#0B9C36', '#175F49'], point: '#0B9C36' }}
                    direction="right"
                    icon={<ClockPlus size={18} color="#0B9C36" />}
                    title={"Smart scheduling and combined\ndelivery runs"}
                    index={1}
                />
                <ChartPointItem
                    color={{ line: ['#0B9C36', '#175F49'], point: '#0B9C36' }}
                    direction="right"
                    icon={<BadgeCheck size={18} color="#0B9C36" />}
                    title={"No more surprises\nat critical sites"}
                    index={2}
                />
            </div>
        </motion.div>
    )
}

export default CEfficient