'use client'

import { useProgressStore } from "@/stores/general.store";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const GProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const { progress, setProgress, sections, updateSections } = useProgressStore();
    const small = useMediaQuery('(max-width: 768px)')
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        if (small) {
            return updateSections()
        }

        let scrollStart = performance.now();
        let touchStart: {
            clientX: number,
            clientY: number
        } = {
            clientX: 0,
            clientY: 0
        };

        const handleScroll = (e: WheelEvent) => {
            const scrollCurrent = performance.now();
            const scrollDelay = 1200; // In sync with 1.1s entry animation + buffer

            if (scrollCurrent < scrollStart + scrollDelay || Math.abs(e.deltaY) < 10) {
                return;
            }

            const isMovingUp = e.deltaY < 0;
            const isMovingDown = e.deltaY > 0;

            // Boundary check to prevent jitter when scrolling at the ends
            if (isMovingUp && progress === 0) return;
            if (isMovingDown && progress === sections - 1) return;

            scrollStart = performance.now();

            if (isMovingUp) {
                scrollTo(progress - 1);
            } else {
                scrollTo(progress + 1);
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
        sections,
        mounted
    ]);

    const scrollTo = useCallback((progress: number) => {
        setProgress(progress);
    }, [])

    return children
}

export default GProvider