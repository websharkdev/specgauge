'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function SmoothScrollProvider({
    children,
}: {
    children: ReactNode
}) {
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
        const updateEnabled = () => setEnabled(mediaQuery.matches)

        updateEnabled()
        mediaQuery.addEventListener('change', updateEnabled)

        return () => mediaQuery.removeEventListener('change', updateEnabled)
    }, [])

    // Disable Lenis for now as GSAP Observer is handling scroll transitions
    return children

    return (
        <ReactLenis root
            options={{
                lerp: 0.06,
                duration: 1.2,
                syncTouch: true
            }}
        >
            {children}
        </ReactLenis>
    )
}
