import { chatActions } from 'app/store/chat-slice';
import { userActions } from 'app/store/user-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatAPI } from 'shared/api/chat';
import { userAPI } from 'shared/api/user';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useChats = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.user.pk);
  const pureChats = useSelector(state => state.chatReducer.pureChats);
  const chats = useSelector(state => state.chatReducer.chats);
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const createChatsObj = array => {
    let obj = {};
    if (userId) {
      array.forEach(i => {
        let otherUser;
        otherUser = i.from_user.id !== userId ? i.from_user.id : i.to_user.id;
        if (Object.keys(obj).includes(String(otherUser))) obj[otherUser] = [...obj[otherUser], i];
        else obj[otherUser] = [i];
      });
    }
    return obj;
  };

  const scrollToBottom = messagesEndRef => {
    messagesEndRef.current?.scrollIntoView({});
  };

  const getChats = async () => {
    try {
      const { data } = await chatAPI.getChats();
      dispatch(chatActions.setPureChats(data.private_messages.personal));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  useEffect(() => {
    const chts = createChatsObj(pureChats);
    dispatch(chatActions.setChats(chts));
  }, [pureChats]);

  const addMessage = async msg => {
    getChats();
    // if (!msg) return;
    // console.log('addMessage', msg.new_message, pureChats, chats);
    // console.log(pureChats, [msg.new_message, 123, ...pureChats]);
    // dispatch(chatActions.setPureChats([...pureChats]));
    // if (direct === 'up') setMessages([msg, ...messages]);
    // else setMessages([...messages, msg]);
  };

  const sendMessage = async (from_id, to_id, body, callback) => {
    console.log("sendMessage Files => ", body)
    try {
      const { data } = await chatAPI.sendPrivateMessages(from_id, to_id, 'personal', body);
      await getChats();
      if (callback) callback();
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getChats, addMessage, sendMessage, scrollToBottom };
};

export const useChatAdmin = () => {
  const dispatch = useDispatch();
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const getAdminInfo = async () => {
    try {
      const { data } = await chatAPI.getAdminInfo();
      dispatch(chatActions.setAdminInfo(data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return {
    getAdminInfo,
  };
};

export const useFriends = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.user.pk);
  // const userFriends = useSelector(state => state.userReducer.user.pk);

  const { notificateAxiosError } = useAxiosErrorNotificate();

  const getFriends = async () => {
    if (!userId) return;
    try {
      const { data } = await userAPI.getFriends();
      dispatch(userActions.setFriends(data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  const deleteFriend = async id => {
    try {
      const { data } = await userAPI.deleteFriend({ friend_id: id });
      getFriends();
      // dispatch(userActions.setFriends(data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  const addFriend = async id => {
    try {
      const { data } = await userAPI.addFriend({ friend_id: id });
      getFriends();
      // dispatch(userActions.setFriends(data));
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { getFriends, deleteFriend, addFriend };
};
// export const useChatMessages = () => {
//   const dispatch = useDispatch();

//   const getMessages = async currentUser => {
//     try {
//       // const { data } = await chatAPI.currentUser();
//       // dispatch(chatActions.setChats(data));
//       // dispatch(chatActions.setChats(mockData));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const sendMessage = async () => {
//     try {
//       // const { data } = await chatAPI.getChats();
//       // dispatch(chatActions.setChats(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return { getMessages, sendMessage };
// };
