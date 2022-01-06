import React, { Suspense, Fragment } from 'react'
import { HashRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import emulators from './emulators';
import { formatOrdinal } from './utils';

import Github from './assets/github.svg';
import Wikipedia from './assets/wikipedia.svg';
import Company from './assets/company.svg';
import Calendar from './assets/calendar.svg';
import Gamepad from './assets/gamepad.svg';
import Play from './assets/play.svg';

const withTitle = (emulator) => (props) => {
    const { name, component: Component } = emulator;
    
    return (
        <>
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <Suspense fallback={<p>Loading</p>}>
                <Component {...emulator} {...props} />
            </Suspense>
        </>
    );
};

const Card = ({ name, developer, year, generation, path, picture, github, wikipedia }) => (
    <div className={`relative overflow-hidden rounded shadow divide-y bg-white transition hover:shadow-md`}>
        <h1 className="flex">
            <div className="p-2 flex-1 flex gap-2">
                <Link to={path} className="flex-1 text-green-700 font-bold font-mono">
                    {name}
                </Link>
                {github && (
                    <a href={github} target={`${name}:github`} className="transition hover:text-green-700">
                        <Github className="fill-current"/>
                    </a>
                )}
                {wikipedia && (
                    <a href={wikipedia} target={`${name}:wikipedia`} className="transition hover:text-green-700">
                        <Wikipedia className="fill-current"/>
                    </a>
                )}
            </div>
        </h1>
        <div className="p-2 flex items-center gap-2">
            <img className="h-24 object-contain" src={picture} alt={name} />
            <div className="flex-1 text-gray-500">
                <div className="flex gap-2 items-center">
                    <Company className="w-4 h-4" />
                    <p className="font-bold">{developer}</p>
                </div>
                <div className="flex gap-2 items-center">
                <Calendar className="w-4 h-4" />
                    <p>{year}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Gamepad className="w-4 h-4" />
                    <p>{Number.isInteger(generation) ? `${formatOrdinal(generation)} generation` : 'Unclassified'}</p>
                </div>
            </div>
        </div>
        {github ? (
            <Link to={path} className="p-2 flex items-center justify-center gap-2 transition bg-green-700 hover:bg-green-500 text-white hover:animate-color">
                <Play className="w-4 h-4" />
                PLAY
            </Link>
        ): (
            <button className="p-2 w-full bg-gray-200 text-white cursor-not-allowed">Unavailable</button>
        )}
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
                        {emulators.filter(({ github }) => !!github).map(({ name, picture, path }) => (
                            <li key={name}>
                                <NavLink className="flex items-center gap-2" to={path} activeClassName="font-bold">
                                    <img className="h-4" src={picture} />
                                    {name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </header>
                <Switch>
                    {emulators.map((emulator) => (
                        <Route key={emulator.name} path={emulator.path} component={withTitle(emulator)} />
                    ))}
                    <Route path="/">
                        <main className="mx-auto container">
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {emulators.slice().sort((a, b) => (b.year - a.year) || a.name.localeCompare(b.name)).map((emulator) => (
                                    <Card key={emulator.name} {...emulator} />
                                ))}
                            </div>
                        </main>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
