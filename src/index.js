import React from 'react';
import ReactDOM from 'react-dom';
import initChip8 from '@kabukki/wasm-chip8';
import initNes from '@kabukki/wasm-nes';
 
import { App } from './App';
import './index.css';

Promise.all([initChip8(), initNes()]).then((wasm) => ReactDOM.render(<App wasm={wasm} />, document.getElementById('app')));
