import { ApiClient } from 'shared/api';

export const notificateAPI = {
  getNotificationsStatus: async () => ApiClient.get(`/quests/quest/notifications/status/`),
  getNotificationList: async page => ApiClient.get(`/quests/quest/notifications/${page}/`),
};

const create_WS_URL = user_id =>
  window.location.protocol === 'https:'
    ? `wss://${window.location.host}/ws/notifications/${user_id}/`
    : `wss://graphover.ru/ws/notifications/${user_id}/`;
// : `wss://${process.env.REACT_APP_BACKEND_WS_LOCAL}/ws/notifications/${user_id}/`;
// : `ws://176.53.162.180:8000/ws/notifications/user_${user_id}/`;
// : `ws://176.53.162.180:8000/ws/notifications/user_${user_id}/`;

export const notificateWebsocket = user_id => {
  return new WebSocket(create_WS_URL(user_id));
};
