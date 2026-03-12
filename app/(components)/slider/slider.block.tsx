'use client'

import { Slider } from "@/components/general/slider";
import { useProgressStore } from "@/stores/general.store";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";


const BSlider = ({ index }: { index: number }) => {
    const { progress, sections, setProgress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const small = useMediaQuery('(max-width: 768px)', {
        defaultValue: false,
        initializeWithValue: false,
    })
    const active = progress === index || small;

    return (
        <div
            ref={ref}
            id="slider"
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full h-dvh md:h-screen min-h-dvh md:min-h-[950px] overflow-hidden flex items-end"
            style={{
                background: small ? `url('/backgrounds/slider-bg_mobile.svg') center center / cover no-repeat` : `url('/backgrounds/slider-bg.svg') center center / cover no-repeat`,
            }}>
            <Slider slides={[
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_1.png",
                    imageMobile: "/slide_1_Mobile.png",
                    imageSize: 'mx-auto max-w-9/10 sm:max-w-8/10 sm:mt-auto sm:mr-0 sm:ml-auto md:max-w-9/10 xl:max-w-[50vw] md:mr-10',
                },
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_2.png",
                    imageMobile: "/slide_2_mobile.png",
                    imageSize: 'max-w-[96vw] md:mt-auto ml-auto md:max-w-[55vw] 2xl:max-w-full w-full',
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
        </div>
    )
}

export default BSlider
