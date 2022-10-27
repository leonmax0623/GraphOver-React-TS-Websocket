import React, { useEffect, useRef, useState } from 'react';
import cls from './chat.module.scss';

import { ChatSidebar } from './chat-sidebar';
import { useChatAdmin, useChatMessages, useChats } from './hooks';
import { ChatBody } from './chat-body/chat-body';
import { useSelector } from 'react-redux';
import { useChat, useWebSocketChat } from 'app/hooks/chat';

export const ChatPage = () => {
  const ws = useRef({});
  const messagesEndRef = useRef(null);

  const [currentUser, setcurrentUser] = useState(null);
  const userId = useSelector(state => state.userReducer.user.pk);
  const { getChats, addMessage, sendMessage, scrollToBottom } = useChats();
  const {} = useWebSocketChat(userId, ws, addMessage);
  const { getAdminInfo } = useChatAdmin();
  // const { getMessages } = useChatMessages();

  const { getMessages: getMessagesById } = useChat();

  useEffect(() => {
    if (userId) {
      getChats();
      getAdminInfo();
    }
  }, [userId]);

  // useEffect(() => {
  //   getMessages(currentUser);
  // }, [currentUser]);

  return (
    <div className={cls.container}>
      <ChatSidebar currentUser={currentUser} setcurrentUser={setcurrentUser} />
      <ChatBody
        currentUser={currentUser}
        scrollToBottom={scrollToBottom}
        sendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};
