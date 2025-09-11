'use client'

import GForm from "./form-general"
import { motion, useInView } from "motion/react";
import { useRef } from "react"

const BForm = () => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, }}
            animate={isInView ? {
                opacity: 1,
            } : {}}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'easeIn'
            }}
            className="snap-start w-full flex items-center min-h-dvh h-full flex-col pb-10 justify-center relative overflow-hidden"
            style={{
                background: 'url("/backgrounds/form-bg.svg") center center / cover no-repeat',
            }}
        >
            <div className="flex-1" />
            <div className="flex flex-col items-center max-w-sm h-full w-full mb-20">
                <h5 className="text-transparent text-center bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] uppercase font-medium">No more guesswork</h5>
                <h2 className="text-4xl font-medium leading-[95%] text-[#111111] text-center mt-4 mb-5">Ready to transform your oil delivery?</h2>
                <p className="text-sm text-center text-[#111111] opacity-50 max-w-72 leading-4">Stop firefighting emergencies. Start planning profitable runs. With SpecGauge, you’ll always know before they’re low.</p>
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