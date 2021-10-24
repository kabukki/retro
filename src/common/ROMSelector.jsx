import React from 'react';
import { getRom } from '@kabukki/wasm-nes';

export const ROMSelector = ({ onSelect }) => {
    const onClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async (e) => {
            const [file] = e.target.files;
            onSelect(await getRom(file));
        };
        input.click();
    };

    return (
        <button className="p-1 rounded bg-gray-700 text-white" onClick={onClick}>
            💾&nbsp;Insert a ROM
        </button>
    );
};