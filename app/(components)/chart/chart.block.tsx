'use client'

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChartBG from "./chart-background"
import CEfficient from "./chart-efficient"
import CMonthly from "./chart-monthly"
import { useProgressStore } from "@/stores/general.store"

const BChart = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef(null)
    const isInView = useInView(ref)
    const small = useMediaQuery('(max-width: 768px)')

    return (
        <motion.div
            initial={{
                opacity: 0,
                zIndex: '-50'
            }}
            animate={isInView && progress === index ? {
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
            className="fixed inset-0 transition-all duration-700 md:snap-start snap-none w-full grid grid-cols-2 items-center min-h-dvh justify-end" ref={ref}>
            <CMonthly index={index} />
            <CEfficient index={index} />


            {small ? null : <ChartBG isInView={isInView} />}
        </motion.div>
    )
}

export default BChart