'use client'

import { Building2, ChartNoAxesCombined, ClockPlus, HandCoins } from "lucide-react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

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
    return <div className="flex gap-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
            } : {}}
            transition={{
                duration: .5,
                delay: .85 + index * 0.4,
                ease: [0, 0.71, 0.3, 1.01],
            }}
            className={`size-12 rounded-lg flex justify-center items-center`}
            style={{
                background: iconBG
            }}>
            {icon}
        </motion.div>
        <div className="flex flex-col gap-2.5 flex-1 max-w-xl">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0,
                } : {}}
                transition={{
                    duration: .5,
                    delay: .85 + index * 0.4,
                    ease: [0, 0.71, 0.3, 1.01],
                }}
                className="text-xl font-medium whitespace-pre leading-[110%]">{title}</motion.h3>
            <motion.h6
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? {
                    opacity: .5,
                    y: 0,
                } : {}}
                transition={{
                    duration: .5,
                    delay: .85 + index * 0.4,
                    ease: [0, 0.71, 0.3, 1.01],
                }}
                className="text-xs md:text-sm text-[#111111] leading-4 w-10/12 md:w-full">{subtitle}</motion.h6>
        </div>
    </div>
}

const BWhyUs = () => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={isInView ? {
                opacity: 1,
            } : {}}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'linear'
            }}
            ref={ref} className="snap-start w-full grid grid-cols-12 items-center min-h-dvh justify-end relative">
            <div className="lg:col-span-5 col-span-full flex flex-col relative overflow-hidden h-max justify-between lg:pl-20 pl-3.5 gap-6 xl:gap-10 2xl:gap-20">
                <div className="flex flex-col gap-4 max-w-lg">
                    <motion.h5
                        initial={{ opacity: 0, }}
                        animate={isInView ? { opacity: 1, } : {}}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: [0, 0.71, 0.3, 1.01],
                        }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] text-sm uppercase">Real-Time Advantage</motion.h5>
                    <motion.h2
                        initial={{ opacity: 0, }}
                        animate={isInView ? { opacity: 1, } : {}}
                        transition={{
                            duration: 1,
                            delay: 0.8,
                            ease: [0, 0.71, 0.3, 1.01],
                        }}
                        className="md:text-4xl text-3xl font-medium leading-[95%] text-[#111111] max-w-[353px]">Why oil companies choose SpecGauge</motion.h2>
                </div>
                <div className="flex flex-col gap-11">
                    <WhyUsItem index={1} isInView={isInView} icon={<Image src='/icons/coins-hand.svg' alt='icon' width={24} height={24} />} iconBG="linear-gradient(205.6deg, #EBF3F9 11.6%, #F9F0F0 83.8%)" title={"Save costs\n\on every delivery"} subtitle="Cut wasted trips, reduce fuel consumption, and maximize the efficiency of every delivery run — saving your depot money with every mile driven." />
                    <WhyUsItem index={2} isInView={isInView} icon={<Image src='/icons/building-07.svg' alt='icon' width={24} height={24} />} iconBG="linear-gradient(211.73deg, #F3F5FC 9.55%, #F2F0F4 80.9%)" title={"Increase reliability\n\at critical facilities"} subtitle="Ensure that hospitals, care homes, and essential services never face fuel shortages, giving your customers complete peace of mind and building long-term trust" />
                    <WhyUsItem index={3} isInView={isInView} icon={<Image src='/icons/clock-check.svg' alt='icon' width={24} height={24} />} iconBG="linear-gradient(203.58deg, #EEF7F1 15.19%, #EAF2F7 91.35%)" title={"Boost efficiency\n\with real-time data"} subtitle="Plan optimized delivery schedules based on live tank information, combining multiple stops into one run and transforming daily logistics into smooth operations" />
                    <WhyUsItem index={4} isInView={isInView} icon={<Image src='/icons/bar-line-chart.svg' alt='icon' width={24} height={24} />} iconBG="linear-gradient(205.6deg, #F3F9EB 11.6%, #F9F0F0 83.8%)" title={"Predict with confidence,\n\stay ahead always"} subtitle="Move from reactive to proactive planning by knowing tank levels before customers even call, ensuring your business is always one step ahead of demand" />
                </div>
            </div>
            <div className="col-span-2 lg:flex hidden" />
            <div className="col-span-5 lg:flex hidden flex-col gap-4 relative overflow-hidden h-full"
                style={{
                    background: 'url("/why_us.png") center center / cover no-repeat',
                }}
            />
        </motion.div>
    )
}

export default BWhyUs