import React from 'react';
import cls from '../../../profileadmin.module.scss';

import vk from 'shared/assets/test-content/vk.svg';
import whatssapp from 'shared/assets/test-content/whatssapp.svg';
import youtube from 'shared/assets/test-content/youtube.svg';
import telegram from 'shared/assets/test-content/telegram.svg';

export const SocialList = () => {
  return (
    <ul className={cls.list}>
      <li>
        <a href={cls.url} target="_blank">
          <img src={vk} alt={'vk'} />
        </a>
      </li>
      <li>
        <a href={cls.url} target="_blank">
          <img src={whatssapp} alt={'whatssapp'} />
        </a>
      </li>
      <li>
        <a href={cls.url} target="_blank">
          <img src={youtube} alt={'youtube'} />
        </a>
      </li>
      <li>
        <a href={cls.url} target="_blank">
          <img src={telegram} alt={'telegram'} />
        </a>
      </li>
    </ul>
  );
};

