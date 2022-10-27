import React from 'react';
import cls from './screen-reader.module.scss'

export const ScreenReader = ({children}) => {
    return (
        <span className={cls.text}>
            {children}
        </span>
    );
};
