import { ApiClient } from '.';

export const userAPI = {
  getUsers: async () => ApiClient.get(`/accounts/users/`),
  getUserData: async () => ApiClient.get(`/accounts/user/`),
  getOtherUserData: async id => ApiClient.get(`/accounts/user/${id}/`),
  getSocials: async () => ApiClient.get(`/accounts/social/`),
  getUserSocials: async () => ApiClient.get(`/accounts/user/social/`),
  getFriends: async () => ApiClient.get(`/accounts/user/friends/all/`),
  getFriendsById: async id => ApiClient.get(`/accounts/user/${id}/friends/`),
  addFriend: async data => ApiClient.post(`/accounts/user/friends/add/`, data),
  deleteFriend: async data => ApiClient.delete(`/accounts/user/friends/delete/`, { data: data }),
  patchUserData: async data => ApiClient.patch(`/accounts/user/`, data),
  postUserData: async data => ApiClient.post(`/accounts/user/`, data),
  putUserData: async data =>
    ApiClient.put(`/accounts/user/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  addSocialLink: async data => ApiClient.post(`/accounts/user/social/`, data),
  changeSocialLink: async (id, data) => ApiClient.patch(`/accounts/user/social/${id}/`, data),
  removeSocial: async id => ApiClient.delete(`accounts/user/social/${id}/`),
  addFavorite: async data => ApiClient.post(`/quests/quest/favorites/add/`, data),
  removeFavorite: async data => ApiClient.delete(`/quests/quest/favorites/delete/`, { data: data }),
  postUserAvatar: async formData =>
    ApiClient.post(`/accounts/user/avatar/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  verifyAccount: async formData =>
    ApiClient.post(`/lk_author/verify_account/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};
