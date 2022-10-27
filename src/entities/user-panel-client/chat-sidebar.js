// import { SelectInput } from 'shared/ui/select-input';
// import { Title5 } from 'shared/ui/typography';
// import { Answer } from 'widgets/answer';
import { MessageChat } from 'widgets/chat-message';
// import { Message } from 'widgets/message';
// import iconArrowBack from 'shared/assets/test-content/arrow_back.svg';

// import foto from 'shared/assets/test-content/foto.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFriends } from 'widgets/chat/hooks';
import cls from './user-panel-client.module.scss';

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
    <div className={cls.messages}>
      <MessageChat
        key={admin_info?.id}
        onClick={() => setcurrentUser(admin_info)}
        user={admin_info}
        text={adminChatItem?.body}
        time={adminChatItem?.timestamp}
        active={currentUser?.id === admin_info?.id}
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
              <MessageChat
                key={chtId}
                onClick={() => setcurrentUser(user)}
                user={user}
                text={body}
                time={timestamp}
                active={currentUser?.id === chtId}
              // count={'2'}
              />
            );
          })}
    </div>
  );
};
