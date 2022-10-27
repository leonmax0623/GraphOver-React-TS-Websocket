import React from 'react';
import cls from './avatar-list.module.scss'


export const AvatarList = (
    {
        items,
        title = null,
        subtitle = null,
        className = null,
    }
) => {
    return (
        <div className={[cls.container, className].join(' ')}>

            <div className={cls.info}>
                {title && <p className={cls.title}>{title}</p>}
                {subtitle && <p className={cls.subtitle}>{subtitle}</p>}
            </div>

            <ul className={cls.list}>
                {
                    items.map((item, index) => (
                        <li className={cls.item} key={index}>
                            {item}
                        </li>
                    ))
                }
            </ul>

        </div>
    );
};
