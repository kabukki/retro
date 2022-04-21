import React, { useRef, useState } from 'react';
import pretty from 'pretty-bytes';

export const ROMSelector = ({ picture, onSelect }) => {
    const ref = useRef(null);
    const [drag, setDrag] = useState(false);

    const onFile = async (file) => {
        const buffer = new Uint8Array(await file?.arrayBuffer());
        console.log(`Loaded ROM ${file.name} (${pretty(buffer.byteLength)})`);
        onSelect(buffer);
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
        <div className="p-2 text-center">
            <div className="mb-2">
                <h1 className="font-bold">Insert a ROM</h1>
                <p>of the right format</p>
            </div>
            <div
                ref={ref}
                className="relative py-2 px-4 flex flex-col items-center gap-2 overflow-hidden rounded border-2 border-dashed bg-white"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
            >
                {picture ? <img src={picture} className="h-24" /> : '💾'}
                {drag && <div className="absolute inset-0 bg-white bg-opacity-50" onDragLeave={onDragLeave} />}
                <p>Drag & drop your file here</p>
                <div className="self-stretch flex gap-2 items-center">
                    <div className="h-px flex-1 bg-gray-200" />
                    OR
                    <div className="h-px flex-1 bg-gray-200" />
                </div>
                <button className="p-1 rounded shadow bg-green-700 text-white" onClick={onClick}>
                    Browse files
                </button>
            </div>
        </div>
    );
};
