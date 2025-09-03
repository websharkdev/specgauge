"use client"


import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { Fragment } from "react";
import { Bar, BarChart, Customized, LabelList, Text, Tooltip } from "recharts";


const chartConfig = {} satisfies ChartConfig


const chartData = [
    { label: 'default', fill: '#00000035', point: 170 },
    { label: 'default', fill: '#00000035', point: 175 },
    { label: 'default', fill: '#00000035', point: 180 },
    { label: 'special', fill: '#F14616', point: 184 },
    { label: 'default', fill: '#00000035', point: 188 },
    { label: 'default', fill: '#00000035', point: 192 },
    { label: 'default', fill: '#00000035', point: 195 },
    { label: 'default', fill: '#00000035', point: 198 },
    { label: 'default', fill: '#00000035', point: 201 },
    { label: 'default', fill: '#00000035', point: 203 },
    { label: 'default', fill: '#00000035', point: 205 },
    { label: 'default', fill: '#00000035', point: 206 },
    { label: 'default', fill: '#00000035', point: 207 },
    { label: 'default', fill: '#00000035', point: 208 },
    { label: 'default', fill: '#00000035', point: 207 },
    { label: 'default', fill: '#00000035', point: 206 },
    { label: 'default', fill: '#00000035', point: 204 },
    { label: 'default', fill: '#00000035', point: 201 },
    { label: 'default', fill: '#00000035', point: 198 },
    { label: 'default', fill: '#00000035', point: 194 },
    { label: 'default', fill: '#00000035', point: 190 },
    { label: 'default', fill: '#00000035', point: 185 },
    { label: 'default', fill: '#00000035', point: 179 },
    { label: 'special', fill: '#F14616', point: 173 },
    { label: 'default', fill: '#00000035', point: 167 },
    { label: 'default', fill: '#00000035', point: 160 },
    { label: 'default', fill: '#00000035', point: 152 },
    { label: 'default', fill: '#00000035', point: 145 },
    { label: 'default', fill: '#00000035', point: 137 },
    { label: 'default', fill: '#00000035', point: 129 },
    { label: 'default', fill: '#00000035', point: 121 },
    { label: 'default', fill: '#00000035', point: 113 },
    { label: 'default', fill: '#00000035', point: 106 },
    { label: 'default', fill: '#00000035', point: 98 },
    { label: 'default', fill: '#00000035', point: 91 },
    { label: 'default', fill: '#00000035', point: 84 },
    { label: 'default', fill: '#00000035', point: 77 },
    { label: 'default', fill: '#00000035', point: 71 },
    { label: 'default', fill: '#00000035', point: 65 },
    { label: 'default', fill: '#00000035', point: 59 },
    { label: 'default', fill: '#00000035', point: 54 },
    { label: 'default', fill: '#00000035', point: 50 },
    { label: 'special', fill: '#F14616', point: 46 },
    { label: 'default', fill: '#00000035', point: 43 },
    { label: 'default', fill: '#00000035', point: 40 },
    { label: 'default', fill: '#00000035', point: 38 },
    { label: 'default', fill: '#00000035', point: 36 },
    { label: 'default', fill: '#00000035', point: 35 },
    { label: 'default', fill: '#00000035', point: 34 },
    { label: 'default', fill: '#00000035', point: 34 },
    { label: 'default', fill: '#00000035', point: 35 },
    { label: 'default', fill: '#00000035', point: 36 },
    { label: 'default', fill: '#00000035', point: 38 },
    { label: 'default', fill: '#00000035', point: 41 },
    { label: 'default', fill: '#00000035', point: 44 },
    { label: 'default', fill: '#00000035', point: 49 },
    { label: 'default', fill: '#00000035', point: 54 },
    { label: 'default', fill: '#00000035', point: 60 },
    { label: 'default', fill: '#00000035', point: 67 },
    { label: 'default', fill: '#00000035', point: 75 },
    { label: 'default', fill: '#00000035', point: 84 },
    { label: 'default', fill: '#00000035', point: 93 },
    { label: 'default', fill: '#00000035', point: 104 },
    { label: 'default', fill: '#00000035', point: 115 },
    { label: 'default', fill: '#00000035', point: 126 },
    { label: 'default', fill: '#00000035', point: 138 },
    { label: 'default', fill: '#00000035', point: 161 },
    { label: 'default', fill: '#00000035', point: 173 },
    { label: 'default', fill: '#00000035', point: 184 },
    { label: 'special', fill: '#0B9C36', point: 194 },
    { label: 'default', fill: '#00000035', point: 203 },
    { label: 'default', fill: '#00000035', point: 211 },
    { label: 'default', fill: '#00000035', point: 218 },
    { label: 'default', fill: '#00000035', point: 223 },
    { label: 'default', fill: '#00000035', point: 228 },
    { label: 'default', fill: '#00000035', point: 231 },
    { label: 'default', fill: '#00000035', point: 233 },
    { label: 'default', fill: '#00000035', point: 233 },
    { label: 'default', fill: '#00000035', point: 232 },
    { label: 'default', fill: '#00000035', point: 230 },
    { label: 'default', fill: '#00000035', point: 226 },
    { label: 'default', fill: '#00000035', point: 221 },
    { label: 'default', fill: '#00000035', point: 214 },
    { label: 'default', fill: '#00000035', point: 205 },
    { label: 'default', fill: '#00000035', point: 196 },
    { label: 'default', fill: '#00000035', point: 186 },
    { label: 'default', fill: '#00000035', point: 177 },
    { label: 'default', fill: '#00000035', point: 169 },
    { label: 'special', fill: '#0B9C36', point: 163 },
    { label: 'default', fill: '#00000035', point: 158 },
    { label: 'default', fill: '#00000035', point: 155 },
    { label: 'default', fill: '#00000035', point: 153 },
    { label: 'default', fill: '#00000035', point: 153 },
    { label: 'default', fill: '#00000035', point: 154 },
    { label: 'default', fill: '#00000035', point: 156 },
    { label: 'default', fill: '#00000035', point: 159 },
    { label: 'default', fill: '#00000035', point: 165 },
    { label: 'default', fill: '#00000035', point: 172 },
    { label: 'default', fill: '#00000035', point: 181 },
    { label: 'default', fill: '#00000035', point: 192 },
    { label: 'default', fill: '#00000035', point: 206 },
    { label: 'default', fill: '#00000035', point: 222 },
    { label: 'default', fill: '#00000035', point: 241 },
    { label: 'default', fill: '#00000035', point: 262 },
    { label: 'default', fill: '#00000035', point: 286 },
    { label: 'default', fill: '#00000035', point: 311 },
    { label: 'default', fill: '#00000035', point: 338 },
    { label: 'default', fill: '#00000035', point: 364 },
    { label: 'special', fill: '#0B9C36', point: 391 },
    { label: 'default', fill: '#00000035', point: 416 },
    { label: 'default', fill: '#00000035', point: 440 },
    { label: 'default', fill: '#00000035', point: 462 },
    { label: 'default', fill: '#00000035', point: 481 },
    { label: 'default', fill: '#00000035', point: 498 },
    { label: 'default', fill: '#00000035', point: 513 },
    { label: 'default', fill: '#00000035', point: 526 },
    { label: 'default', fill: '#00000035', point: 536 },
    { label: 'default', fill: '#00000035', point: 545 },
    { label: 'default', fill: '#00000035', point: 552 },
    { label: 'default', fill: '#00000035', point: 558 },
    { label: 'default', fill: '#00000035', point: 562 },
    { label: 'default', fill: '#00000035', point: 565 },
    { label: 'default', fill: '#00000035', point: 567 },
    { label: 'default', fill: '#00000035', point: 569 },
    { label: 'default', fill: '#00000035', point: 569 },
    { label: 'default', fill: '#00000035', point: 568 },
    { label: 'default', fill: '#00000035', point: 567 },
    { label: 'default', fill: '#00000035', point: 565 },
    { label: 'default', fill: '#00000035', point: 562 },
    { label: 'default', fill: '#00000035', point: 559 },
    { label: 'default', fill: '#00000035', point: 555 },
    { label: 'default', fill: '#00000035', point: 550 }
];




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
    const CustomCards = ({ width, height, bars }: any) => {
        return (
            <g width={156}>
                {data.map((card) => {
                    const bar = bars[card.index];
                    if (!bar) return null;

                    const { x, y, width: barWidth, height: barHeight } = bar;
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

    return (<ChartContainer config={chartConfig} className="h-[750px] w-full relative" >
        <BarChart accessibilityLayer data={chartData} margin={{ top: 50 }} >
            <Bar dataKey="point" fill="var(--color-point)" radius={1} barSize={1.5}>
                <LabelList dataKey="point" content={renderCustomizedLabel} />
            </Bar>
            <Customized
                component={(props: any) => <CustomCards {...props} bars={props.formattedGraphicalItems[0]!.props.data.map((_: any, i: number) => props.formattedGraphicalItems[0]!.props.data[i])} />}
            />
        </BarChart>
    </ChartContainer >
    )
}

export default ChartCustom