'use client'

import { useProgressStore } from "@/stores/general.store"
import { Building2, ChartNoAxesCombined, ClockPlus, HandCoins } from "lucide-react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"

const WhyUsItem = ({
    icon,
    iconBG = '',
    title,
    subtitle,
    isInView,
    index
}: {
    icon: React.ReactNode,
    iconBG: string
    title: string,
    subtitle: string
    isInView: boolean
    index: number
}) => {
    return <div className="flex gap-3 md:gap-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
            } : {}}
            transition={{
                duration: .5,
                delay: .85 + index * 0.4,
                ease: 'linear'
            }}
            className={`size-10 md:size-12 rounded-lg flex justify-center items-center`}
            style={{
                background: iconBG
            }}>
            {icon}
        </motion.div>
        <div className="flex flex-col gap-2.5 sm:gap-ds-[10] flex-1">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0,
                } : {}}
                transition={{
                    duration: .5,
                    delay: .85 + index * 0.4,
                    ease: 'linear'
                }}
                className="text-[18px] sm:text-ds-[22] font-medium whitespace-pre leading-[110%]">{title}</motion.h3>
            <motion.h6
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? {
                    opacity: .5,
                    y: 0,
                } : {}}
                transition={{
                    duration: .5,
                    delay: .85 + index * 0.4,
                    ease: 'linear'
                }}
                className="text-sm sm:text-ds-[14] text-[#111111] leading-snug">{subtitle}</motion.h6>
        </div>
    </div>
}

const BWhyUs = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')
    const isInView = useInView(ref, {
        once: small
    })

    return (
        <motion.div
            id="advantages"
            initial={{
                opacity: small ? 1 : 0,
                pointerEvents: 'none'
            }}
            animate={isInView && (progress === index || small) ? {
                opacity: 1,
                pointerEvents: 'auto'
            } : {}}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'linear'
            }}
            ref={ref}
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start transition-all duration-700 w-full grid grid-cols-10 items-center min-h-dvh justify-end">
            <div className="lg:col-span-5 col-span-full flex flex-col relative overflow-hidden h-max justify-between py-14 sm:pt-ds-[65] sm:pb-ds-[25] sm:px-ds-[80] px-3.5 gap-[25px] sm:gap-ds-[40]">
                <div className="flex flex-col gap-3.5 sm:gap-ds-[14]">
                    <motion.h5
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView && (progress === index || small) ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: 'easeIn',
                        }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] text-sm sm:text-ds-[14] uppercase font-medium">Real-Time Advantage</motion.h5>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView && (progress === index || small) ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 1,
                            delay: 0.8,
                            ease: 'linear'
                        }}
                        className="text-[32px] sm:text-ds-[36] font-medium leading-[95%] text-[#111111] sm:whitespace-pre-wrap w-full">{`Why oil companies choose\nSpecGauge`}</motion.h2>
                </div>
                <div className="md:flex-1" />
                <div className="flex flex-col gap-5 sm:gap-ds-[24]">
                    <WhyUsItem index={1} isInView={isInView} icon={<Image src='/icons/coins-hand.svg' alt='icon' width={24} className="size-5 sm:size-ds-[24]" height={24} />} iconBG="linear-gradient(205.6deg, #EBF3F9 11.6%, #F9F0F0 83.8%)" title={"Save costs\n\on every delivery"} subtitle="Cut wasted trips, reduce fuel consumption, and maximize the efficiency of every delivery run — saving your depot money with every mile driven." />
                    <WhyUsItem index={2} isInView={isInView} icon={<Image src='/icons/building-07.svg' alt='icon' width={24} className="size-5 sm:size-ds-[24]" height={24} />} iconBG="linear-gradient(211.73deg, #F3F5FC 9.55%, #F2F0F4 80.9%)" title={"Increase reliability\n\at critical facilities"} subtitle="Ensure that hospitals, care homes, and essential services never face fuel shortages, giving your customers complete peace of mind and building long-term trust" />
                    <WhyUsItem index={3} isInView={isInView} icon={<Image src='/icons/clock-check.svg' alt='icon' width={24} className="size-5 sm:size-ds-[24]" height={24} />} iconBG="linear-gradient(203.58deg, #EEF7F1 15.19%, #EAF2F7 91.35%)" title={"Boost efficiency\n\with real-time data"} subtitle="Plan optimized delivery schedules based on live tank information, combining multiple stops into one run and transforming daily logistics into smooth operations" />
                    <WhyUsItem index={4} isInView={isInView} icon={<Image src='/icons/bar-line-chart.svg' alt='icon' width={24} className="size-5 sm:size-ds-[24]" height={24} />} iconBG="linear-gradient(205.6deg, #F3F9EB 11.6%, #F9F0F0 83.8%)" title={"Predict with confidence,\n\stay ahead always"} subtitle="Move from reactive to proactive planning by knowing tank levels before customers even call, ensuring your business is always one step ahead of demand" />
                </div>
            </div>
            <div className="col-span-5 lg:flex hidden flex-col gap-4 relative overflow-hidden h-full"
                style={{
                    background: 'url("/why_us.png") center center / cover no-repeat',
                }}
            />
        </motion.div>
    )
}

export default BWhyUs