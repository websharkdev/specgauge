'use client'

import { useProgressStore } from "@/stores/general.store";
import { useCallback, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

const GProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const { progress, setProgress, sections, updateSections } = useProgressStore();
    const small = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        let scrollStart = performance.now();
        let touchStart: {
            clientX: number,
            clientY: number
        } = {
            clientX: 0,
            clientY: 0
        };

        console.log(small)
        if (small) {
            updateSections()
        }

        const handleScroll = (e: WheelEvent) => {
            const scrollCurrent = performance.now();
            const scrollDelay = Math.abs(e.deltaY) > 100 ? 800 : 2000;

            if (scrollCurrent < scrollStart + scrollDelay) {
                return;
            }

            scrollStart = performance.now();

            if (e.deltaY < 0) {
                scrollTo(progress - 1 > 0 ? progress - 1 : 0);
            } else {
                scrollTo(progress + 1 < sections - 1 ? progress + 1 : sections - 1);
            }

        };


        const handleTouchStart = (e: TouchEvent) => {
            touchStart = {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStart) return;

            const scrollCurrent = performance.now();
            const scrollDelay = progress === 0 ? 0 : 800;


            if (scrollCurrent < scrollStart + scrollDelay) {
                return;
            }

            const touchMove = {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
            };

            const diffX = Math.abs(touchStart.clientX - touchMove.clientX);
            const diffY = Math.abs(touchStart.clientY - touchMove.clientY);

            if (diffX > diffY) {
                return;
            }

            if (touchMove.clientY < touchStart.clientY) {
                scrollTo(progress + 1 < sections - 1 ? progress + 1 : sections - 1);
            } else {
                scrollTo(progress - 1 > 0 ? progress - 1 : 0);
            }

        };


        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [
        progress,
        small,
    ]);

    const scrollTo = useCallback((progress: number) => {
        setProgress(progress);
    }, [])

    return children
}

export default GProvider