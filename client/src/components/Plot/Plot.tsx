import React from 'react'
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { io } from 'socket.io-client'
import styles from './Plot.module.css';

const socket = io('http://localhost:5000')

const Plot = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    socket.on("eeg", (receivedData) => {
      setData((currentData) => [...currentData, receivedData]);
    })
  }, []);

  return (
    <div className={styles.chart}>
      <LineChart width={1500} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" stroke="#339C5E" />
      </LineChart>
    </div>
  );
};
export default Plot
