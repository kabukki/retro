import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';

import { Background } from '.';

export const Unavailable = (meta) => {
    return (
        <main className="relative flex-1 grid place-content-center">
            <Background className="bg-yellow-500 text-yellow-700" text={meta.name}>
                <div className="p-4 flex flex-col items-center gap-2 bg-yellow-700 overflow-hidden rounded border border-dashed border-opacity-50 text-white">
                    <FontAwesomeIcon className="h-24" icon={faPersonDigging} />
                    <h2 className="font-bold">Coming soon(ish)</h2>
                    <p>This emulator is not available yet 😢</p>
                </div>
            </Background>
        </main>
    );
};
