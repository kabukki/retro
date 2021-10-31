import React from 'react';
import { getRom } from '@kabukki/wasm-nes';

export const ROMSelector = ({ content, onSelect }) => {
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
        <button className="p-1 flex gap-2 items-center justify-center rounded bg-gray-700 text-white" onClick={onClick}>
            {content ? <img src={content} className="h-4" /> : '💾'}
            Insert a ROM
        </button>
    );
};
