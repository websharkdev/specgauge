import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject, useLayoutEffect, useRef } from "react";

/**
 * Ultra-smooth section transition.
 *
 * Entry: rises gently from y:24 with a long, buttery ease (1.1s).
 * Exit: dissolves upward quickly (0.55s) so the new section feels instant.
 * The net effect: panels float in and out like they're weightless.
 */
export const useSectionTransition = (
    ref: RefObject<HTMLElement | null>,
    active: boolean,
    entryDuration: number = 2
) => {
    const previousActive = useRef<boolean | null>(null);

    useLayoutEffect(() => {
        if (!ref.current || previousActive.current !== null) return;

        const section = ref.current;
        if (active) {
            gsap.set(section, {
                opacity: 1,
                visibility: "visible",
                pointerEvents: "auto",
                filter: "blur(0px)",
            });
        } else {
            gsap.set(section, {
                opacity: 0,
                visibility: "hidden",
                pointerEvents: "none",
                filter: "blur(0px)",
            });
        }

        previousActive.current = active;
    }, [active, ref]);

    useGSAP(() => {
        if (!ref.current) return;

        const section = ref.current;
        gsap.killTweensOf(section);

        if (previousActive.current === active) {
            return;
        }

        if (active) {
            gsap.set(section, {
                visibility: "visible",
                pointerEvents: "auto",
                willChange: "transform, opacity, filter",
            });

            gsap.fromTo(
                section,
                {
                    opacity: 0,
                    filter: "blur(3px)",
                    transformOrigin: "50% 50%",
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: Math.max(entryDuration, 1.75),
                    ease: "power3.out",
                    overwrite: "auto",
                }
            );
        } else {
            gsap.to(section, {
                opacity: 0,
                filter: "blur(3px)",
                duration: 1.4,
                ease: "power3.out",
                overwrite: "auto",
                onComplete: () => {
                    if (ref.current) {
                        gsap.set(ref.current, {
                            opacity: 0,
                            pointerEvents: "none",
                            filter: "blur(0px)",
                            willChange: "auto",
                        });
                    }
                },
            });
        }

        previousActive.current = active;
    }, { dependencies: [active] });
};
