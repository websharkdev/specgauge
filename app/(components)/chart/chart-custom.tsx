"use client"


import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, Customized, LabelList } from "recharts";
import { chartData } from "./chart-data";

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

const ChartCustom = ({ data }: {
    data: {
        id: number;
        icon: React.ReactNode;
        index: number;
        text: string[];
        padding_y: number;
    }[]
}) => {
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

                    return (
                        <g key={card.index}>
                            <rect
                                x={centerX - .5}
                                y={topY - card.padding_y - 58}
                                width={1}
                                height={card.padding_y + 50}
                                fill="white"
                                fillOpacity={0.8}
                                stroke="black"
                                strokeOpacity={0.2}
                                z={-1}
                            />
                            {/* Иконка */}
                            {/* Вставка SVG-иконки */}
                            <g transform={`translate(${centerX + 40}, ${topY - 70 - card.padding_y})`}>
                                <Icon />
                            </g>

                            <text
                                x={centerX}
                                y={topY - card.padding_y - 20}
                                className="text-sm leading-snug font-medium"
                            >
                                {card.text.map((line, index) => (
                                    <tspan key={index} x={centerX + 40} dy={index === 0 ? 0 : '1.2em'} fill="#111111">
                                        {line}
                                    </tspan>
                                ))}
                            </text>
                        </g>
                    );
                })}
            </g>
        );
    };

    return (<ChartContainer config={{} satisfies ChartConfig} className="h-[750px] w-full relative" >
        <BarChart accessibilityLayer data={chartData} margin={{ top: 50 }} >
            <Bar dataKey="point" fill="var(--color-point)" radius={1} barSize={1.5}>
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