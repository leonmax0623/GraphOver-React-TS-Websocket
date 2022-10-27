import React from 'react';
import cls from './select-input.module.scss';
import Select from 'react-select';
import SelectMultiple from 'react-select';
import { TextInputStatuses } from '../text-input';

export const SelectInputStatuses = {
  default: 'DEFAULT',
  error: 'ERROR',
  success: 'SUCCESS',
};

export const SelectInput = ({
  label,
  options,
  name,
  multiple = false,
  placeholder = '',
  changeHandler = () => null,
  disabled = false,
  value,
  message = null,
  status = SelectInputStatuses.default,
  className = null,
  paddingLeft,
  color,
}) => {
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#ffffff',
      borderRadius: 5,
    }),
    control: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 40,
      width: '100%',
      backgroundColor: 'transparent',
      border: '1px solid #DADADA',
      borderRadius: '5px',
      paddingLeft: paddingLeft,
      color: color,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: (provided, state) => ({
      color: state.isSelected ? '#ffffff' : '#0D062D',
      backgroundColor: state.isSelected ? '#5030E5' : state.isFocused ? '#F7F6FD' : 'transparent',
      padding: '1px 9px',
      fontSize: '13px',
      lineHeight: '24px',
      ':hover': {
        backgroundColor: '#F7F6FD',
        color: '#0D062D',
        cursor: 'pointer',
      },
      ':active': {
        backgroundColor: '#F7F6FD',
        color: '#0D062D',
        cursor: 'pointer',
      },
    }),
    multiValue: () => ({
      display: 'flex',
      flexDirection: 'row-revers',
      paddingLeft: 8,
      marginRight: 5,
      marginBottom: 5,
      alignItems: 'center',
      height: '28px',
      border: '1px solid #5030E5',
      borderRadius: '5px',
    }),
    multiValueLabel: () => ({
      fontSize: '13px',
      lineHeight: '16px',
      fontWeight: 500,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'inherit',
    }),
  };

  const containerCls = [
    cls.container,
    className,
    // filled ? cls.field : null
  ];

  switch (status) {
    case TextInputStatuses.error:
      containerCls.push(cls.error);
      break;
    case TextInputStatuses.success:
      containerCls.push(cls.success);
      break;
  }

  return (
    <div className={containerCls.join(' ')}>
      {label && <p className={cls.label}>{label}</p>}
      <Select
        className={className}
        styles={customStyles}
        options={options}
        placeholder={placeholder}
        allowClear={true}
        isMulti={false}
        value={options.filter(option => option.value === value)}
        // defaultValue={options.filter(option => option.value === value)}
        isDisabled={disabled}
        onChange={e => changeHandler(e.value)}
      />
      {message && <p className={cls.message}>{message}</p>}
    </div>
  );
};
