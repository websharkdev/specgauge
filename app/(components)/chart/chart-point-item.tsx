'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useMediaQuery } from 'usehooks-ts'

type Props = {
    color: {
        line: string[],
        point: string,
    }
    direction: 'left' | 'right'
    icon: React.ReactNode
    title: string,
    index: number
}

const ChartPointItem = ({
    color,
    icon,
    title,
    direction = 'left',
    index
}: Props) => {
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')
    const isInView = useInView(ref, {
        once: small
    })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, }}
            animate={isInView ? {
                opacity: 1,
            } : {}}
            transition={{
                duration: .5,
                delay: .2 + index * .5 + .5,
                ease: 'linear'
            }} className="flex flex-nowrap items-start gap-3">
            {direction === 'left' ? <div className={`flex flex-nowrap items-center min-w-10 gap-0 mt-1`}>
                <div className='flex-1 h-0.5' style={{
                    background: `linear-gradient(to left, ${color.line[0]}, ${color.line[1]})`,
                }} />
                <div className='size-2.5 rounded-full' style={{
                    backgroundColor: color.point,
                }} />
            </div> : null}
            <div className={`flex flex-col gap-2 flex-1 ${direction === 'right' ? 'ml-12 md:ml-16' : ''}`}>
                <div className="flex flex-nowrap items-start gap-3 w-full">
                    {icon}
                    {direction === 'right' ? <div className={`flex flex-nowrap items-center w-full gap-0 mt-1`}>
                        <div className='flex-1 h-0.5' style={{
                            background: `linear-gradient(to right, ${color.line[0]}, ${color.line[1]})`,
                            order: 10,
                        }} />
                        <div className='size-2.5 rounded-full' style={{
                            backgroundColor: color.point,
                        }} />
                    </div> : null}
                </div>
                <h4 className="font-medium text-base text-gray-700 max-w-full leading-[90%] whitespace-pre-wrap">{title}</h4>
            </div>
        </motion.div>
    )
}

export default ChartPointItem