import { ApiClient } from '.';

export const moderatorAPI = {
  getMessages: async page => ApiClient.get(`/accounts/user/moderator/chat/${page}/`),
  sendMessage: async text => ApiClient.post(`/accounts/user/moderator/chat/send/`, { text: text }),
  chooseTopic: async name => ApiClient.post(`/accounts/user/moderator/choise/category/`, { name: name }),
  getQuests: async () => ApiClient.get(`/accounts/user/moderator/moderation/quests/`),
  getMedia: async () => ApiClient.get(`/accounts/user/moderator/moderation/media/`),
  setMediaVote: async (media_id, data) =>
    ApiClient.post(`/accounts/user/moderator/moderation/media/${media_id}/vote/`, data),
  getGrafs: async () => ApiClient.get(`/accounts/user/moderator/moderation/graphs/`),
  setGrafVote: async (graf_id, chapter_id, vote) =>
    ApiClient.post(`/accounts/user/moderator/moderation/graphs/${graf_id}/${chapter_id}/vote/`, {
      vote: vote,
      reason_for_rejection: vote,
    }),
  getAnswers: async () => ApiClient.get(`/accounts/user/moderator/moderation/answers/`),
  setAnswerVote: async (task_id, answ_id, vote) =>
    ApiClient.post(`/accounts/user/moderator/moderation/answers/${task_id}/${answ_id}/vote/`, {
      vote: vote,
      reason_for_rejection: vote,
    }),
  questVote: async (quest_id, data) =>
    ApiClient.post(`/accounts/user/moderator/moderation/quests/${quest_id}/vote/`, data),
};
