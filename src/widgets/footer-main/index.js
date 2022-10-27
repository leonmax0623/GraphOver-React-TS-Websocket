import React from 'react';
import cls from './footer-main.module.scss'
import {NavLink} from "react-router-dom";

export const FooterMain = () => {
    return (
        <footer className={cls.container}>
            <p className={cls.copyright}>
                @ 2022, GraphOver. Все права защищены
            </p>
            <ul className={cls.linkList}>
                <li className={cls.item}>
                    <NavLink to={'#'} className={cls.link}>
                        О сервисе
                    </NavLink>
                </li>
                <li className={cls.item}>
                    <NavLink to={'#'} className={cls.link}>
                        Обратная связь
                    </NavLink>
                </li>
                <li className={cls.item}>
                    <NavLink to={'#'} className={cls.link}>
                        Политика конфиденциальности
                    </NavLink>
                </li>
            </ul>
        </footer>
    );
};
