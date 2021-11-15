import React from 'react';

export const BarChart = ({ title, max, chunks, className }) => {
    return (
        <div className={className}>
            <h2 className="font-bold">{title}</h2>
            <div className="flex rounded overflow-hidden">
                {chunks.map(({ value, color, label }) => (
                    <div key={label} className={`p-2 bg-${color} truncate`} style={{ width: `${100 * value / max}%` }}>
                        {value}
                    </div>
                ))}
            </div>
            <legend className="flex flex-wrap gap-2">
                {chunks.map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <div className={`h-2 w-2 bg-${color} shadow`} />
                        <span>{label}</span>
                    </div>
                ))}
            </legend>
        </div>
    );
};
