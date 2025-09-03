'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Error = (error: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <div className="container relative z-50 mx-auto flex flex-nowrap items-center justify-center gap-10">
                <div className="rounded-xl border border-input bg-stone-50 px-10 py-2">
                    <p className="text-[10vw]">OOOOOPS!!!</p>
                </div>
                <div className="grid max-w-md grid-cols-1 gap-5">
                    <h2 className="text-4xl">
                        <span className="uppercase">ERROR:</span> {error.error.name}
                    </h2>
                    <p className="font-mono text-sm font-medium">{error.error.message}</p>
                    <p className="font-mono text-xs font-medium">
                        Error ID: {error.error.digest}
                    </p>
                    <Button onClick={() => error.reset()}>Try again</Button>
                </div>
            </div>
        </div>
    );
}

export default Error;
