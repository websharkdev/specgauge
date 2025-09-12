'use client'

import { LogoIcon } from "@/components/general/logo";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { useMemo } from "react";
import { useMediaQuery } from 'usehooks-ts';
import MobileHeader from "./mobile-header";
import ProgressBar from "./progress";
import { useProgressStore } from "@/stores/general.store";


const Header = () => {
    const { sections, progress, setProgress } = useProgressStore()
    const small = useMediaQuery('(max-width: 768px)')

    const progressBAR = useMemo(() => {
        const current = (progress / (sections - 1)) * 100

        if (current === 100) {
            return <Button variant='secondary' className="w-32 h-8 cursor-pointer bg-[#11111106] text-[#11111150] text-xs" onClick={() => setProgress(0)}>
                <span className="text-sm">Back to top</span>
                <ChevronUp size={14} />
            </Button>
        }

        return <ProgressBar progress={current} />
    }, [progress])

    return (
        <header className="px-5 pt-5 flex justify-between items-center fixed top-0 left-0 right-0 z-[100]">
            <LogoIcon />
            <div className="flex items-center gap-4">
                {small ? null : progressBAR}

                <Button className="cursor-pointer w-[102px] text-sm font-medium leading-[90%]">Contact</Button>

                {small ? <MobileHeader /> : null}
            </div>
        </header>
    )
}

export default Header