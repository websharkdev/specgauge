'use client'

import { Slider } from "@/components/general/slider";
import { useProgressStore } from "@/stores/general.store";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";


const BSlider = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
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
                duration: .5,
                delay: .2,
                ease: 'linear'
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
                    imageSize: 'max-w-9/10 sm:max-w-[60vw] lg:max-w-[45vw] mx-auto mb-auto lg:mb-0 mt-10 lg:mt-auto',
                },
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_2.png",
                    imageMobile: "/slide_2_mobile.png",
                    imageSize: 'max-w-9/10 sm:max-w-[60vw] lg:max-w-[50vw] ml-auto mb-auto lg:mb-0 mt-10 lg:mt-auto',
                    button: {
                        title: 'Request a demo',
                        link: '#'
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