import { lazy } from 'react';
import { Nes } from '@kabukki/wasm-nes';

import picture from './assets/picture.png';
import content from './assets/content.png';

export default {
    name: 'NES',
    developer: 'Nintendo',
    year: 1983,
    generation: 3,
    wikipedia: 'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System',
    github: 'https://github.com/kabukki/wasm-nes',
    path: '/nintendo/nes',
    picture,
    content,
    component: lazy(() => Nes.init().then(() => import('./Nes'))),
};
