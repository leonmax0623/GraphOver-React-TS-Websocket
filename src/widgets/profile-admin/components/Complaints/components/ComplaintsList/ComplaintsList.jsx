import React, { memo } from 'react';
import cls from '../../../../profileadmin.module.scss';

import { ComplaintsItem } from '../ComplaintsItem/ComplaintsItem';

export const ComplaintsList = memo((
  {
    complaints = [],
    setCurrentComplaint
  }) => {
  return (
    <div className={cls.targetList}>
      {
        complaints.length && complaints.map((complaint) => {

            const user = complaint.type === 'Жалоба' ? complaint.sender : complaint.user;

            return (
              <ComplaintsItem
                key={ complaint.id + Math.random() }
                type={ complaint.type }
                authorAvatarUrl={user.avatar}
                authorStatus={user.role}
                authorName={user.username}
                date={ new Date(complaint.created_at).toLocaleString("ru", { dateStyle: 'short' }) }
                title={ complaint.text.slice(0, 15) + '...' }
                text={ complaint.text }
                onButtonClick={ () => setCurrentComplaint(complaint) }
              />
            );
          },
        )
      }
    </div>
  );
});

