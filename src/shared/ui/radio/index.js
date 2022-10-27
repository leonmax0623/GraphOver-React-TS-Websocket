import classNames from 'classnames';
import React from 'react';
import cls from './radio.module.scss';

export const Radio = ({
  name,
  id,
  value = true,
  onChange = e => null,
  label = '',
  disabled = false,
  className = '',
  inputType = 'radio',
}) => {
  return (
    <div className={[cls.container, className].join(' ')}>
      <input type={inputType} name={name} defaultValue={value} id={id} disabled={disabled} className={cls.field} />
      <label
        htmlFor={id}
        className={classNames(cls.toggle, { [cls['toggle_active']]: value })}
        onClick={() => !disabled && onChange(value => !value)}
      >
        {label && <span className={cls.label}>{label}</span>}
      </label>
    </div>
  );
};
