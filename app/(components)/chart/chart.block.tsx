'use client'

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import ChartBG from "./chart-background"
import CEfficient from "./chart-efficient"
import CMonthly from "./chart-monthly"

const BChart = () => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const small = useMediaQuery('(max-width: 768px)')

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? {
                opacity: 1,
            } : {}}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'linear'
            }}
            className="md:snap-start snap-none w-full grid grid-cols-2 items-center min-h-dvh justify-end relative" ref={ref}>
            <CMonthly />
            <CEfficient />


            {small ? null : <ChartBG isInView={isInView} />}
        </motion.div>
    )
}

export default BChart