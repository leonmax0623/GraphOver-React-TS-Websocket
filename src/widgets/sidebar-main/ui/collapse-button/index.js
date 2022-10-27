import React from 'react';
import cls from './collapse-button.module.scss';
import { Icon, IconNames } from 'shared/ui/icon';
import { ScreenReader } from 'shared/ui/screen-reader';

export const CollapseButton = ({ collapse = true, onClick }) => {
  return (
    <button onClick={onClick} className={cls.button}>
      <Icon
        name={IconNames.popular.chevronsRight}
        className={[cls.icon, collapse ? null : cls.flip].join(' ')}
        size={24}
      />
      <ScreenReader>Свернуть/развернуть меню</ScreenReader>
    </button>
  );
};
