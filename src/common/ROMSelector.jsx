import React, { useRef, useState } from 'react';
import { getRom } from '@kabukki/wasm-nes';

export const ROMSelector = ({ picture, onSelect }) => {
    const ref = useRef(null);
    const [drag, setDrag] = useState(false);

    const onFile = (file) => {
        if (file) {
            getRom(file).then(onSelect);
        }
    };

    const onClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => onFile(e.target.files[0]);
        input.click();
    };

    const onDrop = async (e) => {
        e.preventDefault();
        setDrag(false);
        onFile(e.dataTransfer.files[0]);
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const onDragEnter = (e) => {
        e.preventDefault();
        setDrag(true);
    };
    const onDragLeave = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    return (
        <div className="text-center">
            <div className="mb-4">
                <h1 className="font-bold">Insert a ROM</h1>
                <p>of the right format</p>
            </div>
            <div
                ref={ref}
                className="relative py-4 px-8 flex flex-col items-center gap-2 bg-green-900 overflow-hidden rounded border border-dashed border-opacity-50"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
            >
                {picture ? <img src={picture} className="h-24" /> : '💾'}
                {drag && <div className="absolute inset-0 bg-white bg-opacity-50" onDragLeave={onDragLeave} />}
                <p>Drag & drop your file here</p>
                <div className="self-stretch flex gap-2 items-center">
                    <div className="h-px flex-1 bg-white" />
                    OR
                    <div className="h-px flex-1 bg-white" />
                </div>
                <button className="p-1 rounded shadow bg-green-700 text-white" onClick={onClick}>
                    Browse files
                </button>
            </div>
        </div>
    );
};
