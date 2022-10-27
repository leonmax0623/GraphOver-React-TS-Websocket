import { chatActions } from 'app/store/chat-slice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatAPI } from 'shared/api/chat';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useChat = (from_id, to_id, message_type) => {
  const [messages, setMessages] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const getMessages = async () => {
    try {
      const { data } = await chatAPI.getPrivateMessages(from_id, to_id, message_type);

      setMessages(data.data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  const addMessage = async (msg, direct = 'up') => {
    if (direct === 'up') setMessages([msg.new_message, ...messages]);
    else setMessages([...messages, msg.new_message]);
  };

  const sendMessage = async () => {
    try {
      const { data } = await chatAPI.sendPrivateMessages(from_id, to_id, message_type, { body: newComment });
      getMessages(data);
      setNewComment('');
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getMessages, sendMessage, messages, addMessage, newComment, setNewComment };
};

const create_WS_URL = roomName =>
  window.location.protocol === 'https:'
    ? `wss://${window.location.host}/ws/chat/private/${roomName}/`
    : `wss://graphover.ru/ws/chat/private/${roomName}/`;
// : `wss://${process.env.REACT_APP_BACKEND_WS_LOCAL}/ws/chat/private/${roomName}/`;

export const useWebSocketChat = (roomName, webSockets, addMessage, messages) => {
  const dispatch = useDispatch();

  // const ws = useRef(null);
  useEffect(() => {
    if (roomName) {
      if (!Object.keys(webSockets.current).includes(roomName)) {
        const _new_ws = new WebSocket(create_WS_URL(roomName));
        const _new_obj = { ...webSockets.current };
        _new_obj[roomName] = _new_ws;
        webSockets.current = _new_obj;
        gettingData();
      }
      // return () => webSockets.current[roomName].close();
    }
  }, [webSockets, roomName, addMessage, messages]);

  const gettingData = useCallback(() => {
    if (!webSockets.current || !webSockets.current[roomName]) return;
    webSockets.current[roomName].onmessage = e => {
      //подписка на получение данных по вебсокету
      const message = JSON.parse(e.data);
      addMessage && addMessage(message);
      // dispatch(chatActions.addMessage({ id: roomName, data: message }));
      // setTimeout(() => scrollChatRef.current.scrollToBottom());
    };
  }, [webSockets, roomName, addMessage, messages]);

  return {};
};
