import React from 'react';
import clsx from 'clsx';
import { size } from '../types';

function Divider({ size = 'xs', color, className }: DividerProps): JSX.Element {
    const sizeMappings = {
        xs: 'border-b my-2',
        sm: 'border my-3',
        md: 'border-2 my-4',
        lg: 'border-4 my-6',
        xl: 'border-8 my-8',
        none: 'border-0 my-1',
    };
    return (
        <div className={clsx(className, 'w-full', sizeMappings[size], color ? 'border-' + color : 'border-primary')} />
    );
}

export interface DividerProps {
    size?: size;
    color?: string;
    className?: string;
}

export default Divider;
