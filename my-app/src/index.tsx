import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Stopwatch from './App';
import Stopwatch2 from './component/second';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.Fragment>
    <Stopwatch initialSeconds={0} />
    <Stopwatch2 initialSeconds={0} />
  </React.Fragment>,

    document.getElementById("root"),
  );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
