'use client'

import { Slider } from "@/components/general/slider";
import { useProgressStore } from "@/stores/general.store";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";


const BSlider = ({ index }: { index: number }) => {
    const { progress, sections, setProgress } = useProgressStore()
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')
    const isInView = useInView(ref, {
        once: small
    })

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: small ? 1 : 0,
                pointerEvents: 'none'
            }}
            animate={isInView && (progress === index || small) ? {
                opacity: 1,
                pointerEvents: 'auto'
            } : {}}
            transition={{
                duration: .8,
                ease: 'easeIn'
            }}
            id="slider"
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full h-[100vh] overflow-hidden flex items-end"
            style={{
                background: small ? `url('/backgrounds/slider-bg_mobile.svg') center center / cover no-repeat` : `url('/backgrounds/slider-bg.svg') center center / cover no-repeat`,
            }}>
            <Slider slides={[
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_1.png",
                    imageMobile: "/slide_1_Mobile.png",
                    imageSize: 'mx-auto max-w-9/10 sm:max-w-8/10 md:mt-auto md:ml-auto md:max-w-[50vw]',
                },
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_2.png",
                    imageMobile: "/slide_2_mobile.png",
                    imageSize: 'max-w-8/10 md:mt-auto ml-auto md:max-w-[55vw]',
                    button: {
                        title: 'Request a demo',
                        onClick: () => setProgress(sections - 1)
                    }
                },
            ]} scrollers={[
                { id: 1, title: "High-Accuracy\n\pressure sensor\n\for every tank" },
                { id: 2, title: "Real-Time\n\Insights Across\n\All Depots" },
            ]}
                pageIndex={index}
            />
        </motion.div>
    )
}

export default BSlider