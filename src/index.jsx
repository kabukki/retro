import React, { Suspense } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWikipediaW, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPlay, faBan } from '@fortawesome/free-solid-svg-icons';

import { repository } from '../package.json';
import emulators from './emulators';
import { formatOrdinal } from './utils';
import { Unavailable, Pixels } from './common';
 
import './index.css';

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
    <div className="flex flex-col rounded border overflow-hidden divide-y bg-white">
        <img className="h-32 w-full object-contain" src={picture} alt={name} />
        <div className="p-2 flex-1 flex items-center gap-2">
            <div className="flex-1">
                <h1 className="flex gap-2">
                    <Link to={path} className="flex-1 text-green-700 font-bold font-mono">
                        {name}
                    </Link>
                </h1>
                <p className="text-gray-500">
                    <b>{developer}</b>, {year}
                    {Number.isInteger(generation) && ` (${formatOrdinal(generation)} generation)`}.
                </p>
            </div>
            <div className="flex gap-2">
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
        </div>
        {github ? (
            <Link to={path} className="p-2 flex items-center justify-center gap-2 transition bg-green-700 hover:bg-green-500 text-white">
                <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
                PLAY
            </Link>
        ): (
            <button className="w-full p-2 flex items-center justify-center gap-2 bg-gray-200 text-white cursor-not-allowed">
                <FontAwesomeIcon icon={faBan} className="w-4 h-4" />
                Unavailable
            </button>
        )}
    </div>
);

const App = () => {
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
                        <main className="p-8 overflow-auto">
                            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

ReactDOM.render(<App />, document.getElementById('app'));
