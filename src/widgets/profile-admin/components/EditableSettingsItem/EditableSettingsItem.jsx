import React from 'react';
import cls from '../../profileadmin.module.scss';
import { TextInput } from 'shared/ui/text-input';

export const EditableSettingsItem = (
  {
    label,
    value,
    isAbleToEdit,
    onInputChange,
  }) => {
  return (
    <li>
      <span className={cls.tit}>
        { label }
      </span>
      {
        isAbleToEdit ? (
          <TextInput
            value={ value }
            onChange={ event => onInputChange(event.target.value) }
          />
        ) : (
          <span className={cls.data}>
            { value }
          </span>
        )
      }
    </li>
  );
};

