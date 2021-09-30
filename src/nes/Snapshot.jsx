import React from 'react';

export const Snapshot = ({ rom, date, thumbnail, onClick }) => (
    <div className="p-2 flex gap-2 items-center">
        <img className="w-16" src={thumbnail} />
        <div className="flex-1">
            <p><b>{rom.name}</b></p>
            <p>{date.toLocaleString()}</p>
        </div>
        <button className="p-2 rounded bg-green-700 text-white" onClick={onClick}>
            Load
        </button>
    </div>
);
