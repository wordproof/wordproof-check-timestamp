import React from 'react';
import {Container, Content} from 'bloomer';

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
            <h2>WordProof Timestamp - Verification Tool</h2>
            <p>Enter the Blockchain Hash and Raw Content visible in the WordProof Timestamp Certificate below. The
              content will be hashed again. The indicator at the bottom of the form will turn green if the Generated
              Hash is the same as the Blockchain Hash, i.e. if the content did not change since the timestamp.</p>
          </div>
          <Checker/>
        </Content>
        <p className="is-size-7">By using WORD, you pledge to have read and accept the <a target="_blank" rel="noopener noreferrer" href="https://wordproof.io/wp-content/uploads/2019/06/product-terms.pdf">WordProof Product Agreement and Terms and Conditions</a>.</p>
      </Container>
    </div>
  );
}

export default App;
