import { ApiClient } from '.';

export const taskAPI = {
  getTasks: async id => ApiClient.get(`/quests/quest/${id}/tasks/`),
  getAnswers: async (id, task_id) => ApiClient.get(`/quests/quest/${id}/tasks/${task_id}/answers/`),
  addTask: async (id, data) => ApiClient.post(`/quests/quest/${id}/tasks/add/`, data),
  addAnswer: async (quest_id, task_id, data) =>
    ApiClient.post(`/quests/quest/${quest_id}/tasks/${task_id}/answers/add/`, data),
  voteAnswer: async (quest_id, task_id, data) =>
    ApiClient.post(`/quests/quest/${quest_id}/tasks/${task_id}/answers/vote/`, data),
  voteLikeAnswer: async (quest_id, task_id, answ_id, data) =>
    ApiClient.post(`/quests/quest/${quest_id}/tasks/${task_id}/answers/${answ_id}/like/`, data),
};
