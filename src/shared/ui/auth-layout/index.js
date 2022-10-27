import React from 'react';
import cls from './auth-layout.module.scss';
import { isWebpSupported } from 'react-image-webp/dist/utils';

import logoWhite from 'shared/assets/images/logo/logo-white.svg';

import coverWebp from './assets/cover.webp';
import coverJpg from './assets/cover.jpg';

const cover = isWebpSupported() ? coverWebp : coverJpg;

export const AuthLayout = ({ header, children }) => {
  return (
    <div className={cls.container}>
      <div className={cls.left}>
        <div className={cls.main}>
          {header && <div className={cls.top}>{header}</div>}

          <div className={cls.card}>{children}</div>
        </div>

        <div className={cls.rectangleBig} />
        <div className={cls.rectangleSmall} />
      </div>

      <div
        className={cls.cover}
        style={{
          backgroundImage: `url("${cover}")`,
        }}
      >
        <img width={225} height={116} src={logoWhite} alt={'Логотип GraphOver'} className={cls.logoCover} />
      </div>
    </div>
  );
};
