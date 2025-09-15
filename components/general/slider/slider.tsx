'use client';

import { motion, useInView } from 'motion/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { PaginationOptions } from 'swiper/types';
import { useCSlider, useProgressStore } from '@/stores/general.store';
import { useMediaQuery } from 'usehooks-ts';

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
    const small = useMediaQuery('(max-width: 768px)')
    const ref = useRef(null);

    const isInView = useInView(ref, {
        once: small
    });

    const pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: (index: number, className: string) =>
            `<div class="${className} !w-1/2 !whitespace-pre-wrap leading-[110%] font-medium text-base sm:text-ds-[16]">${scrollers[index].title}<i><b></b></i></div>`
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
                <SwiperSlide className="w-full h-full overflow-hidden" key={index} >
                    <div className="flex flex-nowrap flex-col lg:grid lg:grid-cols-12 h-full" ref={ref}>
                        <div className="md:col-span-5 lg:col-span-4 2xl:col-span-5 col-span-full flex flex-col items-start gap-[18px] sm:gap-ds-[32] lg:mt-ds-[80] h-max lg:h-full pt-24 lg:pt-ds-[96] lg:pl-ds-[44] pb-0">
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView && (progress === pageIndex || small) ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1.2, delay: 0.5, ease: 'linear' }}
                                className="text-left whitespace-pre-wrap px-3.5 text-[32px] sm:text-ds-[32] leading-[95%] font-medium text-gray-900"
                            >
                                {s.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView && (progress === pageIndex || small) ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1.2, delay: 0.9, ease: 'linear' }}
                                className="text-left max-w-sm sm:max-w-ds-[392] px-3.5 text-base sm:text-ds-[14] leading-tight opacity-50"
                            >
                                {s.description}
                            </motion.p>
                            {s.button && (
                                <Button
                                    variant="blue"
                                    onClick={s.button.onClick}
                                    className="ml-3.5 mt-ds-[4] cursor-pointer w-[177px] md:w-ds-[177] h-[39px] sm:h-ds-[39] text-base sm:text-ds-[16] font-medium leading-snug"
                                >
                                    {s.button.title}
                                </Button>
                            )}
                            <Image
                                src={s.imageMobile}
                                alt="Slide Image"
                                width={800}
                                height={800}
                                className={`md:hidden block w-full ${s.imageSize}`}
                            />
                        </div>
                        <div className={`md:col-span-7 lg:col-span-8 2xl:col-span-7 col-span-full relative md:flex hidden justify-center items-center h-[100vh]`}>
                            <Image
                                src={s.image}
                                alt="Slide Image"
                                width={1200}
                                height={1200}
                                className={s.imageSize}
                            />
                        </div>
                    </div>
                </SwiperSlide>
            ))}

            <div className="swiper-pagination flex flex-nowrap w-full sm:!w-ds-[400] justify-between gap-3.5 px-3.5 pb-11 md:p-0 static sm:relative lg:fixed md:!left-[45px] md:!bottom-10" />
        </Swiper>
    );
};

export default Slider;
