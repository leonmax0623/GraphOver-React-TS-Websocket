import React from 'react';
import cls from './views-count.module.scss';
import { Icon, IconNames } from 'shared/ui/icon';

export const ViewsCount = ({ className = null, children }) => {
  return (
    <div className={[cls.container, className].join(' ')}>
      <Icon name={IconNames.popular.eye} className={cls.icon} size={21} />
      <span>{children}</span>
    </div>
  );
};
