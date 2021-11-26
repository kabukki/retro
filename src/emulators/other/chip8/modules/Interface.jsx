import React, { useContext } from 'react';

import { EmulatorContext, Select } from '../../../../common';

export const Interface = () => {
    const { settings } = useContext(EmulatorContext);

    return (
        <div>
            <label className="block">
                <b>ON</b> color
                <input type="color" value={settings.ui.colorOn} onChange={(e) => settings.setUI((previous) => ({ ...previous, colorOn: e.target.value }))}/>
            </label>
            <label className="block">
                <b>OFF</b> color
                <input type="color" value={settings.ui.colorOff} onChange={(e) => settings.setUI((previous) => ({ ...previous, colorOff: e.target.value }))}/>
            </label>
            <label>
                <input type="checkbox" checked={settings.ui.crt} onChange={e => settings.setUI((previous) => ({ ...previous, crt: e.target.checked }))} />
                CRT filter
            </label>
            <Select
                value={settings.modules}
                onChange={settings.setModules}
                options={['meta', 'stats', 'input', 'debug']}
                getOptionLabel={(module) => module}
                getOptionValue={(module) => module}
                isSearchable
                isClearable
                isMulti
            />
        </div>
    );
};
