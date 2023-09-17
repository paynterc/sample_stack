import React, { useState,useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';


function LotteryNumbersFetch(props) {
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
    fetch("https://data.ny.gov/api/views/5xaw-6ayf/rows.json")
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

  return (
  <>
      <h3>API - Lottery Numbers</h3>
      <p className="App-intro">Lottery Mega Millions Winning Numbers: Beginning 2002</p>
      {conditionalRender()}
  </>
  );
}

export default LotteryNumbersFetch;
