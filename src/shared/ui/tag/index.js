import React from 'react';
import cls from './tag.module.scss'


export const Tag = ({className = null, children}) => {
    return (
        <span className={[cls.container, className].join(' ')}>
            {children}
        </span>
    );
};
