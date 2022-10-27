import React, { useEffect, useMemo, useState } from 'react';
import cls from '../../profileadmin.module.scss';
import { TextInput } from 'shared/ui/text-input';

import iconCalendar from '../../../../shared/assets/test-content/calendar-gray2.svg';

import { FilterToggle } from 'entities/filter-toggle';
import { Caption, Title4 } from 'shared/ui/typography';
import avatar from 'shared/assets/test-content/foto.png';

import { User } from './components/User/User';
import { adminPanelApi } from 'shared/api/admin-panel';

export const Replenishment = () => {
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState('');

  const filteredUsers = useMemo(() => {
    if (filterName) {
      return users.filter(user => user.username.toLowerCase().startsWith(filterName.toLowerCase()));
    } else {
      return users;
    }
  }, [users, filterName]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await adminPanelApi.getUsers();
      setUsers(data.data);
    };

    fetch();
  }, []);
  return (
    <div className={cls.replenishment}>
      <div className={cls.top}>
        <Title4 className={cls.title}>Новые пользователи</Title4>
        {/* <div className={cls.date}>
          <img src={iconCalendar} alt="iconCalendar" />
          <Caption className={cls.caption}>22 - 24.05.2022</Caption>
        </div> */}
        <FilterToggle
          className={cls.right}
          items={[<TextInput value={filterName} onChange={event => setFilterName(event.target.value)} />]}
          onReset={() => setFilterName('')}
        />
      </div>
      {/* <div>Grafic</div> */}
      <div className={cls.listUsers}>
        {filteredUsers.slice(0, 5).map(user => (
          <User key={user.pk} user={user} />
        ))}
      </div>
    </div>
  );
};
