'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartComponentProps {
  data: unknown[];
  xAxisKey: string; 
  barDataKeys: { key: string, name: string, fill: string }[];
  height: number;
  width: string;
}

export function ChartComponent(chartProps:BarChartComponentProps) {
   return (
    <ResponsiveContainer width={chartProps.width} height={chartProps.height}>
      <BarChart
        data={chartProps.data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chartProps.xAxisKey} />
        <YAxis />
        <Tooltip labelStyle={{ color: '#696d6b' }}  />
        <Legend />
        {chartProps.barDataKeys.map((bar, index) => (
          <Bar key={index} dataKey={bar.key} fill={bar.fill} name={bar.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
