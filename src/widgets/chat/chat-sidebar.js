import { useEffect, useState } from 'react';
import cls from './chat.module.scss';

import { SearchFieldToggle } from 'shared/ui/search-field-toggle';
import { Caption, Title4 } from 'shared/ui/typography';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertDateMn } from 'shared/utils';
import { ModalAddChat } from 'widgets/modals/modal-add-chat';
import iconAdd from '../../shared/assets/test-content/add.svg';
import { useFriends } from './hooks';

const DialogItem = ({ user, text, time, count, active, onClick }) => (
  <div className={classNames(cls.dialogsItem, { [cls.dialogsItemActive]: active })} >
    <Link to={`/profile/${user?.id}`}>
      <img src={!user?.is_administrator ? 'https://graphover.ru' + user?.avatar : user?.avatar} className={cls.picture} />
    </Link>
    <div onClick={onClick}>
      <Title4 className={cls.title}>{user?.username}</Title4>
      <Caption className={cls.caption}>{text}</Caption>
      <span className={cls.time}>{convertDateMn(time)}</span>
    </div>
    {/* <span className={cls.count}>{count}</span> */}
  </div>
);

export const ChatSidebar = ({ currentUser, setcurrentUser }) => {
  const userId = useSelector(state => state.userReducer.user.pk);
  const chats = useSelector(state => state.chatReducer.chats);
  let admin_info = useSelector(state => state.chatReducer.adminInfo[0]);

  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { getFriends } = useFriends();
  const chatsList = Object.keys(chats);
  const adminChat = chats[admin_info?.id];
  const adminChatItem = adminChat ? adminChat[0] : {};

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className={cls.left}>
      <ModalAddChat isOpen={isOpen} setIsOpen={setIsOpen} setcurrentUser={setcurrentUser} />
      <div className={cls.top}>
        <SearchFieldToggle
          value={search}
          onChange={val => setSearch(val)}
          open={true}
          className={cls.searchField}
          name={'search'}
          placeholder={'Поиск'}
        />

        {/* <SelectInput
          className={cls.sort}
          placeholder={'Друзья'}
          options={[
            { label: 'Друзья', value: 'f1', id: 1 },
            { label: 'Друзья', value: 'f2', id: 2 },
          ]}
        /> */}

        <div className={cls.icons__item} onClick={() => setIsOpen(true)}>
          <img src={iconAdd} alt="iconAdd" />
        </div>
      </div>
      <div className={cls.dialogs}>
        <DialogItem
          key={admin_info?.id}
          onClick={() => setcurrentUser(admin_info?.id)}
          user={admin_info}
          text={adminChatItem?.body}
          time={adminChatItem?.timestamp}
          active={currentUser === admin_info?.id}
        // count={'2'}
        />
        {chatsList.length > 0 &&
          chatsList
            .filter(id => id !== String(admin_info?.id))
            .map(chtId => {
              const cthItemMessagesList = chats[chtId];

              if (!cthItemMessagesList || !cthItemMessagesList.length) return <></>;
              const { from_user, body, to_user, timestamp } = cthItemMessagesList[0];
              const user = from_user.id === userId ? to_user : from_user;
              if (!user.username.toLowerCase().includes(search.toLocaleLowerCase())) return <></>;
              return (
                <DialogItem
                  key={chtId}
                  onClick={() => setcurrentUser(chtId)}
                  user={user}
                  text={body}
                  time={timestamp}
                  active={currentUser === chtId}
                // count={'2'}
                />
              );
            })}
      </div>
    </div>
  );
};
