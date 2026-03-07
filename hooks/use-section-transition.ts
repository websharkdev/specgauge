import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

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
    useGSAP(() => {
        if (!ref.current) return;

        if (active) {
            gsap.set(ref.current, { visibility: "visible", pointerEvents: "auto" });

            gsap.fromTo(
                ref.current,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: entryDuration,
                    // Custom cubic-bezier: starts very slow, accelerates mid-way,
                    // glides to rest — the "floating in" feel
                    ease: "power4.inOut",
                    overwrite: "auto",
                }
            );
        } else {
            gsap.to(ref.current, {
                opacity: 0,
                y: -16,
                duration: 1,
                ease: "power4.inOut",
                overwrite: "auto",
                onComplete: () => {
                    if (ref.current) {
                        gsap.set(ref.current, { visibility: "hidden", pointerEvents: "none", y: 0 });
                    }
                },
            });
        }
    }, { dependencies: [active] });
};
