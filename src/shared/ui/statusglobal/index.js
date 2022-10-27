import React from 'react';
import cls from './status.module.scss';

export const StatusGlobal = ({ status }) => {
  if (status === 'C') return <div className={[cls.status, cls.moderation].join(' ')}>На модерации</div>;
  if (status === 'C') return <div className={[cls.status, cls.moderation].join(' ')}>На модерации</div>;
  return (
    <>
      <div className={[cls.status, cls.moderation].join(' ')}>На модерации</div>
      {/* <span className={[cls.status, cls.moderation].join(' ')}>На модерации</span>
            <span className={[cls.status, cls.waiting].join(' ')}>Ждет корректировки</span>
            <span className={[cls.status, cls.approved].join(' ')}>Одобрен</span>
            <span className={[cls.status, cls.rejected].join(' ')}>Отклонен</span> */}
    </>
  );
};
