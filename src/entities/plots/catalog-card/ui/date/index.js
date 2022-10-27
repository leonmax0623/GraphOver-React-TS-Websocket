import React from 'react';
import cls from './date.module.scss';

export const Date = ({ label, value, className = null }) => {
  return (
    <div className={[cls.container, className].join(' ')}>
      <span className={cls.label}>{label}</span>
      <span className={cls.value}>{value}</span>
    </div>
  );
};
