import React from 'react';
import cls from './tabs.module.scss';

export const Tab = ({ value, name, id, label, checked, onChange = e => null }) => {
  return (
    <>
      <input
        type={'radio'}
        name={name}
        value={value}
        id={id}
        className={cls.field}
        onChange={e => onChange(e)}
        checked={checked}
      />
      <label htmlFor={id} className={cls.label}>
        {label}
      </label>
    </>
  );
};
