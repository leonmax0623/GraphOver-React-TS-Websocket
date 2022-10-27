import React from 'react';
import cls from './link.module.scss';
import { NavLink } from 'react-router-dom';

export const Link = ({ to, className = '', children }) => {
  return (
    <NavLink to={to} className={[cls.link, className].join(' ')}>
      {children}
    </NavLink>
  );
};
