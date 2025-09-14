import { Badge } from "@/components/ui/badge";
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger
// } from "@/components/ui/navigation-menu";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { useCSlider, useProgressStore } from "@/stores/general.store";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";


const menu = [
    {
        title: 'Pain Point',
        index: 1,
        background: 'bg-[#FB4F1F]',
        link: '#pain_point'
    },
    {
        title: 'Pressure Sensor',
        index: 2,
        background: 'bg-[#FB941F]',
        link: '#slider',
        slide: 0,
    },
    {
        title: 'Web Portal',
        index: 2, // slide 2
        background: 'bg-[#FB941F]',
        link: '#slider',
        slide: 1,
    },
    {
        title: 'Advantages',
        index: 3,
        background: 'bg-[#11B241]',
        link: '#advantages'
    },
    {
        title: 'Request a Demo',
        index: 4,
        background: 'bg-[#11B241]',
        link: '#request_demo'
    },
]

const ProgressBar = ({
    progress
}: {
    progress: number
}) => {
    const { setSlide } = useCSlider()
    const [hovered, setHovered] = useState<boolean>(false)
    const [hoverItem, setHoverItem] = useState<number | undefined>(undefined)
    const { setProgress } = useProgressStore()
    const indicator = useMemo(() => {
        if (progress <= 20) {
            return "bg-[#FB4F1F]"
        }

        if (progress <= 50) {
            return "bg-[#FB941F]"
        }
        if (progress <= 80) {
            return "bg-[#11B241]"
        }

        return "bg-[#0A9D58]"
    }, [progress])

    return <HoverCard onOpenChange={setHovered}>
        <HoverCardTrigger className={`p-0 w-[120px] md:w-ds-[120]`}><Badge className={`w-full transition-all duration-700 cursor-pointer h-8 md:h-ds-[32] ${hovered ? '' : 'rounded-full'} px-3.5 md:px-ds-[14] border-none bg-[#F1F1F1]`}>
            <Progress value={progress} indicatorClassName={indicator} />
            <span className="text-sm md:text-ds-[14] font-medium leading-[90%] text-[#111111]">{progress}%</span>
        </Badge></HoverCardTrigger>
        <HoverCardContent align="end" sideOffset={-32} className={`static z-[100] shadow-none rounded-xl border-none bg-[#F1f1f1] ${hovered ? '!w-[180px] md:!w-ds-[180px] h-max' : ''}`}>
            <div
                className="flex flex-col gap-4">
                <div className="flex flex-row flex-nowrap gap-2.5 justify-between w-full items-center hover:bg-transparent">
                    <span className="text-sm font-medium leading-[90%] text-[#111111]">Menu</span>
                    <ChevronDown size={14} color="#111111" />
                </div>
                {menu.map((item, index) => <div key={`menu_item--${index}`} onMouseLeave={() => setHoverItem(undefined)} onMouseEnter={() => setHoverItem(index)} className="flex flex-row flex-nowrap gap-2.5 items-center cursor-pointer text-sm font-medium leading-[90%]" onClick={() => {
                    if (item.index === 2) {
                        setSlide(item.slide || 0)
                    }
                    setProgress(item.index)
                }}>
                    <div className={`size-1.5 rounded-full ${item.background} ${index === hoverItem ? 'opacity-100' : 'opacity-0'} transition-all duration-200`} />
                    <span className="text-sm">{item.title}</span>

                </div>

                )}
            </div>
        </HoverCardContent>
    </HoverCard>

}

export default ProgressBar