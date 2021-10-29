import React, { useContext } from 'react';

import { EmulatorContext } from './context';
import { Controller } from './Controller';

export const ModuleInput = () => {
    const { input } = useContext(EmulatorContext);

    return (
        <aside className="p-4 rounded bg-black bg-opacity-25 text-center">
            {input.players.map((player, index) => (
                <div key={index}>
                    <h2 className="font-bold">Player {index + 1}</h2>
                    {player ? (
                        <Controller input={player.value} />
                    ) : (
                        <p className="text-red-500">Disconnected</p>
                    )}
                </div>
            ))}
        </aside>
    );
};
