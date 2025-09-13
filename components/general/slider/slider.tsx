'use client';

import { motion, useInView } from 'motion/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRef } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { PaginationOptions } from 'swiper/types';

type Props = {
    slides: {
        title: string;
        description: string;
        image: string;
        imageMobile: string;
        imageSize?: string
        button?: {
            title: string;
            link: string;
        };
        children?: React.ReactNode;
    }[],
    scrollers: {
        id: number;
        title: string;
    }[]
}

const Slider = ({ slides, scrollers }: Props) => {

    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
    })

    const pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<div class="${className} !w-36 !whitespace-pre-wrap leading-[110%] font-medium text-xs md:text-base">${scrollers[index].title}<i><b></b></i></div>`
        },
    } as PaginationOptions

    return (
        <Swiper
            loop
            autoplay={{
                delay: 10000,
            }}
            className='relative'
            pagination={pagination}
            modules={[Pagination, Autoplay]}
        >
            {slides.map((slide, index) => (
                <SwiperSlide className='w-full h-full overflow-hidden' key={index}>
                    <div className="grid grid-cols-12 pt-24 lg:pl-11 p-3.5 pb-0 h-full" ref={ref}>
                        <div className="lg:col-span-5 col-span-full flex flex-col items-start gap-ds-[32] md:mt-ds-[80]">
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? {
                                    opacity: 1,
                                    y: 0,
                                } : {}}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.5,
                                    ease: [0, 0.71, 0.3, 1.01],
                                }}
                                className='text-left whitespace-pre-wrap text-2xl md:text-ds-[32] leading-[95%] font-medium text-gray-900'>{slide.title}</motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? {
                                    opacity: .5,
                                    y: 0,
                                } : {}}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.9,
                                    ease: [0, 0.71, 0.3, 1.01],
                                }}
                                className='text-left max-w-sm lg:max-w-ds-[392] text-sm lg:text-ds-[14] leading-tight opacity-50'>{slide.description}</motion.p>
                            {slide.button &&
                                <Button variant="blue" href={slide.button.link} className='mt-ds-[4] cursor-pointer w-36 md:w-[177px] h-7 md:h-[39px] text-sm md:text-base font-medium leading-4'>{slide.button.title}</Button>}
                            <Image src={slide.imageMobile} alt="Slide Image" width={900} height={900} className={`lg:hidden block mt-ds-[20] max-w-ds-[600] m-auto`} />
                        </div>

                        <div className={`lg:col-span-7 col-span-full w-full h-full relative overflow-hidden lg:flex hidden justify-center items-center ${slide.imageSize}`}
                            style={{
                                background: `url(${slide.image}) bottom right / contain no-repeat`,
                            }} />
                    </div>
                </SwiperSlide>
            ))}

            <div className="swiper-pagination !h-ds-[80] md:m-ds-[44] !left-1/2 md:!left-0 -translate-x-1/2 md:translate-x-0 w-full max-w-2xs md:max-w-xs flex items-end justify-between flex-nowrap gap-5 lg:absolute relative md:!bottom-0 bottom-10 z-10"></div>
        </Swiper>
    )
}

export default Slider