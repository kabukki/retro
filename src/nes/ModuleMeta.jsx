import React, { useContext } from 'react';

import { EmulatorContext } from './context';

import content from '../assets/nes.content.png';

export const ModuleMeta = () => {
    const { meta } = useContext(EmulatorContext);

    return (
        <aside className="p-4 gap-2 flex items-center rounded bg-black bg-opacity-25">
            <img className="h-4" src={content} />
            <b className="flex-1">{meta.name}</b>
        </aside>
    );
};
