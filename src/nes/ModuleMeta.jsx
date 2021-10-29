import React, { useContext } from 'react';

import { EmulatorContext } from './context';

export const ModuleMeta = () => {
    const { meta } = useContext(EmulatorContext);

    return (
        <aside className="p-4 rounded bg-black bg-opacity-25">
            <b>{meta.name}</b>
        </aside>
    );
};
