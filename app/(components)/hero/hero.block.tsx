'use client'

import { motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";


const BHero = () => {
    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, }}
            animate={isInView ? {
                opacity: 1,
            } : {}}
            transition={{
                duration: .5,
                delay: .2,
                ease: 'easeIn'
            }}
            className="snap-start w-full h-full min-h-dvh relative flex justify-between items-center max-h-dvh overflow-hidden">
            <div className="md:w-1/2 w-full h-full min-h-dvh flex relative flex-col justify-end md:p-11 gap-7 xl:gap-5 lg:gap-4 xs:gap-0" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Image
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={1158}
                    height={652}
                    className="md:hidden xs:flex max-w-[328px] object-contain"
                    priority
                />
                <div className="pb-11 px-3.5  pt-0 w-full h-full flex relative flex-col justify-end gap-7 xl:gap-5 lg:gap-4 sm:gap-3 xs:gap-2">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? {
                            opacity: 1,
                            y: 0,
                        } : {}}
                        transition={{
                            duration: .6,
                            delay: 0.1,
                            ease: [0, 0.71, 0.3, 1.01],
                        }}>

                        <Badge variant='outline' className="rounded-full flex items-center gap-2 px-2 py-1.5 mb-2.5 text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                            <BadgeCheck size={14} />
                            <span className="text-xs leading-[90%]">Beta version is Live!</span>
                        </Badge>
                    </motion.div>
                    <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl flex flex-col leading-[95%] font-medium">
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0,
                            } : {}}
                            transition={{
                                duration: .8,
                                delay: 0.7,
                                ease: [0, 0.71, 0.3, 1.01],
                            }}
                            className="text-white">Know before they’re low,</motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0,
                            } : {}}
                            transition={{
                                duration: 1,
                                delay: 1.3,
                                ease: [0, 0.71, 0.3, 1.01],
                            }}
                            className="text-white/60">stay ahead every time</motion.span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? {
                            opacity: 1,
                            y: 0,
                        } : {}}
                        transition={{
                            duration: 1.3,
                            delay: 1.8,
                            ease: [0, 0.71, 0.3, 1.01],
                        }} className="text-white/50 max-w-xs text-base lg:text-sm xs:text-xs leading-[110%]">SpecGauge turns every tank into a connected data source – helping you deliver smarter, faster, and more profitably.</motion.p>
                    <div className="flex justify-between items-center w-full mt-2.5">
                        <Button className="max-w-max cursor-pointer w-[177px] font-medium text-base leading-[90%]" variant='secondary'>Request a Demo</Button>

                        <Button onClick={() => window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: 'smooth'
                        })} size='icon' variant='glass' className="size-10 text-white rounded-full cursor-pointer">
                            <ArrowDownIcon size={14} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full min-h-dvh hidden md:flex justify-start items-center relative">
                <div className="absolute inset-0 -z-[5] h-full w-full bg-[#E5E8EF] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_6%,transparent_110%)]"></div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-[#E5E8EF] bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:55px_55px]"></div>
                <Image
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={1158}
                    height={652}
                    className="2xl:max-w-3xl xl:max-w-2xl lg:max-w-lg md:max-w-sm object-contain"
                    priority
                />
                <div className="flex-1" />
            </div>
        </motion.div>
    )
}

export default BHero