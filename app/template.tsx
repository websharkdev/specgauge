'use client'

import { Header } from "@/components/general/header";
import {
    useScroll,
    useSpring
} from "motion/react";
import { useEffect, useRef, useState } from "react";


const Template = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const scrollY = useRef(0);
    const [progress, setProgress] = useState<number>(scrollY.current);

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        const unsubscribe = scaleX.on("change", (v) => {
            scrollY.current = v;
        });
        return () => unsubscribe();
    }, [scaleX]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(Math.round(scrollY.current * 100));
        }, 100); // Update every 100ms

        return () => clearInterval(interval);
    }, [scrollY]);

    return (
        <div className="flex flex-col gap-2.5 relative w-full h-full min-h-dvh">
            <Header progress={progress} />

            {children}
        </div>
    );
};

export default Template;
