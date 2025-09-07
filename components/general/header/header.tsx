import { LogoIcon } from "@/components/general/logo";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useMemo } from "react";
import { useMediaQuery } from 'usehooks-ts';
import MobileHeader from "./mobile-header";
import ProgressBar from "./progress";


const Header = ({ progress }: { progress: number }) => {
    const small = useMediaQuery('(max-width: 768px)')
    const progressBAR = useMemo(() => {
        if (progress === 100) {
            return <Button variant='glass' className="w-32 h-8 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                {small ? null : progressBAR}

                <Button className="cursor-pointer">Contact</Button>

                {small ? <MobileHeader /> : null}
            </div>
        </header>
    )
}

export default Header