import React, { createContext, useState } from 'react';

export const Settings = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        keymap: {
            [0x1]: '1', [0x2]: '2', [0x3]: '3', [0xC]: '4',
            [0x4]: 'q', [0x5]: 'w', [0x6]: 'e', [0xD]: 'r',
            [0x7]: 'a', [0x8]: 's', [0x9]: 'd', [0xE]: 'f',
            [0xA]: 'z', [0x0]: 'x', [0xB]: 'c', [0xF]: 'v',
        },
    });

    return (
        <Settings.Provider value={[settings, setSettings]}>
            {children}
        </Settings.Provider>
    );
};
