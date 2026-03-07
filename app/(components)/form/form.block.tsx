'use client'

import { useProgressStore } from "@/stores/general.store";
import GForm from "./form-general"
import { motion, useInView } from "motion/react";
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts";

const BForm = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')

    const active = progress === index || small;
    const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const childVariants = {
        active: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 50, scale: 1.05 },
    }

    const subtitleVariants = {
        active: { opacity: 0.5, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 50, scale: 1.05 },
    }

    return (
        <motion.div
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
            id="request_demo"
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full flex items-center h-[100vh] min-h-[950px] md:min-h-auto flex-col pb-[25px] md:pb-ds-[40] pt-20 md:pt-0 justify-center overflow-hidden"
            style={{
                background: small ? 'url("/backgrounds/form-bg_mobile.svg") bottom left / cover no-repeat' : 'url("/backgrounds/form-bg.svg") center center / cover no-repeat',
            }}
        >
            <div className="flex-1" />
            <div className="flex flex-col items-center w-full mb-[50px] sm:mb-ds-[60] gap-2">
                <motion.h5
                    variants={childVariants}
                    transition={{
                        duration: 0.8,
                        delay: .1,
                        ease: premiumEasing
                    }} className="text-transparent text-center bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] uppercase font-medium text-sm sm:text-ds-[16]">No more guesswork</motion.h5>
                <motion.h2
                    variants={childVariants}
                    transition={{
                        duration: 1,
                        delay: .2,
                        ease: premiumEasing
                    }} className="text-[32px] sm:text-ds-[36] font-medium leading-[95%] text-[#111111] text-center mt-[15px] sm:mt-ds-[16] mb-[25px] sm:mb-ds-[20] whitespace-pre-wrap">{'Ready to transform\nyour oil delivery?'}</motion.h2>
                <motion.p
                    variants={subtitleVariants}
                    transition={{
                        duration: 1.2,
                        delay: .3,
                        ease: premiumEasing
                    }} className="w-[246px] md:w-full text-sm sm:text-ds-[14] text-center text-[#111111] opacity-50 font-normal leading-snug tracking-normal md:whitespace-pre-wrap">{'Stop firefighting emergencies. Start\nplanning profitable runs. With SpecGauge,\nyou’ll always know before they’re low.'}</motion.p>
            </div>
            <GForm />
            <div className="flex-1" />
            <motion.h6
                variants={childVariants}
                transition={{
                    duration: 0.8,
                    delay: .4,
                    ease: premiumEasing
                }} className="text-xs sm:text-ds-[12] text-[#111111] mt-[100px] sm:mt-0">© SpecGauge. All rights reserved.</motion.h6>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            </div>
        </motion.div >
    )
}

export default BForm