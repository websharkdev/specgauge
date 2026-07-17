'use client'

import { Slider } from "@/components/general/slider";
import { useProgressStore } from "@/stores/general.store";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { scrollToSection } from "@/hooks/useScrollToSection";


const BSlider = ({ index }: { index: number }) => {
    const { sections, setProgress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const small = useMediaQuery('(max-width: 1023px)', {
        defaultValue: false,
        initializeWithValue: false,
    })

    const navigateTo = (idx: number, id: string) => {
        if (small) {
            scrollToSection(id)
        } else {
            setProgress(idx)
        }
    }

    return (
        <div
            ref={ref}
            id="slider"
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full max-w-full h-auto min-h-0 lg:h-screen lg:min-h-[950px] overflow-visible lg:overflow-hidden flex items-end"
            style={{
                background: small ? `url('/backgrounds/slider-bg_mobile.svg') center center / cover no-repeat` : `url('/backgrounds/slider-bg.svg') center center / cover no-repeat`,
            }}>
            <Slider slides={[
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_1.png",
                    imageMobile: "/slide_1_Mobile.png",
                    imageAspect: "1800/2044",
                    imageSize: 'mx-auto max-w-9/10 sm:max-w-8/10 sm:mt-auto lg:mr-0 lg:ml-auto xl:max-w-[50vw] lg:mr-10',
                },
                {
                    title: "Advanced sensors,\n\effortless installation.",
                    description: "Our high-precision pressure sensors install in minutes without tank modifications, providing ±0.5% accuracy for any fuel type.",
                    image: "/slide_2.png",
                    imageMobile: "/slide_2_Mobile.png",
                    imageAspect: "2090/1824",
                    imageSize: 'mt-auto ml-auto max-w-[55vw] 2xl:max-w-full w-full',
                    button: {
                        title: 'Request a demo',
                        onClick: () => navigateTo(sections - 1, 'request_demo')
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
