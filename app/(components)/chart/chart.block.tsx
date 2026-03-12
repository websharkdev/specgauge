'use client'

import { useProgressStore } from "@/stores/general.store"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChartBG from "./chart-background"
import CEfficient from "./chart-efficient"
import CMonthly from "./chart-monthly"

const BChart = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const small = useMediaQuery('(max-width: 768px)', {
        defaultValue: false,
        initializeWithValue: false,
    })

    const active = progress === index || small;

    useGSAP(() => {
        // Since BChart is a container for the two sides (CMonthly and CEfficient), 
        // the main animations happen inside those children with their own useGSAP hooks.
    }, { dependencies: [active], scope: ref })

    return (
        <div
            className={`static sm:relative lg:fixed lg:inset-0 md:snap-start snap-none w-full grid grid-cols-2 items-center h-[100vh] justify-end overflow-hidden`}
            id="pain_point" ref={ref}>
            <CMonthly index={small ? 1 : index} />
            <CEfficient index={small ? 2 : index} />

            {small ? null : <ChartBG active={active} />}
        </div>
    )
}

export default BChart
