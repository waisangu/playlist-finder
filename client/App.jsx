import React from 'react';
import { useState, useEffect } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import LogContainer from './containers/LogContainer.jsx';

const App = () => {
  const [collection, setCollection] = useState([]);
  const [remount, setRemount] = useState(false)

  useEffect(() => {
      fetch('/query/')
      .then(res => res.text())
      .then(res => setCollection(JSON.parse(res).reverse()))
  }, [remount])

  const remountHandler = () => {
    let copyRemount = !remount;
    setTimeout(setRemount(copyRemount), 0)
  }

  return(
    <div className='appContainer'>
      <MainContainer remountHandler={remountHandler}/>
      <h2 id="header-2">recents</h2>
      <LogContainer collection={collection} remountHandler={remountHandler}/>
    </div>
  );
};


export default App;