import React, { useContext } from 'react';

import { EmulatorContext, Module } from '../common';
import { Controller } from './Controller';

export const ModuleInput = () => {
    const { input } = useContext(EmulatorContext);

    return (
        <Module className="text-center">
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
        </Module>
    );
};
