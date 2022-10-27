import { SelectInput } from 'shared/ui/select-input';
import { MessageChat } from 'widgets/chat-message';
import cls from './chat.module.scss';

export const AllChats = ({ isOpenChat, openChat }) => {
  return (
    <div className={[cls.chatDrop, isOpenChat && cls.opened].join(' ')}>
      <div className={cls.controls}>
        <SelectInput
          className={cls.sort}
          placeholder={'Сортировать по'}
          options={[
            { label: 'Все сообщения', value: 'all', id: 1 },
            { label: 'Новые сообщения', value: 'message', id: 2 },
            { label: 'Команда', value: 'team', id: 2 },
          ]}
        />
        <button className={cls.btnClose} onClick={openChat}>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={cls.messages}>
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
        <MessageChat />
      </div>
    </div>
  );
};

// export const HeaderChatWidget = () => {

//   return (

//   )
// }

// export const HeaderChatWidget = () => {

//   return (

//   )
// }
