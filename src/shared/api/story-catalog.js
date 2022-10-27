import { ApiClient } from '.';

export const storyCatalogAPI = {
  getAllItems: async () =>
    ApiClient.get(`/quests/quest/all/`, {
      headers: { 'Content-Type': 'application/json' },
    }),
  getItems: async (page, params) =>
    ApiClient.get(`/quests/quest/${page}/`, {
      headers: { 'Content-Type': 'application/json' },
      params: params,
    }),
  getItemsById: async userId =>
    ApiClient.get(`/accounts/user/${userId}/quests/`, {
      headers: { 'Content-Type': 'application/json' },
    }),
  getItemsN: async params =>
    ApiClient.post(`/quests/quest/filter/`, params, {
      headers: { 'Content-Type': 'application/json' },
    }),
  getUserItems: async params =>
    ApiClient.post(`/quests/quest/filter/user/`, params, {
      headers: { 'Content-Type': 'application/json' },
    }),
  getUserFavoritesItems: async page =>
    ApiClient.get(`/quests/quest/favorites/${page}/`, {
      headers: { 'Content-Type': 'application/json' },
    }),
  getTopics: async () => ApiClient.get('/quests/topic/'),
};
