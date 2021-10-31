import React, { useContext } from 'react';

import { EmulatorContext } from '../common';

export const ModuleStats = () => {
    const { settings } = useContext(EmulatorContext);

    return (
        <aside className="p-4 grid grid-cols-2 gap-x-2 items-center rounded bg-black bg-opacity-25">
            <b>CPU</b>
            <span>{Math.round(1000 / settings.core.clockSpeed)}Hz</span>
            <b>Timer</b>
            <span>{Math.round(1000 / settings.core.timerFrequency)}Hz</span>
            <b>FPS</b>
            <span>{settings.core.refreshRate}</span>
        </aside>
    );
};
