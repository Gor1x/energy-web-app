import { React, useEffect, useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import GridLayout from 'react-grid-layout';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

const DatasetTab = (props) => {
  const exampleHeader = ['datetime', 'season', 'holiday', 'workingday', 'weather',
    'temp', 'atemp', 'humidity', 'windspeed', 'casual', 'registered', 'count'];
  const exampleData = [
    ['2011-01-01', 1, 0, 0, 1, 9.84, 14.395, 81, 0, 3, 13, 16],
    ['2011-01-02', 1, 0, 0, 1, 9.02, 13.635, 80, 0, 8, 32, 40],
    ['2011-01-03', 1, 0, 0, 1, 9.02, 13.635, 80, 0, 5, 27, 32],
    ['2011-01-04', 1, 0, 0, 1, 9.84, 14.395, 75, 0, 3, 10, 13],
    ['2011-01-05', 1, 0, 0, 1, 9.84, 14.395, 75, 0, 0, 1, 1],
    ['2011-01-06', 1, 0, 0, 2, 9.84, 12.88, 75, 6.0032, 0, 1, 1],
    ['2011-01-07', 1, 0, 0, 1, 9.02, 13.635, 80, 0, 2, 0, 2]
  ];

  const [layout, setLayout] = useState([
    { "w": 7, "h": 6, "x": 0, "y": 7, "i": "a" },
    { "w": 4, "h": 5, "x": 7, "y": 0, "i": "b" },
    { "w": 7, "h": 7, "x": 0, "y": 0, "i": "c" }
]);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Открыть
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>График</Dropdown.Item>
          <Dropdown.Item>Таблица</Dropdown.Item>
          <Dropdown.Item>Запустить алгоритм</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <GridLayout
        layout={layout}
        className="layout"
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={(layout, layouts) => {
          console.log(layout)
          setLayout(layout)}}>
        <div style={{ 'paddingRight': '30px' }} className='roundbox' key="a">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              key={'temperature'}
              data={exampleData.map(row => { return { 'date': row[0], 'value': row[5] } })}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line name={'temperature'} type="monotone" dataKey="value" stroke="#8884d8" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='roundbox' key="b">
          результат запуска какого-то алгоритма датасете
        </div>
        <div style={{'overflow': 'scroll'}} className='roundbox' key="c">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                {exampleHeader.map(name => <th>{name}</th>)}
              </tr>
            </thead>
            <tbody>
              {exampleData.map((row, i) => 
                <tr>
                  <td>{i + 1}</td>
                  {row.map(value => <td>{value}</td>)}
                </tr>)}
            </tbody>
          </Table>
        </div>
      </GridLayout>
    </div>
  );
}

export default DatasetTab;