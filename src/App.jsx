import React from 'react'
import { HashRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Chip8 } from './chip8';
import { Nes } from './nes';

import odyssey from './assets/odyssey.png';
import chip8 from './assets/chip8.png';
import nes from './assets/nes.png';
import megadrive from './assets/megadrive.png';
import atari2600 from './assets/atari2600.png';
import sms from './assets/sms.png';
import gameboy from './assets/gameboy.png';
import snes from './assets/snes.png';
import n64 from './assets/n64.png';
import neogeo from './assets/neogeo.png';
import playstation from './assets/playstation.png';
import playstation2 from './assets/playstation2.png';
import saturn from './assets/saturn.png';
import gamecube from './assets/gamecube.png';
import xbox from './assets/xbox.png';

import Github from './assets/github.svg';
import Wikipedia from './assets/wikipedia.svg';

const withTitle = (emulator) => (props) => {
    const { name, component: Component } = emulator;
    
    return (
        <>
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <Component {...emulator} {...props} />
        </>
    );
};

const emulators = [
    {
        title: 'CHIP-8',
        developer: 'Weisbecker',
        year: 1978,
        generation: null,
        wikipedia: 'https://en.wikipedia.org/wiki/CHIP-8',
        github: 'https://github.com/kabukki/wasm-chip8',
        path: '/other/chip8',
        picture: chip8,
        component: Chip8,
    }, {
        title: 'Odyssey',
        developer: 'Magnavox',
        year: 1972,
        generation: 1,
        wikipedia: 'https://fr.wikipedia.org/wiki/Magnavox_Odyssey',
        path: '/magnavox/odyssey',
        picture: odyssey,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Atari 2600',
        developer: 'Atari',
        year: 1977,
        generation: 2,
        wikipedia: 'https://en.wikipedia.org/wiki/Atari_2600',
        path: '/atari/2600',
        picture: atari2600,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'NES',
        developer: 'Nintendo',
        year: 1983,
        generation: 3,
        wikipedia: 'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System',
        github: 'https://github.com/kabukki/wasm-nes',
        path: '/nintendo/nes',
        picture: nes,
        component: Nes,
    }, {
        title: 'Master System',
        developer: 'Sega',
        year: 1986,
        generation: 3,
        wikipedia: 'https://en.wikipedia.org/wiki/Master_System',
        path: '/sega/master-system',
        picture: sms,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Mega Drive',
        developer: 'Sega',
        year: 1988,
        generation: 4,
        wikipedia: 'https://en.wikipedia.org/wiki/Sega_Genesis',
        path: '/sega/megadrive',
        picture: megadrive,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Game Boy',
        developer: 'Nintendo',
        year: 1989,
        generation: 4,
        wikipedia: 'https://en.wikipedia.org/wiki/Game_Boy',
        path: '/nintendo/gameboy',
        picture: gameboy,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Super NES',
        developer: 'Nintendo',
        year: 1990,
        generation: 4,
        wikipedia: 'https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System',
        path: '/nintendo/snes',
        picture: snes,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Neo Geo',
        developer: 'SNK',
        year: 1990,
        generation: 4,
        wikipedia: 'https://fr.wikipedia.org/wiki/Neo-Geo_AES',
        path: '/snk/neogeo',
        picture: neogeo,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'PlayStation',
        developer: 'Sony',
        year: 1994,
        generation: 5,
        wikipedia: 'https://en.wikipedia.org/wiki/PlayStation_(console)',
        path: '/sony/playstation',
        picture: playstation,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Saturn',
        developer: 'Sega',
        year: 1994,
        generation: 5,
        wikipedia: 'https://en.wikipedia.org/wiki/Sega_Saturn',
        path: '/sega/saturn',
        picture: saturn,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Nintendo 64',
        developer: 'Nintendo',
        year: 1996,
        generation: 5,
        wikipedia: 'https://en.wikipedia.org/wiki/Nintendo_64',
        path: '/nintendo/64',
        picture: n64,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'PlayStation 2',
        developer: 'Sony',
        year: 2000,
        generation: 6,
        wikipedia: 'https://en.wikipedia.org/wiki/PlayStation_2',
        path: '/sony/playstation2',
        picture: playstation2,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'GameCube',
        developer: 'Nintendo',
        year: 2001,
        generation: 6,
        wikipedia: 'https://en.wikipedia.org/wiki/GameCube',
        path: '/nintendo/gamecube',
        picture: gamecube,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Xbox',
        developer: 'Microsoft',
        year: 2001,
        generation: 6,
        wikipedia: 'https://en.wikipedia.org/wiki/Xbox_(console)',
        path: '/microsoft/xbox',
        picture: xbox,
        component: () => <p>Coming soon(ish)</p>,
    },
];

const Card = ({ title, developer, year, generation, path, picture, github, wikipedia }) => (
    <div className={`relative overflow-hidden rounded shadow divide-y bg-${github ? 'white' : 'gray-100 opacity-25'} transition hover:shadow-md`}>
        <h1 className="flex">
            <div className={`p-2 w-10 h-10 flex items-center justify-center bg-green-${200 + generation * 100} text-white`}>
                {generation || '-'}
            </div>
            <div className="p-2 flex-1 flex gap-2">
                {github ? (
                    <Link to={path} className="flex-1 text-green-700 font-bold font-mono">
                        {title}
                    </Link>
                ) : (
                    <span className="flex-1 line-through">
                        {title}
                    </span>
                )}
                {github && (
                    <a href={github} target={`${title}:github`} className="transition hover:text-green-700">
                        <Github className="fill-current"/>
                    </a>
                )}
                {wikipedia && (
                    <a href={wikipedia} target={`${title}:wikipedia`} className="transition hover:text-green-700">
                        <Wikipedia className="fill-current"/>
                    </a>
                )}
            </div>
        </h1>
        <div className="p-2 flex items-center gap-2">
            <img className="h-24 object-contain" src={picture} alt={title} />
            <div className="flex-1">
                <h2 className="font-bold">{developer}</h2>
                {year}
            </div>
        </div>
    </div>
);

export const App = () => {
    return (
        <div className="h-screen flex flex-col">
            <Router>
                <header className="z-30 p-4 flex flex-wrap justify-between items-center bg-green-700 shadow text-white text-center">
                    <h1 className="text-xl font-bold text-shadow animate-color">
                        <Link to="/">RETRO</Link>
                    </h1>
                    <ul className="flex flex-wrap items-center gap-4">
                        {emulators.filter(({ github }) => !!github).map(({ title, picture, path }) => (
                            <li key={title}>
                                <NavLink className="flex items-center gap-2" to={path} activeClassName="font-bold">
                                    <img className="h-4" src={picture} />
                                    {title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </header>
                <Switch>
                    {emulators.map((emulator) => (
                        <Route key={emulator.title} path={emulator.path} component={withTitle(emulator)} />
                    ))}
                    <Route path="/">
                        <main className="m-4 flex flex-col gap-4">
                            <h1 className="text-xl text-center">Welcome to RETRO !</h1>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {emulators.map((emulator) => (
                                    <Card key={emulator.title} {...emulator} />
                                ))}
                            </div>
                        </main>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
