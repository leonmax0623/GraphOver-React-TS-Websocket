import { ApiClient } from '.';

export const authAPI = {
  login: async data => ApiClient.post(`/accounts/login/`, data),
  logout: async () => ApiClient.post(`/accounts/logout/`),
  registration: async data =>
    ApiClient.post(`/accounts/registration/`, {
      email: data.email,
      password1: data.password1,
      password2: data.password2,
      username: data.username,
      fio: data.fio,
      role: data.role,
    }),
  changePass: async data => ApiClient.post(`/accounts/password/change/`, data),
  attachDocs: async data => ApiClient.post(`/service/email/attache/send/`, data),
  resetPassEmail: async data => ApiClient.post(`/accounts/password/reset/`, data),
  resetPassConfirm: async data => ApiClient.post(`/accounts/password/reset/confirm/`, data),
  resetPassConfirmN: async (uidb64, token, data) =>
    ApiClient.post(`/accounts/rest-auth/password/reset/confirm/${uidb64}/${token}/`, data),
  refresh: async refresh_token => ApiClient.post(`/accounts/token/refresh/`, { refresh: refresh_token }),
};
