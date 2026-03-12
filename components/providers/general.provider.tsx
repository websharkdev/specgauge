'use client'

import { useProgressStore } from "@/stores/general.store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const GProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const { progress, setProgress, sections, updateSections } = useProgressStore();
    const small = useMediaQuery('(max-width: 768px)', {
        defaultValue: false,
        initializeWithValue: false,
    })
    const [mounted, setMounted] = useState(false);
    const progressRef = useRef(progress);
    const sectionsRef = useRef(sections);

    const scrollTo = useCallback((nextProgress: number) => {
        setProgress(nextProgress);
    }, [setProgress])

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        progressRef.current = progress;
        sectionsRef.current = sections;
    }, [progress, sections]);

    useEffect(() => {
        if (!mounted) return;

        if (small) {
            updateSections()
            return;
        }

        let scrollStart = performance.now();
        const sectionTransitionDelay = 1850;
        let touchStart: {
            clientX: number,
            clientY: number
        } = {
            clientX: 0,
            clientY: 0
        };

        const handleScroll = (e: WheelEvent) => {
            const scrollCurrent = performance.now();
            const scrollDelay = sectionTransitionDelay;
            const currentProgress = progressRef.current;
            const currentSections = sectionsRef.current;

            if (scrollCurrent < scrollStart + scrollDelay || Math.abs(e.deltaY) < 10) {
                return;
            }

            const isMovingUp = e.deltaY < 0;
            const isMovingDown = e.deltaY > 0;

            if (isMovingUp && currentProgress === 0) return;
            if (isMovingDown && currentProgress === currentSections - 1) return;

            scrollStart = performance.now();

            if (isMovingUp) {
                scrollTo(currentProgress - 1);
            } else {
                scrollTo(currentProgress + 1);
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
            const currentProgress = progressRef.current;
            const currentSections = sectionsRef.current;
            const scrollDelay = currentProgress === 0 ? 0 : sectionTransitionDelay - 250;


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
                scrollTo(currentProgress + 1 < currentSections - 1 ? currentProgress + 1 : currentSections - 1);
            } else {
                scrollTo(currentProgress - 1 > 0 ? currentProgress - 1 : 0);
            }

        };

        window.addEventListener('wheel', handleScroll, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [
        small,
        mounted,
        scrollTo,
        updateSections
    ]);

    return children
}

export default GProvider
