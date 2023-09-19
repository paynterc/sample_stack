import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Chart, Bar, Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);
// To get this to work properly, you need to have your api running
// There should be an express api attached to this project in /api
// Go there and do 'npm start'. The api should be running on port 9000
function ChartCalc(props) {
  const dataStatus = useSelector(state => state.lifeforms.status);
  const chartData = useSelector(state => state.lifeforms.data);
  const [preparedData, setPreparedData] = useState([]);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population by Week',
      },
    },
  };

  const labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

  let data = {
    labels,
    datasets: preparedData,
  };

  // datasets: [
  //   {
  //     label: 'Strawberries',
  //     data: [10,30,44,77,88,22,99],
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   },
  //   {
  //     label: 'Blueberries',
  //     data: [15,45,4,45,22,11,79],
  //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //   },
  // ],

  const chartColors = {'Wolf Spider':'rgba(178, 147, 125, .75)','Cricket':'rgba(118, 159, 181, .75)','Aphid':'rgba(129, 161, 138, .75)','Milkweed':'rgba(255, 99, 132, 0.75)'};

  const prepareChartData = () => {
      if(chartData?.length){
        let newData = [];
        for(let i = 0; i<chartData?.length; i++){
            let row = chartData[i];
            if(row.type==='population'){
              let dataSet = {
                label:row.life_form,
                data: [row.w1,row.w2,row.w3,row.w4,row.w5,row.w6,row.w7],
                backgroundColor: chartColors[row.life_form],
                fill: true
              }
              newData.push(dataSet);
            }

        }
        setPreparedData(newData);
      }
  }



  useEffect(() => {
        prepareChartData();
  }, [chartData]);

  return (
  <>
      <h3>Chart - Sample</h3>
      <p className="App-intro">Made with React Chart.js. Data is from a Redux store shared with the Calculation Grid below.</p>
      <Line options={options} data={data} />
  </>
  );
}

export default ChartCalc;
