import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import emulators from './emulators';

import Github from './assets/github.svg';
import Wikipedia from './assets/wikipedia.svg';

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
    <div className={`relative overflow-hidden rounded shadow divide-y bg-${github ? 'white' : 'gray-100 opacity-25'} transition hover:shadow-md`}>
        <h1 className="flex">
            <div className={`p-2 w-10 h-10 flex items-center justify-center bg-green-${200 + generation * 100} text-white`}>
                {generation || '-'}
            </div>
            <div className="p-2 flex-1 flex gap-2">
                {github ? (
                    <Link to={path} className="flex-1 text-green-700 font-bold font-mono">
                        {name}
                    </Link>
                ) : (
                    <span className="flex-1 line-through">
                        {name}
                    </span>
                )}
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
                        <main className="m-4 flex flex-col gap-4">
                            <h1 className="text-xl text-center">Welcome to RETRO !</h1>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {emulators.slice().sort((a, b) => (a.year - b.year) || a.name.localeCompare(b.name)).map((emulator) => (
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
