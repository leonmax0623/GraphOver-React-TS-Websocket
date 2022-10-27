import React from 'react';
import cls from './tabs.module.scss';
import { Tab } from './tab';

export const Tabs = ({ items, name, active, onChange = e => null, className = null }) => {
  return (
    <ul className={[cls.list, className].join(' ')}>
      {items.map((item, index) => (
        <li className={cls.item} key={index}>
          <Tab name={name} onChange={onChange} checked={active === item.value} {...item} />
        </li>
      ))}
    </ul>
  );
};
