// Import modules
import React, { createContext, useEffect, useMemo, useState } from 'react';
import cls from '../../profileadmin.module.scss';

import { Title3 } from 'shared/ui/typography';
import { FilterToggle } from 'entities/filter-toggle';
import { UserList } from './components/UserList/UserList';
import { adminPanelApi } from 'shared/api/admin-panel';
import { Modal25 } from '../../../modals/modal25';
import { TextInput } from 'shared/ui/text-input';

// Exports
export const ModalVerifyContext = createContext({});

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [verifyModalData, setVerifyModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    if (filterName) {
      return users.filter(user => user.username.toLowerCase().startsWith(filterName.toLowerCase()));
    } else {
      return users;
    }
  }, [users, filterName]);

  const setModalData = data => {
    setVerifyModalData(data);
    setIsModalOpen(true);
  };

  const sendVerifyResponse = async response => {
    await adminPanelApi.sendVerifyResponse(verifyModalData?.id, response);
  };

  const fetch = async () => {
    const { data } = await adminPanelApi.getUsers();
    setUsers(data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className={cls.usersBlock}>
        <div className={cls.top}>
          <Title3 className={cls.title}> Пользователи</Title3>

          <FilterToggle
            className={cls.right}
            items={[<TextInput value={filterName} onChange={event => setFilterName(event.target.value)} />]}
            onReset={() => setFilterName('')}
          />
        </div>
        <div className={cls.target}>
          <ModalVerifyContext.Provider value={{ setModalData }}>
            <UserList users={filteredUsers} fetch={fetch} />
          </ModalVerifyContext.Provider>
        </div>
      </div>
      <Modal25
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        name={verifyModalData?.name}
        description={verifyModalData?.description}
        passport={verifyModalData?.passport}
        role={verifyModalData?.role}
        onAllow={() => sendVerifyResponse(true)}
        onDeny={() => sendVerifyResponse(false)}
      />
    </>
  );
};
