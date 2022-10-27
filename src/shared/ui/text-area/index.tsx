import React from 'react';
import cls from './text-area.module.scss';
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
  onBlur?: (e: any) => null;
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

export const TextArea: FC<ITextInput> = props => {
  const {
    id,
    placeholder,
    className,
    // icon = null,
    // control = null,
    status,
    message,
    filled,
    value,
    onChange,
    onBlur,
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
      <div className={cls.fieldContainer}>
        {/*{icon && <Icon name={icon} className={cls.icon} size={28}/>}*/}
        <textarea
          id={id}
          className={cls.field}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange && (e => onChange(e))}
          onBlur={onBlur && (e => onBlur(e))}
          {...(register ? register(id) : {})}
        />
      </div>

      {message && <p className={cls.message}>{message}</p>}
    </div>
  );
};
