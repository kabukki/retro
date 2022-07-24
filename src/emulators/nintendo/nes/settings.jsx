import React, { createContext, useContext, useCallback } from 'react';

import { EmulatorContext } from './context';
import { useInput } from './hooks';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const { emulator } = useContext(EmulatorContext);

    const onPress = useCallback((player, button) => emulator?.input(player, button, true), [emulator]);
    const onRelease = useCallback((player, button) => emulator?.input(player, button, false), [emulator]);

    const input = useInput({
        onPress,
        onRelease,
    });

    return (
        <SettingsContext.Provider value={[{ input }]}>
            {children}
        </SettingsContext.Provider>
    );
};
