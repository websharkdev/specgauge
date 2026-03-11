'use client'

import { motion } from 'motion/react'
import { useRef } from 'react'

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
    const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    return (
        <motion.div
            ref={ref}
            variants={{
                active: { opacity: 1, x: 0, scale: 1 },
                hidden: { opacity: 0, x: direction === 'left' ? -20 : 20, scale: 0.95 }
            }}
            transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.1,
                ease: premiumEasing
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