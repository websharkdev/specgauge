import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useMemo, useRef, useState } from "react";
import { useProgressStore } from "@/stores/general.store";
import { useHover } from "usehooks-ts";
import { ChevronDown } from "lucide-react";

const menu = [
    {
        title: 'Pain Point',
        index: 0,
        background: 'bg-[#FB4F1F]'
    },
    {
        title: 'Pressure Sensor',
        index: 1,
        background: 'bg-[#FB941F]'
    },
    {
        title: 'Web Portal',
        index: 2,
        background: 'bg-[#FB941F]'
    },
    {
        title: 'Advantages',
        index: 3,
        background: 'bg-[#11B241]'
    },
    {
        title: 'Request a Demo',
        index: 4,
        background: 'bg-[#11B241]'
    },
]

const ProgressBar = ({
    progress
}: {
    progress: number
}) => {
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

    return <NavigationMenu onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)}>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className={`p-0 transition-all duration-700 ${hovered ? 'w-[180px]' : 'w-[120px]'}`} ><Badge className={`w-full transition-all duration-700 cursor-pointer h-8 rounded-full px-3.5 border-none bg-[#F1F1F1]`}>
                    {hovered ? <>
                        <span className="text-sm font-medium leading-[90%] text-[#111111]">Menu</span>
                        <div className="flex-1" />
                        <ChevronDown size={14} color="#111111" />
                    </> : <>
                        <Progress value={progress} indicatorClassName={indicator} />
                        <span className="text-sm font-medium leading-[90%] text-[#111111]">{progress}%</span>
                    </>}
                </Badge></NavigationMenuTrigger>
                <NavigationMenuContent className={hovered ? '!w-[180px]' : ''}>
                    <ul className="flex flex-col gap-4">
                        <NavigationMenuLink className="flex flex-row flex-nowrap gap-2.5 justify-between w-full items-center hover:bg-transparent">
                            <span className="text-sm font-medium leading-[90%] text-[#111111]">Menu</span>
                            <ChevronDown size={14} color="#111111" />
                        </NavigationMenuLink>
                        {menu.map((item, index) =>
                            <li key={`menu_item--${index}`} onMouseLeave={() => setHoverItem(undefined)} onMouseEnter={() => setHoverItem(index)} className="cursor-pointer text-sm font-medium leading-[90%]" onClick={() => setProgress(item.index)}>
                                <NavigationMenuLink className="flex flex-row flex-nowrap gap-2.5 items-center">
                                    <div className={`size-1.5 rounded-full ${item.background} ${index === hoverItem ? 'opacity-100' : 'opacity-0'} transition-all duration-200`} />
                                    <span className="text-sm">{item.title}</span>
                                </NavigationMenuLink>
                            </li>)}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>

}

export default ProgressBar