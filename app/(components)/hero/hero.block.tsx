import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/stores/general.store";
import { ArrowDownIcon, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import MagneticButton from "@/components/ui/magnetic-button";
import { useMediaQuery } from "usehooks-ts";

const BHero = ({ index }: { index: number }) => {
    const { setProgress, sections, progress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const hasBeenInactiveRef = useRef(false)
    const [canAnimate, setCanAnimate] = useState(false)
    
    const small = useMediaQuery('(max-width: 768px)', {
        defaultValue: false,
        initializeWithValue: false,
    })
    const active = progress === index || small;

    useLayoutEffect(() => {
        if (!ref.current) return;

        if (active) {
            gsap.set(contentRef.current?.children || [], { y: 0, opacity: 1 });
            gsap.set(imgRef.current, { scale: 1, opacity: 1 });
            return;
        }

        hasBeenInactiveRef.current = true;
        setCanAnimate(true);
    }, [active]);

    useGSAP(() => {
        if (!active || !ref.current || !titleRef.current) return;

        if (!hasBeenInactiveRef.current || !canAnimate) {
            return;
        }

        let splitText: { chars: HTMLElement[] | null; revert: () => void } | null = null;
        let timeline: gsap.core.Timeline | null = null;
        let cancelled = false;

        void import("split-type").then(({ default: SplitType }) => {
            if (cancelled || !titleRef.current) return;

            splitText = new SplitType(titleRef.current, { types: "words,chars" });
            const chars = splitText.chars ?? [];

            gsap.set(chars, { y: 100, opacity: 0 });
            gsap.set(contentRef.current?.children || [], { y: 30, opacity: 0 });
            gsap.set(imgRef.current, { scale: 1.1, opacity: 0 });

            timeline = gsap.timeline({ defaults: { ease: "sine.inOut" } });

            timeline.to(chars, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.02,
            })
                .to(contentRef.current?.children || [], {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                })
                .to(imgRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 1.05,
                    ease: "sine.inOut"
                });
        });

        return () => {
            cancelled = true;
            timeline?.kill();
            splitText?.revert();
        };
    }, { dependencies: [active, canAnimate], scope: ref });

    return (
        <div ref={ref}
            className={`static sm:relative lg:fixed lg:inset-0 bg-white snap-normal md:snap-start w-full h-max md:h-[100vh] flex justify-between items-center overflow-hidden`}>
            <div className="md:w-1/2 w-full h-full flex relative z-10 flex-col justify-end gap-7 xl:gap-5 lg:gap-4 xs:gap-0 md:pb-ds-[40] md:pt-ds-[40] pt-10 pb-14 md:px-ds-[45] px-0" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className={`md:hidden xs:flex h-max ${canAnimate ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                    <Image
                        src='/main-devices.png'
                        alt='Main Devices'
                        width={800}
                        height={800}
                        sizes="(max-width: 768px) 90vw, 800px"
                        className="object-contain max-w-9/10 md:aspect-[329/368] h-max"
                        priority
                    />
                </div>
                <div ref={contentRef} className="pb-ds-[42] px-3.5 md:px-0 pt-0 w-full h-max md:h-full flex relative flex-col justify-end gap-6 sm:gap-ds-[32]">
                    <div className={`hidden md:flex ${canAnimate ? "opacity-0" : "opacity-100"}`}>
                        <Badge variant='outline' className="rounded-full flex items-center gap-2 sm:gap-ds-[4] p-2 sm:py-ds-[10] sm:px-ds-[15] mb-ds-[20] text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                            <BadgeCheck className="size-[13px] sm:!size-ds-[13]" />
                            <span className="text-xs sm:text-ds-[12] leading-[90%] font-poppins">Beta version is Live!</span>
                        </Badge>
                    </div>
                    <h1 ref={titleRef} className="inline xl:flex flex-col leading-[95%] font-medium font-mona_sans 2xl:text-ds-[52] xl:text-ds-[46] lg:text-ds-[42] sm:text-ds-[30] text-[40px] text-white">
                        <span>Know before they’re low,</span>
                        <span className="text-white/60">{small ? ' ' : ''}stay ahead every time</span>
                    </h1>
                    <p className={`${canAnimate ? "opacity-0" : "opacity-100"} text-white/50 leading-snug font-normal sm:whitespace-pre-wrap text-base sm:text-ds-[14]`}>
                        {'SpecGauge turns every tank into a connected\ndata source – helping you deliver smarter,\nfaster, and more profitably.'}
                    </p>
                    <div className={`${canAnimate ? "opacity-0" : "opacity-100"} flex justify-between items-center w-full mt-2.5`}>
                            <MagneticButton className="cursor-pointer w-[177px] sm:w-ds-[177] h-10 sm:h-ds-[39]" variant='secondary' onClick={() => setProgress(sections - 1)}>
                                <span className="font-medium leading-[90%] text-base sm:text-ds-[16]">Request a Demo</span>
                            </MagneticButton>
                        <div>
                            <Button onClick={() => setProgress(sections - 1)} size='icon' variant='glass' className="size-10 sm:size-ds-[40] text-white rounded-full cursor-pointer border-white/10 bg-white/5">
                                <ArrowDownIcon className="size-[19px] sm:!size-ds-[19]" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full hidden md:flex justify-start items-center relative z-0 overflow-hidden">
                <div className="absolute inset-0 z-[5] h-full w-full bg-[#E5E8EF] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_6%,transparent_110%)]"></div>
                <div className="absolute inset-0 z-10 h-full w-full bg-[#E5E8EF] bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:55px_55px]"></div>
                <Image
                    ref={imgRef}
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={926}
                    height={521}
                    sizes="(max-width: 1024px) 0px, 45vw"
                    className="object-contain max-w-8/10 sm:max-w-ds-[800] w-full z-20 relative md:absolute right-20"
                    priority
                />
                <div className="flex-1" />
            </div>
        </div>
    )
}

export default BHero
