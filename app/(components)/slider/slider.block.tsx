'use client'

import { Slider } from "@/components/general/slider"
import { motion, useInView } from "motion/react";
import { useRef } from "react"


const BSlider = () => {
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
            className="snap-start w-full h-dvh relative max-h-dvh overflow-hidden flex items-end"
            style={{
                background: 'url("/backgrounds/slider-bg.svg") center center / cover no-repeat',
            }}>
            <Slider slides={[
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_1.png",
                    imageMobile: "/slide_1_Mobile.png",
                    imageSize: '!bg-center',
                },
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_2.png",
                    imageMobile: "/slide_2.png",
                    button: {
                        title: 'Request a demo',
                        link: '#'
                    }
                },
            ]} scrollers={[
                { id: 1, title: "High-Accuracy\n\pressure sensor\n\for every tank" },
                { id: 2, title: "Real-Time\n\Insights Across\n\All Depots" },
            ]} />
        </motion.div>
    )
}

export default BSlider