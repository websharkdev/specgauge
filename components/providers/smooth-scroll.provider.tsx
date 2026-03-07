'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function SmoothScrollProvider({
    children,
}: {
    children: ReactNode
}) {
    return (
        <ReactLenis root
            options={{
                lerp: 0.08, 
                duration: 1.2, 
                syncTouch: true
            }}
        >
            {children}
        </ReactLenis>
    )
}
