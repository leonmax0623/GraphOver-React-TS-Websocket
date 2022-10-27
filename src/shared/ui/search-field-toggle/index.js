import React, { useState } from 'react';
import cls from './search-field-toggle.module.scss';
import { ScreenReader } from '../screen-reader';

export const SearchFieldToggle = ({
  open,
  name,
  placeholder = null,
  value,
  onChange = e => null,
  className = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={[cls.container, className, isOpen || open ? cls.open : null].join(' ')}>
      <button type={'button'} className={cls.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        <ScreenReader>Открыть форму поиска</ScreenReader>
        <svg
          className={cls.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 11C19 13.2091 18.1046 15.2091 16.6569 16.6569C15.2091 18.1046 13.2091 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#171D25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M20.9999 20.9999L16.6567 16.6567" stroke="#171D25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <input
        type={'text'}
        name={name}
        placeholder={placeholder}
        className={cls.field}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
