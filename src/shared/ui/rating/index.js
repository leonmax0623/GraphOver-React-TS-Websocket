import React from 'react';
import cls from './rating.module.scss'

export const Rating = ({className = null, children}) => {
    return (
        <span className={[cls.container, className].join(' ')}>
            <span>{children}</span>
            <svg className={cls.icon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10.0058 15.2117L4.85526 17.9168L5.83913 12.1872L1.66663 8.12989L7.42469 7.29625L9.99996 2.0835L12.5752 7.29625L18.3333 8.12989L14.1608 12.1872L15.1447 17.9168L10.0058 15.2117Z"
                    fill="#FFD74B"/>
            </svg>
        </span>
    );
};
