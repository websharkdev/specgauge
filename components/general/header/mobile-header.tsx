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
import { useProgressStore } from "@/stores/general.store"
import { Menu, X } from "lucide-react"
import { useState } from "react"


const menu = [
    {
        title: 'Pain Point',
        index: 0,
    },
    {
        title: 'Pressure Sensor',
        index: 1,
    },
    {
        title: 'Web Portal',
        index: 2,
    },
    {
        title: 'Advantages',
        index: 3,
    },
    {
        title: 'Request a Demo',
        index: 4,
    },
]


type TState = 'open' | 'closed'

const MobileHeader = () => {
    const [state, setState] = useState<TState>('open')
    const { setProgress } = useProgressStore()

    return (
        <Dialog open={state === 'open'} onOpenChange={(opened) => opened ? setState('open') : setState('closed')}>
            <DialogTrigger className="cursor-pointer size-10 flex justify-center items-center rounded-full bg-[#11111110] hover:bg-[#11111120]"> <Menu size={20} /></DialogTrigger>
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

                <nav>
                    <ul className="flex flex-col gap-[35px] items-center">
                        {menu.map((item, index) => <li key={`menu_item-mobile--${index}`} className="cursor-pointer text-2xl text-[#111111] font-medium leading-[90%]" onClick={() => {
                            setProgress(item.index)
                            setState('closed')
                        }}>
                            {item.title}
                        </li>)}
                    </ul>
                </nav>
                <div className="flex-1" />

                <Button className="cursor-pointer w-[177px] mx-auto h-10" variant='secondary' onClick={() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    })
                    setState('closed')
                }}>
                    <span className="font-medium leading-[90%] text-sm md:text-ds-[16]">Request a Demo</span>
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default MobileHeader