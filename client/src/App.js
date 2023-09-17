import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Stack} from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';
import Filters from './components/filters/Filters.js';
import SampleForm from './components/form/SampleForm.js';
import SampleFetch from './components/fetch/SampleFetch.js';
import LotteryNumbersFetch from './components/fetch/LotteryNumbersFetch.js';
import SampleChart from './components/chart/SampleChart.js';
import WordCloud from './components/chart/WordCloud.js';
import GridBasic from './components/grid/GridBasic.js';
import GridCalc from './components/grid/GridCalc.js';
import ChartCalc from './components/chart/ChartCalc.js';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        React Showcase
      </header>
      <main>
        <section>
            <Container fluid>
            <div className="topic">
              <Stack direction="horizontal">
                  <Col></Col>
                  <Col sm={4}>
                      <ChartCalc />
                  </Col>
                  <Col></Col>
              </Stack>
            </div>
              <div className="topic">
                <Stack direction="horizontal">
                    <Col></Col>
                    <Col sm={4}>
                        <GridCalc />
                    </Col>
                    <Col></Col>
                </Stack>
              </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <Filters />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <SampleForm />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <SampleFetch />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <LotteryNumbersFetch />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <SampleChart />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <WordCloud />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

                <div className="topic">
                  <Stack direction="horizontal">
                      <Col></Col>
                      <Col sm={4}>
                          <GridBasic />
                      </Col>
                      <Col></Col>
                  </Stack>
                </div>

            </Container>
        </section>
      </main>

    </div>
  );
}

export default App;
