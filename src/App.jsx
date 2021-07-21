import React from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Chip8 } from './chip8';
import { Nes } from './nes';

import cosmac from './assets/cosmac.jpeg';
import nes from './assets/nes.png';
import gameboy from './assets/gameboy.jpg';
import Github from './assets/github.svg';

const withTitle = ({ name, component: Component }) => (props) => (
    <>
        <Helmet>
            <title>{name}</title>
        </Helmet>
        <h1 className="my-4 text-xl text-center">{name}</h1>
        <Component {...props} />
    </>
);

const emulators = [
    {
        name: 'CHIP-8',
        path: '/chip8',
        picture: cosmac,
        url: 'https://github.com/kabukki/wasm-chip8',
        component: Chip8,
    }, {
        name: 'NES',
        path: '/nes',
        picture: nes,
        url: 'https://github.com/kabukki/wasm-nes',
        component: Nes,
    }, {
        name: 'Game Boy',
        path: '/gameboy',
        picture: gameboy,
        component: () => <p>Coming soon</p>,
    },
];

const Card = ({ to, image, title, url }) => (
    <div className="relative p-1 rounded shadow overflow-hidden hover:shadow-md transition-shadow">
        {!url && (
            <div className="absolute inset-0 flex flex-col justify-center bg-gray-900 bg-opacity-50">
                <p className="py-4  text-center text-white">Coming soon</p>
            </div>
        )}
        <img className="h-48 w-full object-contain" src={image} alt={title} />
        <div className="m-2 flex flex-wrap justify-between">
            <Link to={to}>
                <h2 className="font-bold">{title}</h2>
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
        <Router>
            <header className="p-4 flex justify-between items-center bg-green-700 text-white text-center">
                <h1 className="text-xl font-mono font-bold text-shadow animate-hue text-green-100">
                    <Link to="/">RETRO</Link>
                </h1>
                <ul className="space-x-4">
                    {emulators.map(({ name, path }) => (
                        <li key={name} className="inline-block">
                            <Link to={path}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </header>
            <main className="container mx-auto">
                <Switch>
                    {emulators.map((emulator) => (
                        <Route key={emulator.name} path={emulator.path} component={withTitle(emulator)} />
                    ))}
                    <Route path="/" exact>
                        <h1 className="my-4 text-xl">Welcome to RETRO !</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                            {emulators.map(({ name, path, picture, url }) => (
                                <Card key={name} to={path} image={picture} title={name} url={url} />
                            ))}
                        </div>
                    </Route>
                </Switch>
            </main>
        </Router>
    );
};
