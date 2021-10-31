import React from 'react'
import { HashRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Chip8 } from './chip8';
import { Nes } from './nes';

import chip8 from './assets/chip8.png';
import nes from './assets/nes.png';
import gameboy from './assets/gameboy.png';
import n64 from './assets/n64.png';
import playstation from './assets/playstation.png';
import Github from './assets/github.svg';

const withTitle = ({ name, component: Component }) => (props) => (
    <>
        <Helmet>
            <title>{name}</title>
        </Helmet>
        <Component {...props} />
    </>
);

const emulators = [
    {
        title: 'CHIP-8',
        subtitle: 'Weisbecker, 1978',
        path: '/chip8',
        picture: chip8,
        url: 'https://github.com/kabukki/wasm-chip8',
        component: Chip8,
    }, {
        title: 'NES',
        subtitle: 'Nintendo, 1983',
        path: '/nes',
        picture: nes,
        url: 'https://github.com/kabukki/wasm-nes',
        component: Nes,
    }, {
        title: 'Game Boy',
        subtitle: 'Nintendo, 1989',
        path: '/gameboy',
        picture: gameboy,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'PlayStation',
        subtitle: 'Sony, 1994',
        path: '/ps',
        picture: playstation,
        component: () => <p>Coming soon(ish)</p>,
    }, {
        title: 'Nintendo 64',
        subtitle: 'Nintendo, 1996',
        path: '/n64',
        picture: n64,
        component: () => <p>Coming soon(ish)</p>,
    }
];

const Card = ({ to, picture, title, subtitle, url }) => (
    <div className="relative flex items-center p-2 gap-2 rounded shadow overflow-hidden group hover:bg-green-700 hover:text-white transition">
        {!url && (
            <div className="absolute inset-0 flex flex-col justify-center bg-gray-900 bg-opacity-50">
                <p className="py-4 text-center text-white">Coming soon(ish)</p>
            </div>
        )}
        <img className="h-24 object-contain" src={picture} alt={title} />
        <div className="flex-1">
            <Link to={to}>
                <h2 className="font-bold text-green-700 transition group-hover:text-white">{title}</h2>
                {subtitle}
            </Link>
        </div>
        {url && (
            <a href={url} target={title} >
                <Github className="fill-current"/>
            </a>
        )}
    </div>
);

export const App = () => {
    return (
        <div className="h-screen flex flex-col">
            <Router>
                <header className="z-30 p-4 flex flex-wrap justify-between items-center bg-green-700 shadow text-white text-center">
                    <h1 className="text-xl font-bold text-shadow animate-hue text-green-100">
                        <Link to="/">RETRO</Link>
                    </h1>
                    <ul className="space-x-4">
                        {emulators.map(({ title, path }) => (
                            <li key={title} className="inline-block">
                                <NavLink to={path} activeClassName="font-bold" >{title}</NavLink>
                            </li>
                        ))}
                    </ul>
                </header>
                <Switch>
                    {emulators.map((emulator) => (
                        <Route key={emulator.title} path={emulator.path} component={withTitle(emulator)} />
                    ))}
                    <Route path="/" exact>
                        <h1 className="m-4 text-xl text-center">Welcome to RETRO !</h1>
                        <div className="m-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {emulators.map(({ title, subtitle, path, picture, url }) => (
                                <Card key={title} to={path} picture={picture} title={title} subtitle={subtitle} url={url} />
                            ))}
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
