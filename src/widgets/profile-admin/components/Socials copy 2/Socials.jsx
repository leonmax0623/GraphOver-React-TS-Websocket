// Import modules
import React from 'react';
import cls from '../../profileadmin.module.scss'

import { Title3 } from 'shared/ui/typography';
import { SocialList } from './components/SocialList';

// Exports
export const Socials = () => {
  return (
    <div className={cls.social}>
      <div className={cls.topTitle}>
        <Title3 className={cls.title}>Соц.сети</Title3>
      </div>
      <SocialList />
    </div>
  );
}
