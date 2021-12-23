import React from 'react';
import ReactDOM from 'react-dom';
import initChip8 from '@kabukki/wasm-chip8';
 
import { App } from './App';
import './index.css';

Promise.all([initChip8()]).then(() => ReactDOM.render(<App />, document.getElementById('app')));
