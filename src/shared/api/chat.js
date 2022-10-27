import { ApiClient } from '.';

export const chatAPI = {
  getPrivateMessages: async (from_user_id, to_user_id, message_type) =>
    ApiClient.get(`/chat/private_chat/messages/${from_user_id}/${to_user_id}/${message_type}/`),
  sendPrivateMessages: async (from_user_id, to_user_id, message_type, body) =>
    ApiClient.post(`/chat/private_chat/messages/${from_user_id}/${to_user_id}/${message_type}/`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getAdminInfo: async () => ApiClient.get(`/lk_administrator/admin/info/`),

  getChats: async () => ApiClient.get(`/chat/all_chats/`),

  getTeams: async quest_id => ApiClient.get(`/quests/quest/${quest_id}/chat/teams/`),
  getAuthors: async quest_id => ApiClient.get(`/quests/quest/${quest_id}/chat/teams/authors/`),
  getPlayers: async (quest_id, team_id) => ApiClient.get(`/quests/quest/${quest_id}/chat/teams/${team_id}/players/`),
  addTeam: async (quest_id, data) => ApiClient.post(`/quests/quest/${quest_id}/chat/teams/`, data),
  sendMessage: async (quest_id, team_id, rec_team_id, message) =>
    ApiClient.post(`/chat/quest/${quest_id}/chat/messages/teams/${team_id}/${rec_team_id}/send/`, message),
  getMessages: async (quest_id, team_id, rec_team_id, page) =>
    ApiClient.get(`/chat/quest/${quest_id}/chat/messages/teams/${team_id}/${rec_team_id}/${page}/`),
  confirmAuthor: async (quest_id, member_id, vote_type) =>
    ApiClient.post(`/quests/quest/join/author/vote/`, {
      quest_id: quest_id,
      team_member_id: member_id,
      vote: vote_type,
    }),
  // joinAuthorConfirm: async (quest_id, member_id) =>
  //   ApiClient.post(`/quests/quest/${quest_id}/chat/teams/authors/join/confirm/${member_id}/`),
  joinAuthorConfirm: async (quest_id, member_id, data) =>
    ApiClient.post(`/quests/quest/${quest_id}/join/author/confirm/${member_id}/`, data),
  excludeAuthor: async (quest_id, member_id) =>
    ApiClient.post(`/quests/quest/${quest_id}/chat/teams/authors/exclude/${member_id}/`),
  joinPlayerconfirm: async (quest_id, team_id, member_id) =>
    ApiClient.post(`/quests/quest/${quest_id}/chat/teams/${team_id}/join/confirm/${member_id}/`, { vote: 'L' }),
  excludePlayer: async (quest_id, team_id, member_id) =>
    ApiClient.post(`/quests/quest/${quest_id}/chat/teams/${team_id}/exclude/${member_id}/`),
  joinPlayer: async (quest_id, team_id) => ApiClient.post(`/quests/quest/${quest_id}/chat/teams/${team_id}/join/`),
  leavePlayer: async (quest_id, team_id) => ApiClient.post(`/quests/quest/${quest_id}/chat/teams/${team_id}/quit/`),
};
