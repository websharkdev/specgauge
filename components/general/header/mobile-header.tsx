'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { scrollToSection } from "@/hooks/useScrollToSection"
import { useCSlider, useProgressStore } from "@/stores/general.store"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


const menu = [
    {
        title: 'Pain Point',
        link: 'pain_point_1',
        index: 1,
    },
    {
        title: 'Pressure Sensor',
        link: 'slider',
        index: 2,
        slide: 0,
    },
    {
        title: 'Web Portal',
        link: 'slider',
        index: 2,
        slide: 1,
    },
    {
        title: 'Advantages',
        link: 'advantages',
        index: 3,
    },
    {
        title: 'Request a Demo',
        link: 'request_demo',
        index: 4,
    },
]


type TState = 'open' | 'closed'

const MobileHeader = () => {
    const [state, setState] = useState<TState>('closed')
    const { setSlide } = useCSlider()

    return (
        <Dialog open={state === 'open'} onOpenChange={(opened) => opened ? setState('open') : setState('closed')}>
            <DialogTrigger className="cursor-pointer size-10 flex justify-center items-center rounded-full bg-[#11111110] hover:bg-[#11111120]">
                <Image src='/icons/burger.svg' alt="burger-menu" width={20} height={20} />
            </DialogTrigger>
            <DialogContent className="h-dvh w-dvw bg-transparent !text-white z-[150]" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(60px)'
            }}>
                <DialogHeader className="w-full">
                    <div className="flex w-full items-center justify-between">
                        <DialogTitle className="font-mona_sans text-[32px] text-[#111111] font-medium">Menu</DialogTitle>
                        <Button className="cursor-pointer size-10 flex justify-center items-center rounded-full bg-[#11111110] text-[#111111]"
                            onClick={() => setState('closed')}>
                            <X />
                        </Button>
                    </div>
                    <DialogDescription className="sr-only">
                        This is Menu
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-[35px] items-center">
                    {menu.map((item, index) => <div key={`menu_item-mobile--${index}`} className="cursor-pointer text-2xl text-[#111111] font-medium leading-[90%]" onClick={() => {
                        if (item.index === 2) {
                            setSlide(item.slide || 0)
                        }
                        scrollToSection(item.link)
                        setState('closed')
                    }}>
                        {item.title}
                    </div>)}
                </div>
                <div className="flex-1" />

                <Button className="cursor-pointer w-[177px] mx-auto h-10" variant='secondary' onClick={() => {
                    scrollToSection('request_demo')
                    setState('closed')
                }}>
                    <span className="font-medium leading-[90%] text-base md:text-ds-[16] text-[#087EEF]">Request a Demo</span>
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default MobileHeader