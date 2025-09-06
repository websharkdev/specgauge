'use client'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { Menu } from "lucide-react"

const menu = ['Home', 'Features', 'Product', 'Why Us', 'Contact']

const MobileHeader = () => {
    return (
        <Drawer>
            <DrawerTrigger className="cursor-pointer size-10 flex justify-center items-center rounded-full bg-[#11111110] hover:bg-[#11111120]">
                <Menu size={20} />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="sr-only">
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div className="flex">
                    <h4>Test</h4>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileHeader