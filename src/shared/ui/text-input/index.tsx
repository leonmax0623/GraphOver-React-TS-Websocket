import React from 'react';
import cls from './text-input.module.scss';
import makeId from 'shared/lib/makeId';
import { Icon } from '../icon';
import { FC } from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';

export const TextInputStatuses = {
  default: 'DEFAULT',
  error: 'ERROR',
  success: 'SUCCESS',
};

interface ITextInput {
  value?: string;
  onChange?: (e: any) => null;
  placeholder?: string;
  id?: any;
  label?: string;
  inputType?: string;
  className?: string;
  status?: string;
  message?: string;
  filled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  register?: UseFormReset<FieldValues>;
}

export const TextInput: FC<ITextInput> = props => {
  const {
    id,
    placeholder,
    label,
    inputType,
    className,
    // icon = null,
    // control = null,
    status,
    message,
    filled,
    value,
    onChange,
    register,
    readOnly,
  } = props;

  const containerCls = [cls.container, className, filled ? cls.field : null];

  switch (status) {
    case TextInputStatuses.error:
      containerCls.push(cls.error);
      break;
    case TextInputStatuses.success:
      containerCls.push(cls.success);
      break;
    default:
      break;
  }
  // console.log({ ...(register ? register(id) : {}) });

  return (
    <div className={containerCls.join(' ')}>
      {label && (
        <label htmlFor={id} className={cls.label}>
          {label}
        </label>
      )}

      <div className={[cls.fieldContainer, className].join(' ')}>
        {/*{icon && <Icon name={icon} className={cls.icon} size={28}/>}*/}
        <input
          id={id}
          className={cls.field}
          type={inputType}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange && (e => onChange(e))}
          // ref={register && register(id)}
          //  @ts-ignore
          {...(register ? register(id) : {})}
        />
        {/*{control}*/}
      </div>

      {message && <p className={cls.message}>{message}</p>}
    </div>
  );
};
