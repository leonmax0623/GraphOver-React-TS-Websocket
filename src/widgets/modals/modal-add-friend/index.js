import React, { useEffect } from 'react';

import cls from './styles.module.scss';

import { Caption, Title2, Title4, Title5 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';

import foto from 'shared/assets/test-content/foto.png';
import arrow from 'shared/assets/test-content/arrow_right.svg';
import add from 'shared/assets/test-content/add.svg';
import iconDelete from 'shared/assets/test-content/icdelete.svg';
import { useChat } from 'app/hooks/chat';
import { useChats, useFriends } from 'widgets/chat/hooks';
import { useSelector } from 'react-redux';
import { useAllUsers } from 'shared/hooks/all-users';

const UserItem = ({ setIsOpen, state }) => {
  const userId = useSelector(state => state.userReducer.user.pk);
  const { pk, username, email } = state;
  const { addFriend } = useFriends();

  const createEmptyMsg = () => {
    addFriend(pk);
    setIsOpen(false);
  };

  return (
    <div className={cls.item}>
      <img className={[cls.picture, cls.active].join(' ')} src={foto} alt={'foto'} />
      <div className={cls.text}>
        <Title5 className={cls.title}>{username}</Title5>
        <span className={cls.desc}>{email}</span>
      </div>
      <div className={cls.controls} onClick={createEmptyMsg}>
        <button className={cls.arrow}>
          <img src={add} alt={'arrow'} />
        </button>
      </div>
    </div>
  );
};

export const ModalAddFriend = ({ isOpen, setIsOpen, setcurrentUser }) => {
  const { getUsers } = useAllUsers();
  const users = useSelector(state => state.userReducer.users);
  const userId = useSelector(state => state.userReducer.user.pk);
  const friends = useSelector(state => state.userReducer.friends);
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={cls.top}>
        <BtnCloseModal setIsOpen={setIsOpen} />
        <Title4 className={cls.title}>Пользователи</Title4>
        <div className={cls.list}>
          {users
            ?.filter(u => u.pk !== userId && !friends.map(f => f.friend.id).includes(u.pk))
            ?.map(u => (
              <UserItem key={u.pk} setIsOpen={setIsOpen} setcurrentUser={setcurrentUser} state={u} />
            ))}
        </div>
      </div>
    </Modal>
  );
};
