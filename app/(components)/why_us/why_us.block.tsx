'use client'

import { Building2, ChartNoAxesCombined, ClockPlus, HandCoins } from "lucide-react"
import Image from "next/image"

const WhyUsItem = ({
    icon,
    iconBG = '',
    title,
    subtitle
}: {
    icon: React.ReactNode,
    iconBG: string
    title: string,
    subtitle: string
}) => {
    return <div className="flex gap-4">
        <div className={`size-12 rounded-lg flex justify-center items-center`}
            style={{
                background: iconBG
            }}>
            {icon}
        </div>
        <div className="flex flex-col gap-2.5 max-w-xl">
            <h3 className="text-xl font-medium whitespace-pre">{title}</h3>
            <h6 className="text-sm leading-snug text-[#111111] opacity-50">{subtitle}</h6>
        </div>
    </div>
}

const BWhyUs = () => {
    return (
        <div className="w-full grid grid-cols-12 items-center min-h-dvh justify-end relative">
            <div className="col-span-5 flex flex-col relative overflow-hidden h-max justify-between pl-20 gap-20">
                <div className="flex flex-col gap-4 max-w-lg">
                    <h5 className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49]">Real-Time Advantage</h5>
                    <h2 className="text-4xl font-medium leading-snug text-[#111111]">Why oil companies choose SpecGauge</h2>
                </div>
                <div className="flex flex-col gap-12">
                    <WhyUsItem icon={<HandCoins size={24} color="#111111" />} iconBG="linear-gradient(205.6deg, #EBF3F9 11.6%, #F9F0F0 83.8%)" title={"Save costs\n\on every delivery"} subtitle="Cut wasted trips, reduce fuel consumption, and maximize the efficiency of every delivery run — saving your depot money with every mile driven." />
                    <WhyUsItem icon={<Building2 size={24} color="#111111" />} iconBG="linear-gradient(211.73deg, #F3F5FC 9.55%, #F2F0F4 80.9%)" title={"Increase reliability\n\at critical facilities"} subtitle="Ensure that hospitals, care homes, and essential services never face fuel shortages, giving your customers complete peace of mind and building long-term trust" />
                    <WhyUsItem icon={<ClockPlus size={24} color="#111111" />} iconBG="linear-gradient(203.58deg, #EEF7F1 15.19%, #EAF2F7 91.35%)" title={"Boost efficiency\n\with real-time data"} subtitle="Plan optimized delivery schedules based on live tank information, combining multiple stops into one run and transforming daily logistics into smooth operations" />
                    <WhyUsItem icon={<ChartNoAxesCombined size={24} color="#111111" />} iconBG="linear-gradient(205.6deg, #F3F9EB 11.6%, #F9F0F0 83.8%)" title={"Predict with confidence,\n\stay ahead always"} subtitle="Move from reactive to proactive planning by knowing tank levels before customers even call, ensuring your business is always one step ahead of demand" />
                </div>
            </div>
            <div className="col-span-2" />
            <div className="col-span-5 flex flex-col gap-4 relative overflow-hidden h-full"
                style={{
                    background: 'url("/why_us.png") center center / cover no-repeat',
                }}
            />
        </div>
    )
}

export default BWhyUs