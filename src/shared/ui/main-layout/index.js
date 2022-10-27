import React from 'react';
import cls from './main-layout.module.scss';

import cover from './assets/cover.png';

export const MainLayout = ({ sidebar, header, footer, children, withCover = true }) => {
  return (
    <div className={cls.container}>
      {sidebar && <div className={cls.sidebar}>{sidebar}</div>}

      <div className={cls.content}>
        {header && <div className={cls.header}>{header}</div>}

        <main className={cls.main}>
          {withCover && (
            <div
              className={cls.cover}
              style={{
                backgroundImage: `url('${cover}')`,
              }}
            />
          )}
          {children}
        </main>

        {footer && <div className={cls.footer}>{footer}</div>}
      </div>
    </div>
  );
};
