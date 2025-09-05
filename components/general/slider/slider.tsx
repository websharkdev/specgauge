'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { PaginationOptions } from 'swiper/types';

type Props = {
    slides: {
        title: string;
        description: string;
        image: string;
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
    const pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<div class="${className} !w-36">${scrollers[index].title}<i><b></b></i></div>`
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
            modules={[Autoplay, Pagination]}
        >
            {slides.map((slide, index) => (
                <SwiperSlide className='w-full h-full overflow-hidden' key={index}>
                    <div className="grid grid-cols-10 pt-24 pl-11 h-full">
                        <div className="col-span-4 flex flex-col items-start gap-5">
                            <h2 className='text-left whitespace-pre-wrap max-w-sm text-4xl leading-snug font-medium text-gray-900'>{slide.title}</h2>
                            <p className='text-left max-w-sm text-sm leading-normal opacity-50'>{slide.description}</p>
                            {slide.button && (<Button variant="blue" href={slide.button.link} className='mt-2 cursor-pointer'>{slide.button.title}</Button>)}
                        </div>

                        <div className="col-span-6 w-full h-full relative overflow-hidden flex justify-center items-center">
                            <Image src={slide.image} alt={slide.description} width={1920 * 2} height={1080 * 2} className={`absolute left-1/2 bottom-0 -translate-x-1/2 ${slide.imageSize}`} />
                            {slide.children}
                        </div>
                    </div>
                </SwiperSlide>
            ))}

            <div className="swiper-pagination !h-20 m-11 w-full max-w-xs flex items-end justify-between flex-nowrap gap-5 absolute !bottom-8 z-10"></div>
        </Swiper>
    )
}

export default Slider