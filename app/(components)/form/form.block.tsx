'use client'

import { useProgressStore } from "@/stores/general.store";
import GForm from "./form-general"
import { motion, useInView } from "motion/react";
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts";

const BForm = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef(null)
    const isInView = useInView(ref)
    const small = useMediaQuery('(max-width: 768px)')

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: small ? 1 : 0,
                zIndex: small ? '-50' : 50
            }}
            animate={isInView && (progress === index || small) ? {
                opacity: 1,
                zIndex: 50
            } : {
                zIndex: '-50'
            }}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'linear'
            }}
            className="relative md:fixed md:inset-0 snap-normal md:snap-start transition-all duration-700 w-full flex items-center min-h-dvh h-full flex-col pb-10 justify-center overflow-hidden"
            style={{
                background: 'url("/backgrounds/form-bg.svg") center center / cover no-repeat',
            }}
        >
            <div className="flex-1" />
            <div className="flex flex-col items-center w-full mb-ds-[60] gap-2">
                <h5 className="text-transparent text-center bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] uppercase font-medium text-sm md:text-ds-[16]">No more guesswork</h5>
                <h2 className="text-xl md:text-ds-[36] font-medium leading-[95%] text-[#111111] text-center mt-ds-[16] mb-ds-[20] whitespace-pre-wrap">{'Ready to transform\nyour oil delivery?'}</h2>
                <p className="text-xs md:text-ds-[14] text-center text-[#111111] opacity-50 font-normal leading-snug tracking-normal whitespace-pre-wrap">{'Stop firefighting emergencies. Start\nplanning profitable runs. With SpecGauge,\nyou’ll always know before they’re low.'}</p>
            </div>
            <GForm />
            <div className="flex-1" />
            <h6 className="text-xs text-[#111111]">© SpecGauge. All rights reserved.</h6>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            </div>
        </motion.div>
    )
}

export default BForm