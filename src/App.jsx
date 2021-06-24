import React, { Suspense, useState } from 'react'
import merge from 'lodash.merge';

import { Chip8 } from './components/Chip8';

const useSettings = () => {
    const [settings, setSettings] = useState({
        core: {
            clockSpeed: 1000 / 200,
            timerFrequency: 1000 / 60,
        },
        display: {
            colorOn: '#ffffff',
            colorOff: '#000000',
            refreshRate: 30,
        },
        audio: true,
        keyboard: {
            map: {
                '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
                'q': 0x4, 'w': 0x5, 'e': 0x6, 'r': 0xD,
                'a': 0x7, 's': 0x8, 'd': 0x9, 'f': 0xE,
                'z': 0xA, 'x': 0x0, 'c': 0xB, 'v': 0xF,
            },
        },
    });

    return {
        settings,
        update (newSettings) {
            setSettings((oldSettings) => merge({}, oldSettings, newSettings));
        },
    };
};

export const App = ({ wasm }) => {
    const { settings, update } = useSettings();
    const [rom, setRom] = useState(null);

    return (
        <>
            <header className="p-4 mb-4 bg-gray-700 text-white text-center text-xl">
                <h1>CHIP-8</h1>
            </header>
            <main className="container mx-auto flex gap-4">
                <div>
                    <Suspense fallback={<p>Initializing...</p>}>
                        <Chip8 wasm={wasm} rom={rom} settings={settings} />
                    </Suspense>
                </div>
                <div className="space-y-4">
                    <div>
                        <h2 className="border-b border-grey-500">💾 ROM</h2>
                        <label className="block">
                            <input type="file" onChange={(e) => e.target.files[0]?.arrayBuffer().then((buffer) => setRom(new Uint8Array(buffer)))}/>
                        </label>
                    </div>
                    <div>
                        <h2 className="border-b border-grey-500">⚙️ Settings</h2>
                        <label className="block">
                            <b>ON</b> color
                            <input type="color" value={settings.display.colorOn} onChange={(e) => update({ display: { colorOn: e.target.value } })}/>
                        </label>
                        <label className="block">
                            <b>OFF</b> color
                            <input type="color" value={settings.display.colorOff} onChange={(e) => update({ display: { colorOff: e.target.value } })}/>
                        </label>
                        <label>
                            <input type="checkbox" checked={settings.audio} onChange={(e) => update({ audio: e.target.checked })} />
                            Sound <b>{settings.audio ? 'ON' : 'OFF'}</b>
                        </label>
                    </div>
                    <div>
                        <h2 className="border-b border-grey-500">⏱ Stats</h2>
                        <p><b>CPU clock speed</b> {Math.round(1000 / settings.core.clockSpeed)}Hz</p>
                        <p><b>Timer frequency</b> {Math.round(1000 / settings.core.timerFrequency)}Hz</p>
                        <p><b>Display refresh rate</b> {settings.display.refreshRate} FPS</p>
                    </div>
                </div>
            </main>
        </>
    );
};
