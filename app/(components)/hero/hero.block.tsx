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
                ease: 'easeIn'
            }}
            className="relative md:fixed md:inset-0 transition-all duration-700 bg-white snap-normal md:snap-start w-full h-auto min-h-vh flex justify-between items-center overflow-hidden">
            <div className="md:w-1/2 w-full h-auto min-h-vh flex relative flex-col justify-end gap-7 xl:gap-5 lg:gap-4 xs:gap-0 md:p-ds-[45] pt-[60px] md:pt-0 px-0 py-ds-[40]" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: .5,
                        delay: .1,
                        ease: 'easeIn'
                    }}
                    className="md:hidden xs:flex">
                    <Image
                        src='/main-devices.png'
                        alt='Main Devices'
                        width={405}
                        height={383}
                        className="object-contain max-w-[77%] aspect-[329/368]"
                        priority
                    />
                </motion.div>
                <div className="pb-ds-[42] px-3.5 md:px-0 pt-0 w-full h-max md:h-full flex relative flex-col justify-end gap-6 md:gap-ds-[32]">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? {
                            opacity: 1,
                            y: 0,
                        } : {}}
                        transition={{
                            duration: .6,
                            delay: 0.1,
                            ease: 'easeIn'
                        }}
                        className="hidden md:flex"
                    >

                        <Badge variant='outline' className="rounded-full flex items-center gap-2 md:gap-ds-[4] p-2 md:py-ds-[10] md:px-ds-[15] mb-ds-[20] text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                            <BadgeCheck className="size-[13px] md:!size-ds-[13]" />
                            <span className="text-xs md:text-ds-[12] leading-[90%] font-poppins">Beta version is Live!</span>
                        </Badge>
                    </motion.div>
                    <h1 className="inline xl:flex flex-col leading-[95%] font-medium font-mona_sans 2xl:text-ds-[52] xl:text-ds-[46] lg:text-ds-[42] md:text-ds-[30] text-[40px]"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0,
                            } : {}}
                            transition={{
                                duration: .8,
                                delay: 0.2,
                                ease: 'easeIn'
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
                                delay: .3,
                                ease: 'easeIn'
                            }}
                            className="text-white/60">{small ? ' ' : ''}stay ahead every time</motion.span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? {
                            opacity: 1,
                            y: 0,
                        } : {}}
                        transition={{
                            duration: 1.3,
                            delay: .4,
                            ease: 'easeIn'
                        }} className="text-white/50 leading-snug font-normal md:whitespace-pre-wrap text-base sm:text-ds-[14]"
                    >{'SpecGauge turns every tank into a connected\ndata source – helping you deliver smarter,\nfaster, and more profitably.'}</motion.p>
                    <div className="flex justify-between items-center w-full mt-2.5">
                        <Button className="cursor-pointer w-[177px] md:w-ds-[177] h-10 md:h-ds-[39]" variant='secondary'>
                            <span className="font-medium leading-[90%] text-base md:text-ds-[16]">Request a Demo</span>
                        </Button>

                        <Button onClick={() => setProgress(sections - 1)} size='icon' variant='glass' className="size-10 md:size-ds-[40] text-white rounded-full cursor-pointer border-white/10 bg-white/5">
                            <ArrowDownIcon className="size-[19px] md:!size-ds-[19]" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full min-h-dvh hidden md:flex justify-start items-center relative">
                <div className="absolute inset-0 -z-[5] h-full w-full bg-[#E5E8EF] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_6%,transparent_110%)]"></div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-[#E5E8EF] bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:55px_55px]"></div>
                <div className="pr-8">
                    <Image
                        src='/main-devices.png'
                        alt='Main Devices'
                        width={783}
                        height={730}
                        className="object-contain max-w-8/10 md:max-w-ds-[700] w-full"
                        priority
                    />
                </div>
                <div className="flex-1" />
            </div>
        </motion.div>
    )
}

export default BHero