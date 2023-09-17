import React, { useState,useEffect } from 'react';
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
} from 'chart.js';
import { Chart, Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// To get this to work properly, you need to have your api running
// There should be an express api attached to this project in /api
// Go there and do 'npm start'. The api should be running on port 9000
function DemographicChart(props) {
  const [apiResponse, setApiResponse] = useState([]);
  const [apiState, setApiState] = useState(0);//0,1,2
  const [resultText, setResultText] = useState('xxx');


  const handleResults = (res) => {
    let html = '';

    if(res?.data){
      for(let i=0;i<res.data.length;i++){
          html = html + '<div>' + res.data[i][9] + '</div>';
      }
    }

    // This thing is so fast I have to hard code a delay so we can see the spinner.
    setTimeout(function()
    {
      setApiState(2);
      setResultText(html);
    }, 2000);

  }

  const callApi = (e) => {
    setApiState(1);
    fetch("https://data.cityofnewyork.us/api/views/hebw-6hze/rows.json")
      .then(res => res.json())
      .then(res => handleResults(res))
      .catch(error => {
        setApiState(2);
        setResultText('API Error. ' + error);
      });

  }

  // useEffect with [] is the same as componentWillMount
  useEffect(() => {
    //callApi();
  },[]);

  const growSpinner = () => {
    return <Spinner animation="grow" />;
  }

  // 0 = initial, 1=clicked, 2=data received
  const conditionalRender = () => {
    if(apiState===0){
      return <Button variant="primary" onClick={callApi}>Load Data</Button>;
    }else if(apiState===1){
      return growSpinner();
    }else{
      return <p className="App-intro"><div dangerouslySetInnerHTML={{ __html: resultText }} style={{'height':'100px'}} className="overflow-auto"/></p>
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10,30,44,77,88,22,99],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [15,45,4,45,22,11,79],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
  <>
      <h3>Chart - Sample</h3>
      <p className="App-intro">Made with React Chart.js. Hard-coded data. No API.</p>
      <Bar options={options} data={data} />
  </>
  );
}

export default DemographicChart;
