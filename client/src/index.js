import { React, useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

const App = () => {
    const data = [
        {"date": "22-02-01", "val": 3.0}, 
        {"date": "22-02-02", "val": 5.0}, 
        {"date": "22-02-03", "val": 2.0}, 
        {"date": "22-02-04", "val": 4.0}, 
        {"date": "22-02-05", "val": 1.0}
    ];


    return (
        <div className="app"> 
<LineChart width={500} height={300} data={data}>
    <XAxis dataKey="date"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="val" stroke="#8884d8" />
    <Tooltip/>
  </LineChart>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));