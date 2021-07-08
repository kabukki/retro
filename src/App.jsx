import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
  
import { Chip8 } from './chip8';
import { Nes } from './nes';

export const App = () => {
    return (
        <Router>
            <header className="p-4 bg-green-700 text-white text-center text-xl">
                <h1>
                    <Link to="/">RETRO</Link>
                </h1>
            </header>
            <nav className="p-4 mb-4 bg-green-900 text-white text-center">
                <ul className="space-x-4">
                    <li className="inline-block">
                        <Link to="/chip8">CHIP-8</Link>
                    </li>
                    <li className="inline-block">
                        <Link to="/nes">NES</Link>
                    </li>
                </ul>
            </nav>
            <main className="container mx-auto">
                <Switch>
                    <Suspense fallback={<p>Initializing...</p>}>
                        <Route path="/chip8">
                            <Chip8 />
                        </Route>
                        <Route path="/nes">
                            <Nes />
                        </Route>
                        <Route path="/" exact>
                            <h1>Welcome to RETRO !</h1>
                        </Route>
                    </Suspense>
                </Switch>
            </main>
        </Router>
    );
};
