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
import { useInviteAuthor } from 'widgets/authors-list/model';
import { useParams } from 'react-router';

const UserItem = ({ setChecked, checked, friend }) => {
  const { username, avatar, id } = friend;
  return (
    <div className={cls.item}>
      <input
        value={checked}
        onChange={e => setChecked(e.target.checked, id)}
        type={'checkbox'}
        className={cls.field}
        id={id}
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

export const ModalInviteAuthors = ({ isOpen, setIsOpen, authors, setAuthors, list, handleAccept }) => {
  // const { getUsers } = useAllUsers();
  const { id } = useParams();
  const { getFriends } = useFriends();

  const friends = useSelector(state => state.userReducer.friends);
  const userId = useSelector(state => state.userReducer.user.pk);

  useEffect(() => {
    getFriends();
  }, []);

  const handleChecked = (val, id) => {
    if (val) {
      setAuthors([...authors, id]);
    } else {
      setAuthors(authors.filter(a => a !== id));
    }
  };

  return (
    <Modal className={cls.modal} isOpen={isOpen} setIsOpen={setIsOpen}>
      <BtnCloseModal setIsOpen={setIsOpen} />
      <Title3 className={cls.title}>Выбрать авторов</Title3>
      <div className={cls.authorCheckList}>
        {friends
          ?.filter(u => u.friend.id !== userId && !list?.includes(u.friend.id))
          .map(u => (
            <UserItem key={u.friend.id} checked={authors.includes(u.friend.id)} setChecked={handleChecked} {...u} />
          ))}
      </div>
      <Button
        size={ButtonSizes.medium}
        type={ButtonTypes.primary}
        onClick={() => {
          setIsOpen(false);
          handleAccept();
        }}
        className={cls.btn}
      >
        Добавить
      </Button>
    </Modal>
  );
};
