'use client'

import FormBackground from "./form-background"
import GForm from "./form-general"

const BForm = () => {
    return (
        <div className="w-full flex items-center min-h-dvh h-full flex-col pt-20 pb-10 justify-between relative overflow-hidden">
            <div className="flex flex-col items-center max-w-sm h-full w-full">
                <h5 className="text-transparent text-center bg-clip-text bg-gradient-to-r from-[#0B9C36] to-[#175F49]">Real-Time Advantage</h5>
                <h2 className="text-4xl font-medium leading-snug text-[#111111] text-center mt-4 mb-5">Ready to transform your oil delivery?</h2>
                <p className="text-sm text-center text-[#111111] opacity-50 max-w-72">Stop firefighting emergencies. Start planning profitable runs. With SpecGauge, you’ll always know before they’re low.</p>
            </div>
            <GForm />

            <h6 className="text-xs text-[#11111150]">© SpecGauge. All rights reserved.</h6>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
                <FormBackground />
            </div>
        </div>
    )
}

export default BForm