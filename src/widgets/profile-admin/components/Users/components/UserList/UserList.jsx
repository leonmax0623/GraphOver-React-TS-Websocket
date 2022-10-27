import React from 'react';
import cls from '../../../../profileadmin.module.scss';
import { UserItem } from '../UserItem/UserItem';

export const UserList = ({ fetch, users = [] }) => {
  const _users = users || [];
  const susers = _users.sort((a, b) => (a.id > b.id ? 1 : -1));
  return (
    <div className={cls.targetList}>
      {susers && susers.map(user => <UserItem key={user.pk} user={user} fetch={fetch} />)}
    </div>
  );
};
