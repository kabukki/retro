import React from 'react';

export const Settings = ({ settings, onUpdate }) => {
    return (
        <div>
            <h2 className="border-b border-grey-500">⚙️ Settings</h2>
            <label className="block">
                <b>ON</b> color
                <input type="color" value={settings.display.colorOn} onChange={(e) => onUpdate({ display: { colorOn: e.target.value } })}/>
            </label>
            <label className="block">
                <b>OFF</b> color
                <input type="color" value={settings.display.colorOff} onChange={(e) => onUpdate({ display: { colorOff: e.target.value } })}/>
            </label>
            <label>
                <input type="checkbox" checked={settings.audio} onChange={(e) => onUpdate({ audio: e.target.checked })} />
                Sound <b>{settings.audio ? 'ON' : 'OFF'}</b>
            </label>
        </div>
    );
};
