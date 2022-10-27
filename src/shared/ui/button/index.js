import React from 'react';
import cls from './button.module.scss';

export const ButtonSizes = {
  small: 'SMALL',
  medium: 'MEDIUM',
  large: 'LARGE',
  huge: 'HUGE',
};

export const ButtonTypes = {
  primary: 'PRIMARY',
  secondary: 'SECONDARY',
  disabled: 'DISABLED',
  outline: 'OUTLINE',
};

export const Button = ({
  className = '',
  size = ButtonSizes.medium,
  type = ButtonTypes.secondary,
  onClick = () => null,
  disabled = false,
  buttonType = 'button',
  children,
}) => {
  const buttonCls = [cls.button, className];

  switch (size) {
    case ButtonSizes.small:
      buttonCls.push(cls.small);
      break;
    case ButtonSizes.medium:
      buttonCls.push(cls.medium);
      break;
    case ButtonSizes.large:
      buttonCls.push(cls.large);
      break;
    case ButtonSizes.huge:
      buttonCls.push(cls.huge);
      break;
    default:
      break;
  }

  switch (type) {
    case ButtonTypes.primary:
      buttonCls.push(cls.primary);
      break;
    case ButtonTypes.secondary:
      buttonCls.push(cls.secondary);
      break;
    case ButtonTypes.disabled:
      buttonCls.push(cls.disabled);
      break;
    case ButtonTypes.outline:
      buttonCls.push(cls.outline);
      break;
    default:
      break;
  }
  if (buttonType === 'submit')
    return <input type={buttonType} value={children} disabled={disabled} className={buttonCls.join(' ')} />;
  return (
    <button type={buttonType} onClick={onClick} disabled={disabled} className={buttonCls.join(' ')}>
      {children}
    </button>
  );
};
