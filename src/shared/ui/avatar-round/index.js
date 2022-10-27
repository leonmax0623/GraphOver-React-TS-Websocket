import React from 'react';
import cls from './avatar-round.module.scss';

export const AvatarRound = ({ image, withBorder = false, size = 30, alt = null, className = null }) => {
  return (
    <div
      className={[cls.container, className, withBorder ? cls.border : null].join(' ')}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img className={cls.image} width={size} height={size} alt={alt} src={image} />
    </div>
  );
};
