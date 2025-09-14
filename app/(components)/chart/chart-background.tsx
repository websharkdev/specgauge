import { AlertTriangle, BadgeCheck, Bus, ClockPlus, PhoneCall, Radio } from "lucide-react";
import ChartCustom from "./chart-custom";


const info_data = [
    {
        id: 1,
        icon: <PhoneCall className="w-4 h-4 sm:w-ds-[16] sm:h-ds-[16]" color="#ED4416" />,
        index: 3, text: ["Emergency calls", "from customers", "in winter"], padding_y: 214
    },
    {
        id: 2,
        icon: <Bus className="w-4 h-4 sm:w-ds-[16] sm:h-ds-[16]" color="#ED4416" />,
        index: 23, text: ["One-off deliveries", "that waste time", "and fuel"], padding_y: 103
    },
    {
        id: 3,
        icon: <AlertTriangle className="w-4 h-4 sm:w-ds-[16] sm:h-ds-[16]" color="#ED4416" />,
        index: 42, text: ["Hospitals", "and care homes", "at constant risk"], padding_y: 116
    },
    {
        id: 4,
        icon: <Radio className="w-4 h-4 sm:w-ds-[16] sm:h-ds-[16]" color="#0B9C36" />,
        index: 69, text: ["Real-time visibility", "of every tank"], padding_y: 153
    },
    {
        id: 5,
        icon: <ClockPlus className="w-4 h-4 sm:w-ds-[16] sm:h-ds-[16]" color="#0B9C36" />,
        index: 88, text: ["Smart scheduling", 'and combined', "delivery runs"], padding_y: 292

    },
    {
        id: 6,
        icon: <BadgeCheck className="w-4 h-4 sm:w-ds-[16] sm:h-ds-[16]" color="#0B9C36" />,
        index: 108, text: ["No more surprises", 'at critical sites'], padding_y: 170
    }
];


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