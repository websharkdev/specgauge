'use client'

import { Slider } from "@/components/general/slider"


const BSlider = () => {
    return (
        <div className="w-full h-dvh relative max-h-dvh overflow-hidden flex items-end"
            style={{
                background: 'url("/backgrounds/slider-bg.svg") center center / cover no-repeat',
            }}>
            <Slider slides={[
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_1.png",
                },
                {
                    title: "Two parts. \n\One smart solution.",
                    description: "SpecGauge combines rugged hardware and a powerful web portal to give you real-time visibility and smarter delivery planning",
                    image: "/slide_2.png",
                    button: {
                        title: 'Request a demo',
                        link: '#'
                    }
                },
            ]} scrollers={[
                { id: 1, title: "High-Accuracy pressure sensor for every tank" },
                { id: 2, title: "Real-Time Insights Across All Depots" },
            ]} />
        </div>
    )
}

export default BSlider