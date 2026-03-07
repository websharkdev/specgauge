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
    index
}: {
    icon: React.ReactNode,
    iconBG: string
    title: string,
    subtitle: string
    index: number
}) => {
    const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const childVariants = {
        active: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 20, scale: 1.05 },
    }

    const subtitleVariants = {
        active: { opacity: 0.5, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 20, scale: 1.05 },
    }

    return <div className="flex gap-3 md:gap-4">
        <motion.div
            variants={childVariants}
            transition={{
                duration: .8,
                delay: .85 + index * 0.4,
                ease: premiumEasing
            }}
            className={`size-10 md:size-ds-[48] rounded-lg flex justify-center items-center`}
            style={{
                background: iconBG
            }}>
            {icon}
        </motion.div>
        <div className="flex flex-col gap-2.5 sm:gap-ds-[10] flex-1">
            <motion.h3
                variants={childVariants}
                transition={{
                    duration: .8,
                    delay: .85 + index * 0.4,
                    ease: premiumEasing
                }}
                className="text-[18px] sm:text-ds-[22] font-medium whitespace-pre leading-[110%]">{title}</motion.h3>
            <motion.h6
                variants={subtitleVariants}
                transition={{
                    duration: .8,
                    delay: .85 + index * 0.4,
                    ease: premiumEasing
                }}
                className="text-sm sm:text-ds-[14] text-[#111111] leading-snug">{subtitle}</motion.h6>
        </div>
    </div>
}

const BWhyUs = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')

    const active = progress === index || small;
    const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const headerVariants = {
        active: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 50, scale: 1.02 },
    }

    return (
        <motion.div
            id="advantages"
            ref={ref}
            variants={{
                active: {
                    opacity: 1,
                    pointerEvents: 'auto',
                    visibility: 'visible'
                },
                hidden: {
                    opacity: 0,
                    pointerEvents: 'none',
                    visibility: 'hidden'
                }
            }}
            initial="hidden"
            animate={active ? 'active' : 'hidden'}
            transition={{
                duration: 1,
                ease: premiumEasing
            }}
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full grid grid-cols-10 items-center min-h-dvh justify-end">
            <div className="lg:col-span-5 col-span-full flex flex-col relative overflow-hidden h-max justify-between py-14 sm:pt-ds-[65] sm:pb-ds-[25] sm:px-ds-[80] px-3.5 gap-[25px] sm:gap-ds-[40]">
                <div className="flex flex-col gap-3.5 sm:gap-ds-[14]">
                    <motion.h5
                        variants={headerVariants}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: premiumEasing,
                        }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] text-sm sm:text-ds-[14] uppercase font-medium">Real-Time Advantage</motion.h5>
                    <motion.h2
                        variants={headerVariants}
                        transition={{
                            duration: 1.2,
                            delay: 0.6,
                            ease: premiumEasing
                        }}
                        className="text-[32px] sm:text-ds-[36] font-medium leading-[95%] text-[#111111] sm:whitespace-pre-wrap w-full">{`Why oil companies choose\nSpecGauge`}</motion.h2>
                </div>
                <div className="md:flex-1" />
                <div className="flex flex-col gap-5 sm:gap-ds-[24]">
                    <WhyUsItem index={1} icon={<Image src='/icons/coins-hand.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(205.6deg, #EBF3F9 11.6%, #F9F0F0 83.8%)" title={"Save costs\n\on every delivery"} subtitle="Cut wasted trips, reduce fuel consumption, and maximize the efficiency of every delivery run — saving your depot money with every mile driven." />
                    <WhyUsItem index={2} icon={<Image src='/icons/building-07.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(211.73deg, #F3F5FC 9.55%, #F2F0F4 80.9%)" title={"Increase reliability\n\at critical facilities"} subtitle="Ensure that hospitals, care homes, and essential services never face fuel shortages, giving your customers complete peace of mind and building long-term trust" />
                    <WhyUsItem index={3} icon={<Image src='/icons/clock-check.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(203.58deg, #EEF7F1 15.19%, #EAF2F7 91.35%)" title={"Boost efficiency\n\with real-time data"} subtitle="Plan optimized delivery schedules based on live tank information, combining multiple stops into one run and transforming daily logistics into smooth operations" />
                    <WhyUsItem index={4} icon={<Image src='/icons/bar-line-chart.svg' alt='icon' width={24} className="size-5 sm:w-ds-[20] sm:h-ds-[20]" height={24} />} iconBG="linear-gradient(205.6deg, #F3F9EB 11.6%, #F9F0F0 83.8%)" title={"Predict with confidence,\n\stay ahead always"} subtitle="Move from reactive to proactive planning by knowing tank levels before customers even call, ensuring your business is always one step ahead of demand" />
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