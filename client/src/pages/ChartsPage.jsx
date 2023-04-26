import { React, useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ChartsPage = () => {
    const [meteoTest, setMeteoTest] = useState(null);

    useEffect(() => {
        fetch("/meteo_test").then(response =>
            response.json().then(data => {
                setMeteoTest(data.data);
            })
        );
    }, []);

    var charts = [];
    if (meteoTest) {
        Object.entries(meteoTest).map(([columnName, columnData]) => {
            charts.push(
                <LineChart key={columnName} width={1000} height={200} data={columnData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line name={columnName} type="monotone" dataKey="value" stroke="#8884d8" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                </LineChart>
            );
        })
    }
    return (<div> {charts} </div>);
}

export default ChartsPage;