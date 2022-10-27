import { ApiClient } from '.';

export const filesAPI = {
  getItems: async () => ApiClient.get(`/auction/available_files/all/`),
};
