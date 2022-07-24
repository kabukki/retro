import React from 'react';
import ReactSelect from 'react-select';
import colors from 'tailwindcss/colors';

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
        backgroundColor: isSelected ? colors.green[700] : isFocused ? colors.green[100] : 'initial',
        color: isSelected ? colors.white : isFocused ? colors.black : 'initial',
    }),
};

export const Select = (props) => (
    <ReactSelect styles={selectStyles} {...props} />
);
