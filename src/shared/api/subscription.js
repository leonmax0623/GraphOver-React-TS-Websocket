import { ApiClient } from '.';

export const subscriptionAPI = {
  getItems: async () => ApiClient.get(`/service/subscriptions/get/`),
  buySubscripion: async body => ApiClient.post(`/lk_author/subscription/buy/`, body),
};
