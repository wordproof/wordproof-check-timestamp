import React from 'react';
import { Container, Content } from 'bloomer';

import './App.scss';
import Checker from "./components/Checker/Checker";

import img from './images/wp.png';

function App() {
  return (
    <div className="App">
      <Container>
        <Content>
        <div className="logo">
          <a href="https://wordproof.io/">
            <img src={img} alt="WordProof logo"/>
          </a>
        </div>
        <div className="intro">
          <h2>Hello hello</h2>
          <p>Something to explain</p>
        </div>
        <Checker/>
        </Content>
      </Container>
    </div>
  );
}

export default App;
