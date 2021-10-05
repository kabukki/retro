import React from 'react';

export const Save = ({ name, date, thumbnail }) => (
    <div className="p-2 flex gap-2 items-center">
        <img className="w-16" src={thumbnail} />
        <div className="flex-1">
            <p><b>{name}</b></p>
            <p>{date.toLocaleString()}</p>
        </div>
    </div>
);
