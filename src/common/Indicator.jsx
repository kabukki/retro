import React from 'react';

export const Indicator = ({ color }) => {
    return (
        <div className="relative w-4 h-4">
            <div className="absolute w-full h-full rounded-full transition animate-ping" style={{ backgroundColor: color }} />
            <div className="w-full h-full rounded-full transition" style={{ backgroundColor: color }} />
        </div>
    );
};
