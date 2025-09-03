import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, BadgeCheck } from "lucide-react";
import Image from "next/image";

const BHero = () => {
    return (
        <div className="w-full h-full min-h-dvh relative flex justify-between items-center max-h-dvh overflow-hidden">
            <div className="w-1/2 h-full min-h-dvh flex relative flex-col justify-end p-11 gap-7" style={{
                background: 'url("/main-header.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Badge variant='outline' className="rounded-full flex items-center gap-2 px-2 py-1.5 mb-2.5 text-white/70 bg-white/5 border-white/10 bg-opacity-40 backdrop-blur-xl bg-blend-multiply">
                    <BadgeCheck size={14} />
                    <span>Beta version is Live!</span>
                </Badge>
                <h1 className="text-6xl flex flex-col"><span className="text-white">Know before they’re low,</span>
                    <span className="text-white/60">stay ahead every time</span>
                </h1>
                <p className="text-white/50 max-w-xs">SpecGauge turns every tank into a connected data source – helping you deliver smarter, faster, and more profitably.</p>
                <div className="flex justify-between items-center w-full">

                    <Button className="max-w-max cursor-pointer text-[#14416C] px-8" variant='secondary'>Request a Demo</Button>
                    <Button size='icon' variant='glass' className="size-10 text-white rounded-full cursor-pointer">
                        <ArrowDownIcon size={14} />
                    </Button>
                </div>
            </div>
            <div className="w-1/2 h-full min-h-dvh flex justify-start items-center relative">

                <div className="absolute inset-0 -z-[5] h-full w-full bg-[#E5E8EF] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_6%,transparent_110%)]"></div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-[#E5E8EF] bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:55px_55px]"></div>
                <Image
                    src='/main-devices.png'
                    alt='Main Devices'
                    width={1158}
                    height={652}
                    className="max-w-3xl object-contain"
                    priority
                />
                <div className="flex-1" />
            </div>
        </div>
    )
}

export default BHero