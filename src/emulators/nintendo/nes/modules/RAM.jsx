import React, { useContext } from 'react';

import { HexViewer, EmulatorContext } from '../../../../common';

import Icon from '../../../../assets/memory.svg';

export const RAM = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <div className="text-center">
            <h2>RAM</h2>
            <HexViewer buffer={debug?.ram || []} className="h-96 overflow-auto" />
        </div>
    );
};

RAM.Icon = Icon;
