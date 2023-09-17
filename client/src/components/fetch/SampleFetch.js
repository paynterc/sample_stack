import React, { useState,useEffect } from 'react';

// To get this to work properly, you need to have your api running
// There should be an express api attached to this project in /api
// Go there and do 'npm start'. The api should be running on port 9000
function SampleFetch(props) {
  const [apiResponse, setApiResponse] = useState('');


  const callApi = (e) => {

    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(error => {
      setApiResponse('API Error. You might need to start your api on port 9000. Go to /api and run npm start.')
      });

  }

  // useEffect with [] is the same as componentWillMount
  useEffect(() => {
    callApi();
  },[]);

  return (
  <>
      <h3>API Fetch</h3>
      <p className="App-intro">{apiResponse}</p>

  </>
  );
}

export default SampleFetch;
