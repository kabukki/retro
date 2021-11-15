import React from 'react';

export const Module = ({ className, children }) => (
    <aside className={`p-4 rounded bg-black bg-opacity-25 ${className || ''}`}>
        {children}
    </aside>
);
