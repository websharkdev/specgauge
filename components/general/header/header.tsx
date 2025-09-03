import { LogoIcon } from "@/components/general/logo";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useMemo } from "react";
import ProgressBar from "./progress";

const Header = () => {
    const progress: number = 0


    const progressBAR = useMemo(() => {

        if (progress === 100) {
            return <Button variant='glass' className="w-32 h-8 cursor-pointer">
                <span className="text-sm">Back to top</span>
                <ChevronUp size={14} />
            </Button>
        }

        return <ProgressBar progress={progress} />
    }, [progress])

    return (
        <header className="px-5 pt-5 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
            <LogoIcon />
            <div className="flex items-center gap-4">
                {progressBAR}
                <Button>Contact</Button></div>
        </header>
    )
}

export default Header