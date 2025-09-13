'use client'

import { motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useProgressStore } from "@/stores/general.store";
import { useMediaQuery } from "usehooks-ts";


const BHero = ({ index }: { index: number }) => {
    const { setProgress, sections, progress } = useProgressStore()
    const ref = useRef(null)
    const small = useMediaQuery('(max-width: 768px)')
    const isInView = useInView(ref, {
        once: small
    })

    return (
        <motion.div ref={ref}
            initial={{
                opacity: small ? 1 : 0,
                zIndex: small ? '-50' : 50
            }}
            animate={isInView && (progress === index || small) ? {
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
            className="relative md:fixed md:inset-0 transition-all duration-700 bg-white snap-normal md:snap-start w-full h-full min-h-dvh flex justify-between items-center max-h-dvh overflow-hidden">
            <div className="md:w-1/2 w-full h-full min-h-dvh flex relative flex-col justify-end gap-7 xl:gap-5 lg:gap-4 xs:gap-0 md:p-ds-[45] px-0 py-ds-[40]" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Image
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={405}
                    height={383}
                    className="md:hidden xs:flex object-contain max-w-ds-[405]"
                    priority
                />
                <div className="pb-ds-[42] px-3.5 pt-0 w-full h-max md:h-full flex relative flex-col justify-end gap-ds-[32]">
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

                        <Badge variant='outline' className="rounded-full flex items-center gap-2 p-2 mb-ds-[20] text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                            <BadgeCheck size={16} />
                            <span className="text-xs leading-[90%] font-poppins">Beta version is Live!</span>
                        </Badge>
                    </motion.div>
                    <h1 className="flex flex-col leading-[95%] font-medium font-mona_sans 2xl:text-ds-[52] xl:text-ds-[46] lg:text-ds-[42] md:text-ds-[30] text-ds-[52]"
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
                        }} className="text-white/50 leading-snug font-normal whitespace-pre-wrap text-xs sm:text-ds-[14]"
                    >{'SpecGauge turns every tank into a connected\ndata source – helping you deliver smarter,\nfaster, and more profitably.'}</motion.p>
                    <div className="flex justify-between items-center w-full mt-2.5">
                        <Button className="cursor-pointer w-[177px] sm:w-ds-[177] h-10 sm:h-ds-[39]" variant='secondary'>
                            <span className="font-medium leading-[90%] text-sm sm:text-ds-[16]">Request a Demo</span>
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
                    width={783}
                    height={730}
                    className="object-contain max-w-8/10 xl:max-w-[80dvh]"
                    priority
                />
                <div className="flex-1" />
            </div>
        </motion.div>
    )
}

export default BHero