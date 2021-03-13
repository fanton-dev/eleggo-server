import React from 'react'
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Plot = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    socket.on("eeg", response => {
      setData(currentData => [...currentData, response]);
    })
  }, []);

  console.log(data)
  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};
export default Plot
