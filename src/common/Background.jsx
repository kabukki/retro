import React from 'react';

export const Background = ({ text, className, children }) => (
    <>
        <div className={`absolute inset-0 pointer-events-none select-none grid grid-cols-5 grid-rows-5 place-items-center gap-4 whitespace-nowrap ${className || ''}`}>
            {Array.from({ length: 25 }, (v, n) => (
                <div key={n}>
                    {n % 2 === 0 ? text : '·'}
                </div>
            ))}
        </div>
        <div className="z-10">
            {children}
        </div>
    </>
);