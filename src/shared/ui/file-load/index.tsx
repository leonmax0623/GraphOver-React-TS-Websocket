import React from 'react';
import cls from './file-load.module.scss';
import { FC } from 'react';

interface IFileLoad {
  value?: string;
  onChange?: (e: any) => null;
  placeholder?: string;
  id?: any;
  label?: string;
  inputType?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
}

export const FileLoad: FC<IFileLoad> = props => {
  const { id, placeholder, className, label, value, onChange, readOnly, multiple } = props;

  return (
    <div className={[cls.container, className].join(' ')}>
      <input
        type={'file'}
        id={id}
        className={cls.fiel}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        multiple={multiple}
        onChange={e => {
          onChange && onChange(e);
        }}
      />
      <label className={cls.label} htmlFor={id}>
        Подкрепить {multiple ? 'файлы' : 'файл'} {label && `(${label})`}
      </label>
    </div>
  );
};
