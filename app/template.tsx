import { Header } from "@/components/general/header";
import { Toaster } from "@/components/ui/sonner"

const Template = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div className="flex flex-col flex-nowrap relative w-full h-full min-h-dvh">
            <Header />

            {children}

            <Toaster />
        </div>
    );
};

export default Template;
