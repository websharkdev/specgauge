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
import { useCSlider } from '@/stores/general.store';
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
            link: string;
        };
        children?: React.ReactNode;
    }[];
    scrollers: {
        id: number;
        title: string;
    }[];
};

const Slider = ({ slides, scrollers }: Props) => {
    const { slide } = useCSlider();
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
            `<div class="${className} !w-1/2 !whitespace-pre-wrap leading-[110%] font-medium text-base md:text-ds-[16]">${scrollers[index].title}<i><b></b></i></div>`
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
                    <div className="grid grid-cols-12 pt-24 lg:pl-11 pb-0 h-full" ref={ref}>
                        <div className="lg:col-span-5 col-span-full flex flex-col items-start gap-[18px] md:gap-ds-[32] md:mt-ds-[80]">
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1.2, delay: 0.5, ease: 'linear' }}
                                className="text-left whitespace-pre-wrap px-3.5 text-[32px] md:text-ds-[32] leading-[95%] font-medium text-gray-900"
                            >
                                {s.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 0.5, y: 0 } : {}}
                                transition={{ duration: 1.2, delay: 0.9, ease: 'linear' }}
                                className="text-left max-w-sm lg:max-w-ds-[392] px-3.5 text-base lg:text-ds-[14] leading-tight opacity-50"
                            >
                                {s.description}
                            </motion.p>
                            {s.button && (
                                <Button
                                    variant="blue"
                                    href={s.button.link}
                                    className="ml-3.5 mt-ds-[4] cursor-pointer w-[177px] md:w-[177px] h-[39px] text-base font-medium leading-4"
                                >
                                    {s.button.title}
                                </Button>
                            )}
                            <Image
                                src={s.imageMobile}
                                alt="Slide Image"
                                width={800}
                                height={800}
                                className={`lg:hidden block w-full ${s.imageSize}`}
                            />
                        </div>
                        <div className={`lg:col-span-7 col-span-full w-full h-full relative overflow-hidden lg:flex hidden justify-center items-center`}>
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

            <div className="swiper-pagination flex flex-nowrap w-full md:!w-ds-[400] justify-between gap-3.5 px-3.5 pb-11 md:p-0 static sm:relative lg:fixed md:!left-[45px] md:!bottom-10" />
        </Swiper>
    );
};

export default Slider;
