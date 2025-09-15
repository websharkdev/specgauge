import { AlertTriangle, BadgeCheck, Bus, ClockPlus, PhoneCall, Radio } from "lucide-react";
import ChartCustom from "./chart-custom";


const info_data = [
    {
        id: 1,
        icon: PhoneCall,
        color: 'text-[#ED4416]',
        index: 3, text: ["Emergency calls", "from customers", "in winter"], padding_y: 214
    },
    {
        id: 2,
        icon: Bus,
        color: 'text-[#ED4416]',
        index: 23, text: ["One-off deliveries", "that waste time", "and fuel"], padding_y: 103
    },
    {
        id: 3,
        icon: AlertTriangle,
        color: 'text-[#ED4416]',
        index: 42, text: ["Hospitals", "and care homes", "at constant risk"], padding_y: 86
    },
    {
        id: 4,
        icon: Radio,
        color: 'text-[#0B9C36]',
        index: 69, text: ["Real-time visibility", "of every tank"], padding_y: 153
    },
    {
        id: 5,
        icon: ClockPlus,
        color: 'text-[#0B9C36]',
        index: 87, text: ["Smart scheduling", 'and combined', "delivery runs"], padding_y: 152

    },
    {
        id: 6,
        icon: BadgeCheck,
        color: 'text-[#0B9C36]',
        index: 107, text: ["No more surprises", 'at critical sites'], padding_y: 140
    }
]


const ChartBG = ({
    isInView
}: {
    isInView: boolean
}) => {
    return (
        <ChartCustom data={info_data} isInView={isInView} />
    )
}

export default ChartBG