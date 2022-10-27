import { ApiClient } from '.';

export const complaintsAPI = {
  getComplaints: async () => ApiClient.get(`/accounts/notepad/all/`),
  addComplaint: async (quest_id, data) => ApiClient.post(`/quests/quest/${quest_id}/complaint/add/`, data),
};
