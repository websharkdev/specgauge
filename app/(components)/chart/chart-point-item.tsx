'use client'

type Props = {
    color: {
        line: string[],
        point: string,
    }
    direction: 'left' | 'right'
    icon: React.ReactNode
    title: string
}

const ChartPointItem = ({
    color,
    icon,
    title,
    direction = 'left'
}: Props) => {
    return (
        <div className="flex flex-nowrap items-start gap-3">
            {direction === 'left' ? <div className={`flex flex-nowrap items-center min-w-10 gap-0 mt-1`}>
                <div className='flex-1 h-0.5' style={{
                    background: `linear-gradient(to right, ${color.line[0]}, ${color.line[1]})`,
                }} />
                <div className='size-2.5 rounded-full' style={{
                    backgroundColor: color.point,
                }} />
            </div> : null}
            <div className={`flex flex-col gap-2 flex-1 ${direction === 'right' ? 'ml-16' : ''}`}>
                <div className="flex flex-nowrap items-start gap-3 w-full">
                    {icon}
                    {direction === 'right' ? <div className={`flex flex-nowrap items-center w-full gap-0 mt-1`}>
                        <div className='flex-1 h-0.5' style={{
                            background: `linear-gradient(to right, ${color.line[0]}, ${color.line[1]})`,
                            order: 10,
                        }} />
                        <div className='size-2.5 rounded-full' style={{
                            backgroundColor: color.point,
                        }} />
                    </div> : null}
                </div>
                <h4 className="font-semibold text-lg text-gray-700 max-w-36 leading-tight">{title}</h4>
            </div>
        </div>
    )
}

export default ChartPointItem