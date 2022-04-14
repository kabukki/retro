import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWikipediaW, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBuilding, faCalendarDay, faGamepad, faPlay } from '@fortawesome/free-solid-svg-icons';

import { repository } from '../package.json';
import emulators from './emulators';
import { formatOrdinal } from './utils';
import { Unavailable, Pixels } from './common';

const withTitle = (emulator) => (props) => {
    const { name, component: Component = Unavailable } = emulator;
    
    return (
        <>
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <Suspense fallback={<p>Loading</p>}>
                <Component {...props} />
            </Suspense>
        </>
    );
};

const Card = ({ name, developer, year, generation, path, picture, github, wikipedia }) => (
    <div className={`relative overflow-hidden rounded border divide-y bg-white`}>
        <h1 className="flex">
            <div className="p-2 flex-1 flex gap-2">
                <Link to={path} className="flex-1 text-green-700 font-bold font-mono">
                    {name}
                </Link>
                {github && (
                    <a href={github} target={`${name}:github`} className="transition hover:text-green-700">
                        <FontAwesomeIcon icon={faGithub} className="fill-current"/>
                    </a>
                )}
                {wikipedia && (
                    <a href={wikipedia} target={`${name}:wikipedia`} className="transition hover:text-green-700">
                        <FontAwesomeIcon icon={faWikipediaW} className="fill-current"/>
                    </a>
                )}
            </div>
        </h1>
        <div className="p-2 flex items-center gap-2">
            <img className="h-24 object-contain" src={picture} alt={name} />
            <div className="flex-1 text-gray-500">
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
                    <p className="font-bold">{developer}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faCalendarDay} className="w-4 h-4" />
                    <p>{year}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faGamepad} className="w-4 h-4" />
                    <p>{Number.isInteger(generation) ? `${formatOrdinal(generation)} generation` : 'Unclassified'}</p>
                </div>
            </div>
        </div>
        {github ? (
            <Link to={path} className="p-2 flex items-center justify-center gap-2 transition bg-green-700 hover:bg-green-500 text-white">
                <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
                PLAY
            </Link>
        ): (
            <button className="p-2 w-full bg-gray-200 text-white cursor-not-allowed">Unavailable</button>
        )}
    </div>
);

export const App = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <Router>
                <header className="z-30 p-4 flex items-center justify-between bg-green-700 text-white shadow-md">
                    <h1 className="text-xl font-mono font-bold text-shadow animate-color">
                        <Link to="/">retro</Link>
                    </h1>
                    <a target="github" href={repository.url}>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </header>
                <Switch>
                    {emulators.map((emulator) => (
                        <Route key={emulator.name} path={emulator.path} component={withTitle(emulator)} />
                    ))}
                    <Route path="/list">
                        <main className="my-4 mx-auto container">
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {emulators.slice().sort((a, b) => (b.year - a.year) || a.name.localeCompare(b.name)).map((emulator) => (
                                    <Card key={emulator.name} {...emulator} />
                                ))}
                            </div>
                        </main>
                    </Route>
                    <Route path="/">
                        <main className="flex-1 relative overflow-hidden">
                            <Pixels className="absolute inset-0" />
                            <div className="absolute inset-0 bg-black bg-opacity-50" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 text-center">
                                <h1 className="text-8xl text-white text-shadow font-mono animate-reveal">👾<br />retro</h1>
                                <h2 className="text-xl text-gray-100 opacity-0 animate-reveal [animation-delay:1000ms] [animation-fill-mode:forwards]">Replay all your favorite old-school games right in your browser!</h2>
                                <button className="px-4 py-2 rounded-full bg-green-700 hover:bg-green-500 transition text-white opacity-0 animate-reveal [animation-delay:1500ms] [animation-fill-mode:forwards]">
                                    <Link to="/list">Let's play!</Link>
                                </button>
                            </div>
                        </main>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
