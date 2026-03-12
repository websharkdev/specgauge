'use client'

import { useProgressStore } from "@/stores/general.store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import GForm from "./form-general";

const BForm = ({ index }: { index: number }) => {
    const { progress } = useProgressStore()
    const ref = useRef<HTMLDivElement>(null)
    const small = useMediaQuery('(max-width: 1023px)', {
        defaultValue: false,
        initializeWithValue: false,
    })

    const active = progress === index || small;

    useGSAP(() => {
        if (!active || !ref.current) return;

        const items = ref.current.querySelectorAll('.form-reveal');
        gsap.set(items, { y: 30, opacity: 0 });

        gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.4
        });
    }, { dependencies: [active], scope: ref });

    return (
        <div
            ref={ref}
            id="request_demo"
            className="static sm:relative lg:fixed lg:inset-0 snap-normal md:snap-start w-full flex items-center min-h-dvh md:h-[100vh] md:min-h-auto flex-col pb-[25px] md:pb-ds-[40] pt-20 md:pt-0 justify-center lg:overflow-hidden"
            style={{
                background: small ? 'url("/backgrounds/form-bg_mobile.svg") bottom left / cover no-repeat' : 'url("/backgrounds/form-bg.svg") center center / cover no-repeat',
            }}
        >
            <div className="flex-1" />
            <div className="flex flex-col items-center w-full mb-[50px] sm:mb-ds-[60] gap-2">
                <h5 className="form-reveal opacity-0 text-transparent text-center bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49] uppercase font-medium text-sm sm:text-ds-[16]">No more guesswork</h5>
                <h2 className="form-reveal opacity-0 text-[32px] sm:text-ds-[36] font-medium leading-[95%] text-[#111111] text-center mt-[15px] sm:mt-ds-[16] mb-[25px] sm:mb-ds-[20] whitespace-pre-wrap">{'Ready to transform\nyour oil delivery?'}</h2>
                <p className="form-reveal opacity-0 w-[246px] md:w-full text-sm sm:text-ds-[14] text-center text-[#111111] font-normal leading-snug tracking-normal md:whitespace-pre-wrap">{'Stop firefighting emergencies. Start\nplanning profitable runs. With SpecGauge,\nyou\'ll always know before they\'re low.'}</p>
            </div>
            <GForm />
            <div className="flex-1" />
            <h6 className="form-reveal opacity-0 text-xs sm:text-ds-[12] text-[#111111] mt-[100px] sm:mt-0">© SpecGauge. All rights reserved.</h6>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            </div>
        </div>
    )
}

export default BForm
