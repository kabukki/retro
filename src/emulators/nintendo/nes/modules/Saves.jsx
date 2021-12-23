import React, { useContext } from 'react';

import { EmulatorContext } from '../../../../common';

import Icon from '../../../../assets/save.svg';

const Save = ({ name, date, thumbnail }) => (
    <div className="p-4 flex gap-4 items-center">
        <img className="w-16" src={thumbnail} />
        <div className="flex-1">
            <p><b>{name}</b></p>
            <p>{date.toLocaleString()}</p>
        </div>
    </div>
);

export const Saves = () => {
    const { saves } = useContext(EmulatorContext);

    return (
        <div>
            {saves.length > 0 ? saves.map((save, index) => (
                <Save key={index} {...save} />
            )) : <p>No saves yet!</p>}
        </div>
    );
};

Saves.Icon = Icon;
