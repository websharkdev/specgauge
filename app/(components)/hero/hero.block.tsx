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

    const active = progress === index || small;

    const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const childVariants = {
        active: { opacity: 1, y: 0, scale: 1 },
        hidden: { opacity: 0, y: 40, scale: 1.05 },
    }

    return (
        <motion.div ref={ref}
            variants={{
                active: {
                    opacity: 1,
                    pointerEvents: 'auto',
                    visibility: 'visible'
                },
                hidden: {
                    opacity: 0,
                    pointerEvents: 'none',
                    visibility: 'hidden'
                }
            }}
            initial="hidden"
            animate={active ? 'active' : 'hidden'}
            transition={{
                duration: 1,
                ease: premiumEasing
            }}
            className="static sm:relative lg:fixed lg:inset-0 bg-white snap-normal md:snap-start w-full h-max md:h-[100vh] flex justify-between items-center overflow-hidden">
            <div className="md:w-1/2 w-full h-full flex relative z-10 flex-col justify-end gap-7 xl:gap-5 lg:gap-4 xs:gap-0 md:pb-ds-[40] md:pt-ds-[40] pt-10 pb-14 md:px-ds-[45] px-0" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}>
                <motion.div
                    variants={childVariants}
                    transition={{
                        duration: 0.8,
                        delay: .1,
                        ease: premiumEasing
                    }}
                    className="md:hidden xs:flex h-max">
                    <Image
                        src='/main-devices.png'
                        alt='Main Devices'
                        width={800}
                        height={800}
                        className="object-contain max-w-9/10 md:aspect-[329/368] h-max"
                        priority
                    />
                </motion.div>
                <div className="pb-ds-[42] px-3.5 md:px-0 pt-0 w-full h-max md:h-full flex relative flex-col justify-end gap-6 sm:gap-ds-[32]">
                    <motion.div
                        variants={childVariants}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: premiumEasing
                        }}
                        className="hidden md:flex"
                    >

                        <Badge variant='outline' className="rounded-full flex items-center gap-2 sm:gap-ds-[4] p-2 sm:py-ds-[10] sm:px-ds-[15] mb-ds-[20] text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                            <BadgeCheck className="size-[13px] sm:!size-ds-[13]" />
                            <span className="text-xs sm:text-ds-[12] leading-[90%] font-poppins">Beta version is Live!</span>
                        </Badge>
                    </motion.div>
                    <h1 className="inline xl:flex flex-col leading-[95%] font-medium font-mona_sans 2xl:text-ds-[52] xl:text-ds-[46] lg:text-ds-[42] sm:text-ds-[30] text-[40px]"
                    >
                        <motion.span
                            variants={childVariants}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                ease: premiumEasing
                            }}
                            className="text-white">Know before they’re low,</motion.span>
                        <motion.span
                            variants={childVariants}
                            transition={{
                                duration: 1.1,
                                delay: .4,
                                ease: premiumEasing
                            }}
                            className="text-white/60">{small ? ' ' : ''}stay ahead every time</motion.span>
                    </h1>
                    <motion.p
                        variants={childVariants}
                        transition={{
                            duration: 1.2,
                            delay: .5,
                            ease: premiumEasing
                        }} className="text-white/50 leading-snug font-normal sm:whitespace-pre-wrap text-base sm:text-ds-[14]"
                    >{'SpecGauge turns every tank into a connected\ndata source – helping you deliver smarter,\nfaster, and more profitably.'}</motion.p>
                    <div className="flex justify-between items-center w-full mt-2.5">
                        <motion.div
                            variants={childVariants}
                            transition={{
                                duration: 1.3,
                                delay: .6,
                                ease: premiumEasing
                            }}
                        >
                            <Button className="cursor-pointer w-[177px] sm:w-ds-[177] h-10 sm:h-ds-[39]" variant='secondary' onClick={() => setProgress(sections - 1)}>
                                <span className="font-medium leading-[90%] text-base sm:text-ds-[16]">Request a Demo</span>
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={childVariants}
                            transition={{
                                duration: 1.3,
                                delay: .7,
                                ease: premiumEasing
                            }}
                        >
                            <Button onClick={() => setProgress(sections - 1)} size='icon' variant='glass' className="size-10 sm:size-ds-[40] text-white rounded-full cursor-pointer border-white/10 bg-white/5">
                                <ArrowDownIcon className="size-[19px] sm:!size-ds-[19]" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full hidden md:flex justify-start items-center relative z-0 overflow-hidden">
                <div className="absolute inset-0 z-[5] h-full w-full bg-[#E5E8EF] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_6%,transparent_110%)]"></div>
                <div className="absolute inset-0 z-10 h-full w-full bg-[#E5E8EF] bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:55px_55px]"></div>
                <Image
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={926}
                    height={521}
                    className="object-contain max-w-8/10 sm:max-w-ds-[800] w-full z-20 relative md:absolute right-20"
                    priority
                />
                <div className="flex-1" />
            </div>
        </motion.div>
    )
}

export default BHero