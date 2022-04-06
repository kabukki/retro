import React, { memo } from 'react';
import classNames from 'classnames';

export const Byte = memo(({ value, isDisabled = (value) => value === 0, format = (value) => value.toString(), className, ...props }) => (
    <span className={classNames(className, "font-mono", { 'text-gray-400': isDisabled(value)  })} {...props}>
        {format(value)}
    </span>
));
