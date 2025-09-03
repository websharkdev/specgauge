import { Header } from "@/components/general/header";


const Template = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col gap-2.5 relative w-full h-full min-h-dvh">
            <Header />
            {children}
        </div>
    );
};

export default Template;
