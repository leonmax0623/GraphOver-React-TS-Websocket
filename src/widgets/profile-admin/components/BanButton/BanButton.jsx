import React, { useEffect, useState } from 'react';
import cls from '../../profileadmin.module.scss';

import unableBanIcon from 'shared/assets/test-content/lock.svg';
import banIcon from 'shared/assets/test-content/lock-red.svg';
import unbanIcon from 'shared/assets/test-content/unlock.svg';

const iconMap = {
  ban: banIcon,
  unban: unbanIcon,
  unable: unableBanIcon,
};

export const BanButton = ({ onBan, onUnban, isBanned = false, isAvailableToBan = true }) => {
  const [currentIcon, setCurrentIcon] = useState();

  useEffect(() => {
    if (isBanned) {
      setCurrentIcon('unban');
    } else {
      if (isAvailableToBan) {
        setCurrentIcon('ban');
      } else {
        setCurrentIcon('unable');
      }
    }
  }, [isBanned, isAvailableToBan]);

  const onClick = () => {
    console.log(isBanned);
    if (isBanned) {
      onUnban();
      setCurrentIcon('ban');
    } else {
      onBan();
      setCurrentIcon('unban');
    }
  };

  return (
    <button className={cls.icon} onClick={onClick}>
      <img src={iconMap[currentIcon]} alt={'lock'} />
    </button>
  );
};
