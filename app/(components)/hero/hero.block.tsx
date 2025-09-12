'use client'

import { motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useProgressStore } from "@/stores/general.store";


const BHero = ({ index }: { index: number }) => {
    const { setProgress, sections, progress } = useProgressStore()
    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <motion.div ref={ref}
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
            className="fixed inset-0 transition-all duration-700 bg-white snap-start w-full h-full min-h-dvh flex justify-between items-center max-h-dvh overflow-hidden">
            <div className="md:w-1/2 w-full h-full min-h-dvh flex relative flex-col justify-end gap-7 xl:gap-5 lg:gap-4 xs:gap-0" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                padding: 'calc(var(--index) * 45 / 23.4)'
            }}>
                <Image
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={1158}
                    height={652}
                    className="md:hidden xs:flex max-w-[328px] object-contain"
                    priority
                />
                <div className="pb-11 px-3.5 pt-0 w-full h-full flex relative flex-col justify-end gap-8 xl:gap-5 lg:gap-4 sm:gap-3 xs:gap-2">
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

                        <Badge variant='outline' className="rounded-full flex items-center gap-2 p-2 mb-5 text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                            <BadgeCheck size={16} />
                            <span className="text-xs leading-[90%] font-poppins">Beta version is Live!</span>
                        </Badge>
                    </motion.div>
                    <h1 className="2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl flex flex-col leading-[95%] font-medium font-mona_sans"
                    >
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
                        }} className="text-white/50 max-w-[322px] leading-5 font-normal whitespace-pre-wrap text-sm"
                    >{'SpecGauge turns every tank into a connected\ndata source – helping you deliver smarter,\nfaster, and more profitably.'}</motion.p>
                    <div className="flex justify-between items-center w-full mt-2.5">
                        <Button className="cursor-pointer w-[177px]" variant='secondary'>
                            <span className="font-medium leading-[90%] text-base ">Request a Demo</span>
                        </Button>

                        <Button onClick={() => setProgress(sections - 1)} size='icon' variant='glass' className="size-10 text-white rounded-full cursor-pointer border-white/10 bg-white/5">
                            <ArrowDownIcon size={19} />
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
                    className="object-contain"
                    style={{
                        maxWidth: 'calc(var(--index) * 1158/2 / 23.4)'
                    }}
                    priority
                />
                <div className="flex-1" />
            </div>
        </motion.div>
    )
}

export default BHero