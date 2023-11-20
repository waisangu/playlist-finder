import React from 'react';
import PromptContainer from './PromptContainer.jsx';
import ResultDisplay from '../components/ResultDisplay.jsx';

const MainContainer = ({remountHandler}) => {

  return(
    <div className="container">
      <div className="outerBox">
        <h1 id="header">playlist finder</h1>
        <PromptContainer remountHandler={remountHandler}/>
      </div>
    </div>
  );
};


export default MainContainer;
