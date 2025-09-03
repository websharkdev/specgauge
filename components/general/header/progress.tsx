import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

const ProgressBar = ({
    progress
}: {
    progress: number
}) => {

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

    return (<Badge variant='glass' className="w-[120px] h-8 rounded-full px-3 border-none bg-black/5 backdrop-blur-xl bg-blend-multiply">
        <Progress value={progress} indicatorClassName={indicator} />
        <span className="text-sm font-medium">{progress}%</span>
    </Badge>
    )
}

export default ProgressBar