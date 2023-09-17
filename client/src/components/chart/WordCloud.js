import React, { useState,useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Text from '@visx/text/lib/Text';
import ReactWordcloud from 'react-wordcloud';

function WordCloud(props) {
  const [apiResponse, setApiResponse] = useState([]);
  const [apiState, setApiState] = useState(0);//0,1,2
  const [resultText, setResultText] = useState('');
  const [wordMap, setWordMap] = useState([{'text':'', 'value':0}]);

  interface WordData {
    text: string;
    value: number;
  }
  function wordFreq(words): WordData[] {
    const freqMap: Record<string, number> = {};

    for (const w of words) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }
    return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
  }

  const handleResults = (res) => {
    let numArray = [];

    if(res?.data){
      for(let i=0;i<res.data.length;i++){
        let nums = res.data[i][9].split(" ");
        numArray = numArray.concat(nums);
      }
    }

    const resultMap = wordFreq(numArray);

    // This thing is so fast I have to hard code a delay so we can see the spinner.
    setTimeout(function()
    {
      setApiState(2);
      setWordMap(resultMap);
    }, 500);

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
  const colors = ['#143059', '#2F6B9A', '#82a6c2'];
  const options = {
    rotations: 2,
    rotationAngles: [0, 0],
    colors: colors,
    fontSizes: [24, 48],
    padding: 4
  };

  // 0 = initial, 1=clicked, 2=data received
  const conditionalRender = () => {
    if(apiState===0){
      return <Button variant="primary" onClick={callApi}>Load Data</Button>;
    }else if(apiState===1){
      return growSpinner();
    }else{
      let someWords = ["alpha","beta","gamma"];
      return <ReactWordcloud words={wordMap} options={options}  />
    }
  }

  //const wordMap = [{'text':'alpha', 'value':30},{'text':'beta', 'value':15},{'text':'gamma', 'value':60}];

  return (
  <>
      <h3>API - WordCloud - Lottery Numbers</h3>
      <p className="App-intro">Lottery Mega Millions Winning Number Beginning 2002. Sized by Frequency.</p>
      {conditionalRender()}
  </>
  );
}

export default WordCloud;
