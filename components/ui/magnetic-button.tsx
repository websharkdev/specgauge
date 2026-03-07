'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    strength = 30
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useGSAP(() => {
        if (!buttonRef.current || !textRef.current) return;

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

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            gsap.to([button, text], {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: 'elastic.out(1, 0.4)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: buttonRef });

    return (
        <button
            ref={buttonRef}
            className={`cursor-pointer ${className}`}
            onClick={onClick}
        >
            <span ref={textRef} className="block pointer-events-none">
                {children}
            </span>
        </button>
    );
}
