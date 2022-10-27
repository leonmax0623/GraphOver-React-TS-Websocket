// import { chatAPI } from 'http/chat';
// import { questAPI } from 'http/quest';
// import { useSnackbar } from 'notistack';
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { chatActions } from 'store/chat-slice';
// import { taskActions } from 'store/task';

// const create_WS_URL = roomName =>
//   window.location.protocol === 'https:'
//     ? `wss://${window.location.host}/ws/chat/${roomName}/`
//     : `ws://${process.env.REACT_APP_BACKEND_WS_LOCAL}/ws/chat/${roomName}/`;

// export const useTeamMembers = () => {
//   const dispatch = useDispatch();

//   const getPlayers = async (quest_id, activeTeam) => {
//     let _data;
//     try {
//       const res = await questAPI.getItemStatus(quest_id);
//       if (res.data.status === 'C' || res.data.status === 'D') {
//         return;
//       }
//       const { data } = await chatAPI.getPlayers(quest_id, activeTeam);
//       _data = data;
//       let sorted_data = [...data];
//       try {
//         sorted_data.sort((a, b) => b.user_info.is_owner - a.user_info.is_owner);
//       } catch (err) {
//         console.log(err);
//       }
//       dispatch(taskActions.setPlayerList(sorted_data));
//       // setPlayers(sorted_data);
//       // getMessages(data);
//     } catch (err) {
//       console.log(err);
//     }
//     return _data;
//   };

//   const getAuthors = async quest_id => {
//     try {
//       const res = await questAPI.getItemStatus(quest_id);
//       if (res.data.status === 'C' || res.data.status === 'D') {
//         return;
//       }
//       const { data } = await chatAPI.getAuthors(quest_id);
//       dispatch(taskActions.setAuthorList(data.authors));
//       dispatch(taskActions.setAuthorTeamId(data.author_team_id));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return { getAuthors, getPlayers };
// };

// export const useChat = (quest_id, isAuthor, scrollChatRef, files, setFiles) => {
//   useEffect(() => {
//     setTimeout(() => window.scrollTo(0, 0), 300);
//   }, []);
//   const { getAuthors, getPlayers } = useTeamMembers();

//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();
//   const userId = useSelector(state => state.userReducer.user.pk);

//   const [teams, setTeams] = useState([]);
//   const [activeTab, setActiveTab] = useState(0);
//   const [roomName, setRoomName] = useState('');
//   const [activeTeam, setActiveTeam] = useState(null);
//   const [chatStatus, setChatStatus] = useState(null);
//   const authorsTeamId = useSelector(state => state.tasksReducer.author_team_id);
//   const authors = useSelector(state => state.tasksReducer.authorList);
//   const players = useSelector(state => state.tasksReducer.playerList);
//   const chats = useSelector(state => state.chatReducer.chats);
//   const [messages, setMessages] = useState([]);
//   // const messages = useMemo(() => (chats[roomName] ? chats[roomName].data.messages : []), [chats, roomName]);
//   //  chats[roomName] ? chats[roomName].data.messages : [];

//   useEffect(() => {
//     if (roomName && chats[roomName]) {
//       let m = [];
//       try {
//         chats[roomName].data.messages.forEach(ms => {
//           let ms_ids = m.map(i => i.id);
//           if (!ms_ids.includes(ms.id)) {
//             m.push(ms);
//           }
//         });
//       } catch (err) {
//         console.log(err);
//       }

//       setMessages(m);
//       // setMessages(chats[roomName].data.messages);
//     }
//   }, [chats, roomName]);

//   const createChatIDs = () => {
//     let senderTeamId;
//     let recTeamId;
//     if (isAuthor) {
//       senderTeamId = authorsTeamId;
//       recTeamId = activeTab === 0 ? authorsTeamId : activeTeam;
//     } else {
//       senderTeamId = activeTeam;
//       recTeamId = activeTab === 0 ? activeTeam : authorsTeamId;
//     }
//     return [senderTeamId, recTeamId];
//   };

//   useEffect(() => {
//     const [senderTeamId, recTeamId] = createChatIDs();
//     const _roomName = `${senderTeamId}_${recTeamId}`;
//     setRoomName(_roomName);
//   }, [activeTab, authorsTeamId, activeTeam, isAuthor]);

//   const getTeams = async () => {
//     try {
//       const res = await questAPI.getItemStatus(quest_id);
//       if (res.data.status === 'C' || res.data.status === 'D') {
//         return;
//       }
//       const { data } = await chatAPI.getTeams(quest_id);
//       setTeams(data);
//       if (data.length) setActiveTeam(data[0].id);
//     } catch (err) {}
//   };

