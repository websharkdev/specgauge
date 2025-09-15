"use client"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { motion } from "motion/react";
import { Bar, BarChart, Customized, LabelList, ResponsiveContainer, YAxis } from "recharts";
import { chartData } from "./chart-data";
import { useMediaQuery } from "usehooks-ts";
import { useMemo } from "react";

const renderCustomizedLabel = (props: unknown) => {
    const { x, y, width, fill } = props as { x: number; y: number; width: number; fill: string; };

    const radius = 3;

    if (fill === '#00000035') {
        return null;
    }


    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} z={25} />
        </g>
    );
};

const ChartCustom = ({ data, isInView }: {
    data: {
        id: number;
        icon: any;
        index: number;
        color: string;
        text: string[];
        padding_y: number;
    }[],
    isInView: boolean;
}) => {
    const extra = useMediaQuery('(min-width: 1529px)')
    const large = useMediaQuery('(max-width: 1528px)')
    const small = useMediaQuery('(max-width: 786px)')

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
                    const Icon = card.icon;

                    const height = 3

                    const multiplyer = extra ? 0.18 : large ? 0.1 : 0.03

                    const addH = window.innerHeight * multiplyer

                    return (
                        <g key={card.index}>
                            <motion.rect
                                x={centerX - .5}
                                y={topY - card.padding_y - height - addH}
                                width={1}
                                height={card.padding_y + height + addH - 6.5}
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
                                    delay: 0.8 + card.index * 0.002,
                                    ease: 'easeIn',
                                }}
                            />
                            {/* Иконка */}
                            {/* Вставка SVG-иконки */}
                            <motion.g transform={`translate(${centerX + 12}, ${topY - height - card.padding_y - addH})`}
                                initial={{ opacity: 0, }}
                                animate={isInView ? { opacity: 1, } : {}}
                                transition={{
                                    duration: .5,
                                    delay: 0.5 + card.index * 0.025,
                                    ease: 'easeIn'
                                }}
                            >
                                <Icon size={14} className={`chart-icon__special text-[${card.color}]`} />
                            </motion.g>

                            <motion.text
                                x={centerX}
                                y={topY - card.padding_y + 32 - addH}
                                className="text-base leading-[90%] font-medium sm:text-ds-[16]"
                                initial={{ opacity: 0, y: height }}
                                animate={isInView ? {
                                    opacity: 1,
                                    y: 0,
                                } : {}}
                                transition={{
                                    duration: .5,
                                    delay: .5 + card.index * 0.025,
                                    ease: 'easeIn'
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


    const memorized = useMemo(() => {
        if (large) {
            return chartData.map((i) => {
                return {
                    ...i,
                    point: i.point / 100
                }
            })
        }
        if (extra) {
            return chartData.map((i) => {
                return {
                    ...i,
                    point: i.point / 100
                }
            })
        }
        if (small) {
            return chartData.map((i) => {
                return {
                    ...i,
                    point: i.point / 200
                }
            })
        }

        return chartData
    }, [chartData])

    const barSize = extra ? 2.5 : large ? 2 : small ? 1.5 : 1

    return (
        <ResponsiveContainer className="pointer-events-none absolute inset-0 mt-auto -bottom-2 max-h-[90vh]">
            <ChartContainer config={{} satisfies ChartConfig} className="h-full mt-auto w-full relative">
                <BarChart data={memorized}>
                    <Bar dataKey="point" fill="var(--color-point)" radius={1} barSize={barSize}>
                        <LabelList dataKey="point" content={renderCustomizedLabel} />
                    </Bar>
                    <Customized
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        component={(props: any) => <CustomCards {...props} bars={props.formattedGraphicalItems[0]!.props.data.map((_: any, i: number) => props.formattedGraphicalItems[0]!.props.data[i])} />}
                    />
                </BarChart>
            </ChartContainer>
        </ResponsiveContainer >
    )
}

export default ChartCustom