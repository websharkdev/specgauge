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
            return <Button variant='secondary' className="w-32 sm:w-ds-[128] h-8 sm:h-ds-[32] cursor-pointer bg-[#11111106] text-[#11111150] text-sm sm:text-ds-[14]" onClick={() => setProgress(0)}>
                <span>Back to top</span>
                <ChevronUp className="size-[13px] sm:!size-ds-[13]" />
            </Button>
        }

        return <ProgressBar progress={current} />
    }, [progress])

    return (
        <header className="px-5 py-3.5 flex justify-between items-center sticky md:fixed top-0 left-0 right-0 z-[100] bg-[#fffff20] md:bg-transparent backdrop-blur-xl md:backdrop-blur-none bg-blend-multiply md:bg-blend-normal translate-z-0">
            <LogoIcon />
            <div className="flex items-center gap-4">
                {small ? null : progressBAR}

                <Button onClick={() => setProgress(sections - 1)} className="cursor-pointer w-[102px] sm:w-ds-[102] h-[38px] sm:h-ds-[38] text-sm sm:text-ds-[14] font-medium leading-[90%]">Contact</Button>

                {small ? <MobileHeader /> : null}
            </div>
        </header>
    )
}

export default Header