import React from 'react';
import classNames from 'classnames';

export const Flags = ({ bits }) => {
    return (
        <div className="font-mono">
            ({bits.map(({ name, description, enabled }, n) => (
                <span key={n} title={description} className={classNames({ 'text-neutral-400': !enabled })}>{name}</span>
            ))})
        </div>
    );
};
