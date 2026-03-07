'use client';

import { motion } from 'motion/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Pagination } from 'swiper/modules';
import { PaginationOptions } from 'swiper/types';
import { useCSlider, useProgressStore } from '@/stores/general.store';
import { useMediaQuery } from 'usehooks-ts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';

type Props = {
    slides: {
        title: string;
        description: string;
        image: string;
        imageMobile: string;
        imageSize?: string;
        button?: {
            title: string;
            onClick: () => void;
        };
        children?: React.ReactNode;
    }[];
    scrollers: {
        id: number;
        title: string;
    }[];
    pageIndex: number
};

const Slider = ({ slides, scrollers, pageIndex }: Props) => {
    const { slide } = useCSlider();
    const { progress } = useProgressStore()
    const swiperRef = useRef<SwiperRef>(null);
    const small = useMediaQuery('(max-width: 768px)');


    const pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: (index: number, className: string) =>
            `<div class="${className} w-1/2! whitespace-pre-wrap! leading-[110%] font-medium text-base sm:text-ds-[16]">${scrollers[index].title}<i><b></b></i></div>`
    } as PaginationOptions;

    useEffect(() => {
        const swiper = swiperRef.current?.swiper;
        if (!swiper) return;

        if (swiper.params.loop) {
            swiper.slideToLoop(slide, 0, false); // для loop
        } else {
            swiper.slideTo(slide, 0, false);
        }
    }, [slide]);

    return (
        <Swiper
            loop
            autoplay={{ delay: 10000 }}
            pagination={pagination}
            modules={[Pagination]}
            ref={swiperRef}
            className="relative"
            onSwiper={(swiper) => {
                // 👌 Гарантируем старт с нужного слайда
                if (swiper.params.loop) {
                    swiper.slideToLoop(slide, 0, false);
                } else {
                    swiper.slideTo(slide, 0, false);
                }
            }}
        >
            {slides.map((s, index) => (
                <SwiperSlide className="w-full h-full overflow-hidden" key={index}>
                    {({ isActive }) => {
                        return (
                            <SliderSlideContent
                                s={s}
                                isActive={isActive}
                                progress={progress}
                                pageIndex={pageIndex}
                                small={small}
                            />
                        )
                    }}
                </SwiperSlide>
            ))}

            <div className="swiper-pagination flex flex-nowrap w-full sm:w-ds-[400]! justify-between gap-3.5 px-3.5 pb-11 md:p-0 static sm:fixed md:left-[45px]! bottom-10!" />
        </Swiper>
    );
};

export default Slider;

const SliderSlideContent = ({ s, isActive, progress, pageIndex, small }: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const isSectionActive = progress === pageIndex || small;
    const shouldAnimate = isActive && isSectionActive;

    useGSAP(() => {
        if (!shouldAnimate || !containerRef.current || !titleRef.current || !contentRef.current) return;

        const splitText = new SplitType(titleRef.current, { types: 'words,chars' });
        
        // Setup initial states
        gsap.set(splitText.chars, { y: 100, opacity: 0 });
        gsap.set(contentRef.current.children, { y: 30, opacity: 0 });
        if(imgRef.current) gsap.set(imgRef.current, { scale: 1.1, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(splitText.chars, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.02,
        })
        .to(contentRef.current.children, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
        }, "-=0.8")

        if (imgRef.current) {
            tl.to(imgRef.current, {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "expo.out"
            }, "-=1.2");
        }

        return () => {
            splitText.revert();
        };
    }, { dependencies: [shouldAnimate], scope: containerRef });

    return (
        <div ref={containerRef} className={`flex flex-nowrap flex-col lg:grid lg:grid-cols-12 h-full transition-opacity duration-700 ${shouldAnimate ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="md:col-span-5 lg:col-span-4 2xl:col-span-5 col-span-full flex flex-col items-start gap-[18px] sm:gap-ds-[32] lg:mt-ds-[80] h-max lg:h-full pt-24 lg:pt-ds-[96] lg:pl-ds-[44] pb-0">
                <h2
                    ref={titleRef}
                    className="text-left whitespace-pre-wrap px-3.5 text-[32px] sm:text-ds-[32] leading-[95%] font-medium text-gray-900"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                >
                    {s.title}
                </h2>
                <div ref={contentRef} className="flex flex-col items-start w-full">
                    <p className="opacity-0 text-left max-w-sm sm:max-w-ds-[392] px-3.5 text-base sm:text-ds-[14] leading-tight">
                        {s.description}
                    </p>
                    {s.button && (
                        <div className="opacity-0">
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
                    width={800}
                    height={800}
                    className={`md:hidden block w-full ${s.imageSize} translate-y-10 transition-transform duration-1000 ${shouldAnimate ? 'translate-y-0' : ''}`}
                />
            </div>
            <div className={`md:col-span-7 lg:col-span-8 2xl:col-span-7 col-span-full relative md:flex hidden justify-center items-center h-screen`}>
                <Image
                    ref={imgRef}
                    src={s.image}
                    alt="Slide Image"
                    width={1200}
                    height={1200}
                    className={s.imageSize}
                />
            </div>
        </div>
    )
}
