import React from 'react';
import LogDisplay from '../components/LogDisplay.jsx';

const LogContainer = ({collection, remountHandler}) => {

  return(
    <div className="LogContainer">
        <LogDisplay collection={collection} remountHandler={remountHandler}/>
    </div>
  );
};


export default LogContainer;
