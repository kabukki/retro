import React from 'react';

import picture from './assets/picture.png';
import content from './assets/content.png';

export default {
    name: 'Game Boy',
    developer: 'Nintendo',
    year: 1989,
    generation: 4,
    wikipedia: 'https://en.wikipedia.org/wiki/Game_Boy',
    path: '/nintendo/gameboy',
    picture,
    content,
    component: () => <p>Coming soon(ish)</p>,
};
