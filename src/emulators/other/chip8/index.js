import { lazy } from 'react';
import { Chip8 } from '@kabukki/wasm-chip8';

import picture from './assets/picture.png';
import content from './assets/content.png';

export default {
    name: 'CHIP-8',
    developer: 'Weisbecker',
    year: 1978,
    generation: null,
    wikipedia: 'https://en.wikipedia.org/wiki/CHIP-8',
    github: 'https://github.com/kabukki/wasm-chip8',
    path: '/other/chip8',
    picture,
    content,
    component: lazy(() => Chip8.init().then(() => import('./Chip8'))),
};
