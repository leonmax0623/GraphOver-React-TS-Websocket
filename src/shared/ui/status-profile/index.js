import React from 'react';
import cls from './status.module.scss';

export const StatusProfile = ({ status, verified }) => {
  return (
    <>
      {
        verified ? (
          <div className={[cls.status, cls.verified].join(' ')}>Верифицирован</div>
        ) : (
          <div className={[cls.status, cls.notverified].join(' ')}>Не верифицирован</div>
        )
      }

      {/*  */}
    </>
  );
};
