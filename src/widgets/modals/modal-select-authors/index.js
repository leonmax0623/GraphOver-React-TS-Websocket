import React, { useEffect } from 'react';

import cls from './styles.module.scss';

import { Caption, Title2, Title3 } from 'shared/ui/typography';
import { Modal } from '../../../shared/ui/modal';
import { BtnCloseModal } from '../../../shared/ui/modal/btnclose-modal';
import { Button, ButtonSizes, ButtonTypes } from 'shared/ui/button';
import { Radio } from 'shared/ui/radio';

import foto from 'shared/assets/test-content/foto.png';
import { useAllUsers } from 'shared/hooks/all-users';
import { useSelector } from 'react-redux';
import { useFriends } from 'widgets/chat/hooks';

const UserItem = ({ setChecked, checked, friend }) => {
  const { username, avatar, id } = friend;
  return (
    <div className={cls.item}>
      <input
        value={checked}
        onChange={e => setChecked(e.target.checked, username)}
        type={'checkbox'}
        className={cls.field}
        id={username}
      />
      <label htmlFor={username} className={cls.authorLabel}>
        <img className={cls.picture} src={avatar} alt={'foto'} />
        <div className={cls.txt}>
          <span className={cls.tit}>{username}</span>
          {/* <span className={cls.name}></span> */}
        </div>
      </label>
    </div>
  );
};

export const ModalSelectAuthors = ({ isOpen, setIsOpen, authors, setAuthors }) => {
  // const { getUsers } = useAllUsers();
  const { getFriends } = useFriends();
  const friends = useSelector(state => state.userReducer.friends);
  const userId = useSelector(state => state.userReducer.user.pk);

  useEffect(() => {
    getFriends();
  }, []);

  const handleChecked = (val, username) => {
    if (val) {
      setAuthors([...authors, username]);
    } else {
      setAuthors(authors.filter(a => a !== username));
    }
  };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Пригласить авторов</Title3>
      <div className={cls.authorCheckList}>
        {friends
          ?.filter(u => u.pk !== userId)
          .map(u => (
            <UserItem key={u.pk} checked={authors.includes(u.username)} setChecked={handleChecked} {...u} />
          ))}
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          setIsOpen(false);
        }}
        className={cls.btn}
      >
        Пригласить
      </Button>
    </Modal>
  );
};
