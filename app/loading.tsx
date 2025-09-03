import { IconSizeDefault, IconStrokeWidthDefault } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

const loading = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2
                size={IconSizeDefault}
                strokeWidth={IconStrokeWidthDefault}
                className="animate-spin"
            />
        </div>
    );
};

export default loading;
