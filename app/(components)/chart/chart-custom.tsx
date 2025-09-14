"use client"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { motion } from "motion/react";
import { Bar, BarChart, Customized, LabelList } from "recharts";
import { chartData } from "./chart-data";
import { useMediaQuery } from "usehooks-ts";

const renderCustomizedLabel = (props: unknown) => {
    const { x, y, width, fill } = props as { x: number; y: number; width: number; fill: string; };

    const radius = 4;

    if (fill === '#00000035') {
        return null;
    }


    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} z={10} />
        </g>
    );
};

const ChartCustom = ({ data, isInView }: {
    data: {
        id: number;
        icon: React.ReactNode;
        index: number;
        text: string[];
        padding_y: number;
    }[],
    isInView: boolean;
}) => {
    const small = useMediaQuery('(max-width: 786px)')
    const large = useMediaQuery('(min-width: 1920px)')
    // Компонент кастомизации
    const CustomCards = ({ bars }: {
        bars: { x: number; y: number; width: number; height: number; fill: string; }[]
    }) => {
        return (
            <g>
                {data.map((card) => {
                    const bar = bars[card.index];
                    if (!bar) return null;

                    const { x, y, width: barWidth } = bar;
                    const centerX = x + barWidth / 2;
                    const topY = y; // Позиция карточки над баром
                    const Icon = () => card.icon;

                    const height = 3

                    const multiplyer = large ? 0.15 : 0.03
                    const addH = window.innerHeight * multiplyer

                    return (
                        <g key={card.index}>
                            <motion.rect
                                x={centerX - .5}
                                y={topY - card.padding_y - height - addH}
                                width={1}
                                height={card.padding_y + height + addH}
                                fill="white"
                                fillOpacity={0.8}
                                stroke="black"
                                strokeOpacity={0.2}
                                z={-1}
                                initial={{ opacity: 0, y: height }}
                                animate={isInView ? {
                                    opacity: 1,
                                    y: 0,
                                } : {}}
                                transition={{
                                    duration: .5,
                                    delay: card.index * 0.025,
                                    ease: 'easeInOut',
                                }}
                                className={`h-ds-[${card.padding_y + height}]`}
                            />
                            {/* Иконка */}
                            {/* Вставка SVG-иконки */}
                            <motion.g transform={`translate(${centerX + 12}, ${topY - height - card.padding_y - addH})`}
                                initial={{ opacity: 0, }}
                                animate={isInView ? { opacity: 1, } : {}}
                                transition={{
                                    duration: .5,
                                    delay: 0.1 + card.index * 0.025,
                                    ease: 'linear'
                                }}
                            >
                                <Icon />
                            </motion.g>

                            <motion.text
                                x={centerX}
                                y={topY - card.padding_y + 32 - addH}
                                className="text-base leading-[90%] font-medium md:text-ds-[16]"
                                initial={{ opacity: 0, y: height }}
                                animate={isInView ? {
                                    opacity: 1,
                                    y: 0,
                                } : {}}
                                transition={{
                                    duration: .5,
                                    delay: .1 + card.index * 0.025,
                                    ease: 'linear'
                                }}
                            >
                                {card.text.map((line, index) => (
                                    <tspan key={index} x={centerX + 12} dy={small ? index === 0 ? 0 : 14 : window.innerHeight * 0.02} fill="#111111">
                                        {line}
                                    </tspan>
                                ))}
                            </motion.text>
                        </g>
                    );
                })}
            </g>
        );
    };

    return (<ChartContainer config={{} satisfies ChartConfig} className="h-ds-[600] w-full relative ">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 50 }} >
            <Bar dataKey="point" fill="var(--color-point)" style={{}} radius={1} barSize={1.5}>
                <LabelList dataKey="point" content={renderCustomizedLabel} />
            </Bar>
            <Customized
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={(props: any) => <CustomCards {...props} bars={props.formattedGraphicalItems[0]!.props.data.map((_: any, i: number) => props.formattedGraphicalItems[0]!.props.data[i])} />}
            />
        </BarChart>
    </ChartContainer >
    )
}

export default ChartCustom