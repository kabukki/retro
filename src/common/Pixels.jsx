import classNames from 'classnames';
import React from 'react';

/**
 * Returns a random number between min and max (both included)
 */
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const Pixels = ({ className }) => {
    const pixels = Array.from({ length: 100 }, () => random(-6000, 0));

    return (
        <div className={classNames(className, 'grid grid-cols-10 bg-green-700')}>
            {pixels.map((delay, n) => (
                <div
                    key={n}
                    className="bg-green-500 motion-safe:animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                />
            ))}
        </div>
    );
};
