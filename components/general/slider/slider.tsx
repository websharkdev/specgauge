'use client';

import { Button } from '@/components/ui/button';
import { useCSlider, useProgressStore } from '@/stores/general.store';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { PaginationOptions } from 'swiper/types';
import { useMediaQuery } from 'usehooks-ts';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

type Slide = {
    title: string;
    description: string;
    image: string;
    imageMobile: string;
    /** CSS aspect-ratio for the mobile image, e.g. "1800/2044" */
    imageAspect: string;
    imageSize?: string;
    button?: {
        title: string;
        onClick: () => void;
    };
    children?: React.ReactNode;
};

type Props = {
    slides: Slide[];
    scrollers: {
        id: number;
        title: string;
    }[];
    pageIndex: number;
};

const Slider = ({ slides, scrollers, pageIndex }: Props) => {
    const { slide } = useCSlider();
    const { progress } = useProgressStore();
    const swiperRef = useRef<SwiperRef>(null);
    const small = useMediaQuery('(max-width: 1023px)', {
        defaultValue: false,
        initializeWithValue: false,
    });

    const pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: (index: number, className: string) =>
            `<div class="${className} w-1/2! whitespace-pre-wrap! leading-[110%] font-medium text-base sm:text-ds-[16]">${scrollers[index].title}<i><b></b></i></div>`,
    } as PaginationOptions;

    useEffect(() => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;

        if (swiper.params.loop) {
            swiper.slideToLoop(slide, 1400, false);
        } else {
            swiper.slideTo(slide, 1400, false);
        }
    }, [slide]);

    return (
        <Swiper
            key={small ? 'slider-mobile' : 'slider-desktop'}
            loop
            // Fade uses absolute slides — on mobile use normal flow + autoHeight instead
            effect={small ? 'slide' : 'fade'}
            autoHeight={small}
            speed={small ? 600 : 2500}
            fadeEffect={small ? undefined : { crossFade: true }}
            autoplay={{
                delay: 15000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            }}
            pagination={pagination}
            modules={small ? [Pagination, Autoplay] : [Pagination, EffectFade, Autoplay]}
            ref={swiperRef}
            className="relative w-full max-w-full overflow-hidden"
            onSwiper={(swiper) => {
                if (swiper.params.loop) {
                    swiper.slideToLoop(slide, 0, false);
                } else {
                    swiper.slideTo(slide, 0, false);
                }
                if (small) {
                    requestAnimationFrame(() => swiper.updateAutoHeight(0));
                }
            }}
            onSlideChange={(swiper) => {
                if (small) swiper.updateAutoHeight(300);
            }}
        >
            {slides.map((s, index) => (
                <SwiperSlide className="w-full !h-auto lg:!h-full overflow-hidden" key={index}>
                    {({ isActive }) => (
                        <SliderSlideContent
                            s={s}
                            isActive={isActive}
                            progress={progress}
                            pageIndex={pageIndex}
                            small={small}
                        />
                    )}
                </SwiperSlide>
            ))}

            <div className="swiper-pagination z-20 flex flex-nowrap w-full justify-between gap-3.5 px-3.5 pt-6 pb-11 lg:w-ds-[400]! lg:pt-0 lg:pb-0 lg:px-0 lg:absolute lg:left-[45px]! lg:bottom-10!" />
        </Swiper>
    );
};

export default Slider;

const SliderSlideContent = ({
    s,
    isActive,
    progress,
    pageIndex,
    small,
}: {
    s: Slide;
    isActive: boolean;
    progress: number;
    pageIndex: number;
    small: boolean;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const isSectionActive = progress === pageIndex || small;
    const shouldAnimate = isActive && isSectionActive;

    useGSAP(() => {
        if (!shouldAnimate || !containerRef.current || !titleRef.current || !contentRef.current) return;

        const splitText = new SplitType(titleRef.current, { types: 'words,chars' });

        gsap.set(splitText.chars, { y: 100, opacity: 0 });
        gsap.set(contentRef.current.children, { y: 30, opacity: 0 });
        if (imgRef.current) gsap.set(imgRef.current, { scale: 1.1, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(splitText.chars, {
            y: 0,
            opacity: 1,
            duration: 1.35,
            stagger: 0.018,
        }).to(
            contentRef.current.children,
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.12,
            },
            '-=1.0',
        );

        if (imgRef.current) {
            tl.to(
                imgRef.current,
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.8,
                    ease: 'power2.out',
                },
                '-=1.25',
            );
        }

        return () => {
            splitText.revert();
        };
    }, { dependencies: [shouldAnimate], scope: containerRef });

    const [aspectW, aspectH] = s.imageAspect.split('/').map(Number);

    return (
        <div
            ref={containerRef}
            className={`flex w-full max-w-full flex-col lg:grid lg:grid-cols-12 lg:h-full transition-opacity duration-[1600ms] ease-out ${shouldAnimate ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: shouldAnimate ? 'auto' : 'none' }}
        >
            <div className="col-span-full flex w-full max-w-full flex-col items-start gap-[18px] sm:gap-ds-[32] pt-24 pb-0 md:col-span-5 lg:col-span-4 lg:mt-ds-[80] lg:h-full lg:pt-ds-[96] lg:pl-ds-[44] 2xl:col-span-5">
                <h2
                    ref={titleRef}
                    className="w-full text-left whitespace-pre-wrap px-3.5 text-[32px] sm:text-ds-[32] leading-[95%] font-medium text-gray-900"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                >
                    {s.title}
                </h2>
                <div ref={contentRef} className="flex w-full flex-col items-start">
                    <p className="opacity-0 text-left max-w-sm sm:max-w-ds-[392] px-3.5 text-base sm:text-ds-[14] leading-tight">
                        {s.description}
                    </p>
                    {s.button && (
                        <div className="opacity-0 mt-[18px] sm:mt-ds-[32]">
                            <Button
                                variant="blue"
                                onClick={s.button.onClick}
                                className="ml-3.5 mt-ds-[4] cursor-pointer w-[177px] md:w-ds-[177] h-[39px] sm:h-ds-[39] text-base sm:text-ds-[16] font-medium leading-snug"
                            >
                                {s.button.title}
                            </Button>
                        </div>
                    )}
                </div>
                <Image
                    src={s.imageMobile}
                    alt="Slide Image"
                    width={aspectW}
                    height={aspectH}
                    sizes="100vw"
                    className={`lg:hidden mt-2 block h-auto w-full max-w-full object-contain transition-transform duration-1000 ${shouldAnimate ? 'translate-y-0' : 'translate-y-6'}`}
                    style={{ aspectRatio: s.imageAspect }}
                    onLoad={() => {
                        const root = containerRef.current?.closest('.swiper') as
                            | (HTMLElement & { swiper?: { updateAutoHeight: (speed?: number) => void } })
                            | null;
                        root?.swiper?.updateAutoHeight?.(0);
                    }}
                />
            </div>
            <div className="col-span-full relative hidden h-screen items-center justify-center overflow-hidden md:col-span-7 lg:col-span-8 lg:flex 2xl:col-span-7">
                <Image
                    ref={imgRef}
                    src={s.image}
                    alt="Slide Image"
                    width={1200}
                    height={1200}
                    sizes="(max-width: 1280px) 55vw, 50vw"
                    className={`h-auto w-full max-w-full object-contain ${s.imageSize ?? ''}`}
                />
            </div>
        </div>
    );
};
