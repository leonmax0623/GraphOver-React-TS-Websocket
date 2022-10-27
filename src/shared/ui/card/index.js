import React from 'react';
import { Link } from 'react-router-dom';
import cls from './card.module.scss';

export const ShadowSizes = {
  big: 'BIG',
  small: 'SMALL',
};

export const Card = ({ className = null, shadowSize = ShadowSizes.small, link = '', children }) => {
  const containerCls = [cls.container, className];

  switch (shadowSize) {
    case ShadowSizes.big:
      containerCls.push(cls.shadowBig);
      break;
    case ShadowSizes.small:
      containerCls.push(cls.shadowSmall);
      break;
    default:
      break;
  }
  if (link)
    return (
      <Link to={link} className={containerCls.join(' ')}>
        {children}
      </Link>
      // <a className={containerCls.join(' ')}>
      //   {children}
      // </a>
    );
  return <div className={containerCls.join(' ')}>{children}</div>;
};
