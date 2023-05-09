import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import GridLayout from 'react-grid-layout';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const DatasetTab = (props) => {
    const exampleDataSnippet = [
        {'date': '13-05-22', 'value': 1.0},
        {'date': '14-05-22', 'value': 5.0},
        {'date': '15-05-22', 'value': 2.0}, 
        {'date': '16-05-22', 'value': 3.0}, 
        {'date': '17-05-22', 'value': 4.0}
    ]
    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='roundbox' key="b" data-grid={{ x: 0, y: 5, w: 6, h: 6, minW: 2, maxW: 4 }}>
           график по какому-то столбцу датасета
           <LineChart key={'temperature'} width={500} height={200}
                data={exampleDataSnippet}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line name={'temperature'} type="monotone" dataKey="value" stroke="#8884d8" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
            </LineChart>
          </div>
          <div className='roundbox' key="c" data-grid={{ x: 0, y: 11, w: 3, h: 4, minW: 2, maxW: 4 }}>
            результат запуска какого-то алгоритма датасете
          </div>
          <div className='roundbox' key="d" data-grid={{ x: 6, y: 0, w: 4, h: 12 }}>
            строки датасета
          </div>
        </GridLayout>
    );
}

export default DatasetTab;