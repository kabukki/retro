import React from 'react';
import ReactSelect from 'react-select';

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

export const Select = (props) => (
    <ReactSelect styles={selectStyles} {...props} />
);