//   const getMessages = async (_players = []) => {
//     const [senderTeamId, recTeamId] = createChatIDs();

//     if (!senderTeamId || !recTeamId) return;
//     const _roomName = `${senderTeamId}_${recTeamId}`;

//     if (_roomName && chats[_roomName] && chats[_roomName].data.messages.length !== 0) {
//       setChatStatus(200);
//       dispatch(chatActions.setChat({ id: _roomName, data: chats[_roomName].data }));
//       dispatch(chatActions.setChatPage({ id: _roomName, page: 1 }));
//       return;
//     }

//     let page = chats[_roomName]?.page || 1;
//     try {
//       const res = await questAPI.getItemStatus(quest_id);
//       if (res.data.status === 'C' || res.data.status === 'D') {
//         return;
//       }

//       const { data } = await chatAPI.getMessages(quest_id, senderTeamId, recTeamId, page);
//       setChatStatus(200);

//       if (_roomName && chats[_roomName]) {
//         dispatch(chatActions.setChat({ id: _roomName, data: data }));
//         dispatch(chatActions.setChatPage({ id: _roomName, page: 1 }));
//       } else {
//         dispatch(chatActions.setNewChat({ id: _roomName, data: data }));
//       }
//     } catch (err) {
//       if (err.response) {
//         if (!isAuthor && _players.filter(p => p.user_info.id === userId).length === 0) {
//           setChatStatus(111);
//         } else {
//           setChatStatus(err.response.status);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     getTeams();
//     getAuthors(quest_id);
//     // getMessages();
//     // try {
//     //   scrollChatRef.current.scrollToBottom();
//     // } catch (err) {}
//   }, []);

//   useEffect(() => {
//     if (activeTeam) {
//       (async () => {
//         try {
//           const data = await getPlayers(quest_id, activeTeam);
//           getMessages(data);
//         } catch (err) {
//           console.log(err);
//         }
//       })();
//     }
//   }, [activeTab, activeTeam, authorsTeamId, isAuthor]);

//   //  CHAT
//   const [status, setStatus] = useState('');

//   const onSubmitMessage = async messageText => {
//     const [senderTeamId, recTeamId] = createChatIDs();
//     const message = new FormData();
//     message.append('body', messageText);
//     if (files[0]) message.append('media', files[0]);
//     // const media = '';

//     // files.forEach(f => {
//     //   media.push(f);
//     // });

//     try {
//       await chatAPI.sendMessage(quest_id, senderTeamId, recTeamId, message);
//       // gettingData();
//       setFiles([]);
//     } catch (err) {
//       enqueueSnackbar('Не удалось отправить сообщение', {
//         variant: 'error',
//         preventDuplicate: true,
//       });
//     }
//   };

//   useEffect(() => {
//     // console.log(scrollChatRef);
//     // const scroll = scrollChatRef.current.scrollHeight - scrollChatRef.current.clientHeight;
//     // scrollChatRef.current.scrollTo(0, scroll);
//     setTimeout(() => {
//       scrollChatRef.current.scrollToBottom();
//     }, 0);
//   }, [chats, activeTab, activeTeam]);

//   // const submitMessage = messageString => {
//   //   const message = { name: this.state.name, message: messageString };
//   //   this.ws.send(JSON.stringify(message));
//   //   this.addMessage(message);
//   // };
//   // =======================

//   return {
//     teams,
//     authors,
//     players,
//     roomName,
//     activeTab,
//     chatStatus,
//     messages,
//     activeTeam,
//     onSubmitMessage,
//     setActiveTeam,
//     setActiveTab,
//     getTeams,
//   };
// };

// export const useWebSocketChat = (roomName, scrollChatRef, webSockets) => {
//   const dispatch = useDispatch();
//   // const ws = useRef(null);
//   useEffect(() => {
//     if (roomName) {
//       if (!Object.keys(webSockets.current).includes(roomName)) {
//         const _new_ws = new WebSocket(create_WS_URL(roomName));
//         const _new_obj = { ...webSockets.current };
//         _new_obj[roomName] = _new_ws;
//         webSockets.current = _new_obj;
//         gettingData();
//       }
//       // return () => webSockets.current[roomName].close();
//     }
//   }, [webSockets, roomName]);

//   const gettingData = useCallback(() => {
//     if (!webSockets.current || !webSockets.current[roomName]) return;
//     webSockets.current[roomName].onmessage = e => {
//       //подписка на получение данных по вебсокету
//       const message = JSON.parse(e.data).message;
//       dispatch(chatActions.addMessage({ id: roomName, data: message }));
//       // setTimeout(() => scrollChatRef.current.scrollToBottom());
//     };
//   }, [webSockets, roomName]);

//   return {};
// };
