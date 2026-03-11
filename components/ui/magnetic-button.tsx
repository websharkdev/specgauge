'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Button, ButtonProps } from './button';

interface MagneticButtonProps extends ButtonProps{
    strength?: number;
}

export default function MagneticButton({
    strength = 30,
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!buttonRef.current || !textRef.current) return;

        const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        if (!mediaQuery.matches) return;

        const button = buttonRef.current;
        const text = textRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = button.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const maxDistance = Math.max(width, height);
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            const pullX = (distanceX / maxDistance) * strength;
            const pullY = (distanceY / maxDistance) * strength;

            gsap.to(button, {
                x: pullX,
                y: pullY,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.to(text, {
                x: pullX * 1.5,
                y: pullY * 1.5,
                duration: 1,
                ease: 'power3.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to([button, text], {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.4)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: buttonRef });

    return (
        <Button
            ref={buttonRef}
            {...props}
        >
            <span ref={textRef} className="block pointer-events-none">
                {props.children}
            </span>
        </Button>
    );
}
