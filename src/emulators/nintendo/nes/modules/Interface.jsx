import React, { useContext } from 'react';

import { EmulatorContext, Select } from '../../../../common';

export const Interface = () => {
    const { settings } = useContext(EmulatorContext);

    return (
        <div>
            <label>
                CRT filter
                <input type="checkbox" checked={settings.crt} onChange={e => settings.setCRT(e.target.checked)} />
            </label>
            <Select
                value={settings.modules}
                onChange={settings.setModules}
                options={['audio', 'performance', 'input', 'ram', 'ppu', 'cartridge']}
                getOptionLabel={(module) => module}
                getOptionValue={(module) => module}
                isSearchable
                isClearable
                isMulti
            />
        </div>
    );
};
