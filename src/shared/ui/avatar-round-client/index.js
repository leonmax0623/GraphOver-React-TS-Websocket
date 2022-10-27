import React from 'react';
import cls from './avatar-round-client.module.scss';

export const AvatarRound1 = ({
  image,
  withBorder = false,
  size = 30,
  alt = null,
  className = null,
  openMenuHandle,
}) => {
  return (
    <div
      className={[cls.container, className, withBorder ? cls.border : null].join(' ')}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img className={cls.image} width={size} height={size} alt={alt} src={image} onClick={openMenuHandle} />
    </div>
  );
};
