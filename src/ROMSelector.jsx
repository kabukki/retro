import React from 'react';

export const ROMSelector = ({ onSelect }) => {
    const onClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = async (e) => {
            const [file] = e.target.files;
            const buffer = await file?.arrayBuffer();

            onSelect({
                name: file.name,
                buffer: new Uint8Array(buffer),
            });
        };
        input.click();
    };

    return (
        <button className="p-1 rounded bg-gray-700 text-white" onClick={onClick}>
            💾&nbsp;Select a ROM
        </button>
    );
};
