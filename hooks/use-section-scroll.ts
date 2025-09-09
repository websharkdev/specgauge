"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function useSectionScroll(sectionCount: number) {
    const sectionRefs = Array.from({ length: sectionCount }, () =>
        useRef<HTMLElement | null>(null)
    );

    const currentIndex = useRef(0);
    const isAnimating = useRef(false);
    const touchStartY = useRef(0);

    const animatedSections = useRef<Set<number>>(new Set());

    // 🔹 Функция анимации появления контента
    const animateSectionContent = (index: number) => {
        const section = sectionRefs[index]?.current;
        if (!section) return;

        if (!animatedSections.current.has(index)) {
            animatedSections.current.add(index); // помечаем как анимированную
            gsap.fromTo(
                section,
                { opacity: 0.4, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        } else {
            gsap.to(section, { opacity: 1, duration: 0.3 }); // просто делаем видимой
        }
    };

    const scrollToSection = (index: number) => {
        const section = sectionRefs[index]?.current;
        if (!section) return;

        isAnimating.current = true;

        gsap.to(window, {
            scrollTo: { y: section.offsetTop },
            duration: 1.2,
            ease: 'power2.inOut',
            onComplete: () => {
                isAnimating.current = false;
                animateSectionContent(index); // 🔹 Анимация контента после скролла
            },
        });
    };

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (isAnimating.current) return;

            if (e.deltaY > 0 && currentIndex.current < sectionCount - 1) {
                currentIndex.current++;
                scrollToSection(currentIndex.current);
            } else if (e.deltaY < 0 && currentIndex.current > 0) {
                currentIndex.current--;
                scrollToSection(currentIndex.current);
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (isAnimating.current) return;

            const deltaY = touchStartY.current - e.changedTouches[0].clientY;

            if (deltaY > 50 && currentIndex.current < sectionCount - 1) {
                currentIndex.current++;
                scrollToSection(currentIndex.current);
            } else if (deltaY < -50 && currentIndex.current > 0) {
                currentIndex.current--;
                scrollToSection(currentIndex.current);
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchend', onTouchEnd, { passive: false });

        // 🔹 Задаём изначальное состояние для секций
        sectionRefs.forEach((ref, i) => {
            if (ref.current) {
                gsap.set(ref.current, { opacity: i === 0 ? 1 : 0 });
            }
        });

        // 🔹 Анимация первой секции при загрузке
        animateSectionContent(0);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [sectionCount]);

    return sectionRefs;
}
