import React, { useContext } from 'react';
import Select from 'react-select';
import { Tab } from '@headlessui/react';

import { EmulatorContext } from '../common';
import { Controller } from './Controller';
import { Save } from './Save';

import Keyboard from '../assets/keyboard.svg';
import Gamepad from '../assets/gamepad.svg';

const selectStyles = {
    control: () => ({
        display: 'flex',
    }),
    menu: (provided) => ({
        ...provided,
        margin: 0,
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    option: (provided, { isSelected, isFocused }) => ({
        ...provided,
        backgroundColor: isSelected ? '#047857' : isFocused ? '#D1FAE5' : 'initial',
        color: isSelected ? '#fff' : isFocused ? '#000' : 'initial',
    }),
};

const formatOptionLabelWithIcon = ({ id, type }) => {
    const typeMap = {
        keyboard: <Keyboard />,
        gamepad: <Gamepad />,
    };

    return (
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-center">{typeMap[type]}</div>
            <div className="flex-1 truncate">{id}</div>
        </div>
    );
};

export const Settings = () => {
    const { settings, input, saves } = useContext(EmulatorContext);

    return (
        <>
            <Tab.Group>
                <Tab.List className="flex flex-col sm:flex-row" as="ul">
                    <Tab className={({ selected }) => `flex-1 text-center font-bold ${selected ? 'bg-white text-black' : ''}`} as="li">Input</Tab>
                    <Tab className={({ selected }) => `flex-1 text-center font-bold ${selected ? 'bg-white text-black' : ''}`} as="li">Interface</Tab>
                    <Tab className={({ selected }) => `flex-1 text-center font-bold ${selected ? 'bg-white text-black' : ''}`} as="li">Saves</Tab>
                </Tab.List>
                <Tab.Panels className="flex-1">
                    <Tab.Panel>
                        {input.players.map((player, index) => (
                            <div key={index}>
                                <h2 className="font-bold">Player {index + 1}</h2>
                                {player ? (
                                    <Controller input={player.value} />
                                ) : (
                                    <p className="text-red-500">Disconnected</p>
                                )}
                                <Select
                                    styles={selectStyles}
                                    value={player}
                                    options={input.inputs}
                                    placeholder="Select input source..."
                                    onChange={(p) => input.setPlayer(index, p)}
                                    getOptionLabel={({ id }) => id}
                                    getOptionValue={({ id }) => id}
                                    isOptionDisabled={({ id }) => input.players.some((p) => p?.id === id)}
                                    formatOptionLabel={formatOptionLabelWithIcon}
                                    isSearchable={false}
                                    isClearable
                                />
                            </div>
                        ))}
                    </Tab.Panel>
                    <Tab.Panel>
                        <label>
                            CRT filter
                            <input type="checkbox" checked={settings.crt} onChange={e => settings.setCRT(e.target.checked)} />
                        </label>
                        <Select
                            styles={selectStyles}
                            value={settings.modules}
                            onChange={settings.setModules}
                            options={['meta', 'stats', 'input', 'ram', 'ppu']}
                            getOptionLabel={(module) => module}
                            getOptionValue={(module) => module}
                            isSearchable
                            isClearable
                            isMulti
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {saves.length > 0 ? saves.map((save, index) => (
                                <Save key={index} {...save} />
                            )) : <p>No saves yet!</p>}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </>
    );
};
