import React from 'react'
import { HashRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Chip8 } from './chip8';
import { Nes } from './nes';

import cosmac from './assets/cosmac.jpeg';
import nes from './assets/nes.png';
import gameboy from './assets/gameboy.jpg';
import n64 from './assets/n64.png';
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
        name: 'CHIP-8',
        year: 1978,
        path: '/chip8',
        picture: cosmac,
        url: 'https://github.com/kabukki/wasm-chip8',
        component: Chip8,
    }, {
        name: 'NES',
        year: 1983,
        path: '/nes',
        picture: nes,
        url: 'https://github.com/kabukki/wasm-nes',
        component: Nes,
    }, {
        name: 'Game Boy',
        year: 1989,
        path: '/gameboy',
        picture: gameboy,
        component: () => <p>Coming soon</p>,
    }, {
        name: 'Nintendo 64',
        year: 1996,
        path: '/n64',
        picture: n64,
        component: () => <p>Coming soon</p>,
    }
];

const Card = ({ to, image, title, year, url }) => (
    <div className="relative rounded shadow overflow-hidden hover:shadow-md transition-shadow">
        {!url && (
            <div className="absolute inset-0 flex flex-col justify-center bg-gray-900 bg-opacity-50">
                <p className="py-4 text-center text-white">Coming soon</p>
            </div>
        )}
        <img className="h-48 w-full object-contain" src={image} alt={title} />
        <div className="p-2 flex flex-wrap justify-between border-t">
            <Link to={to}>
                <h2 className="font-bold text-green-700">{title}</h2> {year}
            </Link>
            {url && (
                <a href={url} target={title} >
                    <Github className="fill-current hover:text-green-700 transition-colors"/>
                </a>
            )}
        </div>
    </div>
);

export const App = () => {
    return (
        <div className="h-screen flex flex-col">
            <Router >
                <header className="p-4 flex justify-between items-center bg-green-700 text-white text-center">
                    <h1 className="text-xl font-mono font-bold text-shadow animate-hue text-green-100">
                        <Link to="/">RETRO</Link>
                    </h1>
                    <ul className="space-x-4">
                        {emulators.map(({ name, path }) => (
                            <li key={name} className="inline-block">
                                <NavLink to={path} activeClassName="font-bold" >{name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </header>
                <Switch>
                    {emulators.map((emulator) => (
                        <Route key={emulator.name} path={emulator.path} component={withTitle(emulator)} />
                    ))}
                    <Route path="/" exact>
                        <h1 className="m-4 text-xl text-center">Welcome to RETRO !</h1>
                        <div className="m-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {emulators.map(({ name, year, path, picture, url }) => (
                                <Card key={name} to={path} image={picture} title={name} year={year} url={url} />
                            ))}
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
