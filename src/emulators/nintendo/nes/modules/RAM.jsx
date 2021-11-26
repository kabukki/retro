import React, { useContext } from 'react';

import { HexViewer, EmulatorContext } from '../../../../common';

export const RAM = () => {
    const { debug } = useContext(EmulatorContext);

    return (
        <div className="text-center">
            <h2>RAM</h2>
            <HexViewer buffer={debug?.ram || []} />
        </div>
    );
};
