import { ApiClient } from '.';

export const adminPanelApi = {
  getSettings: async () => ApiClient.get('lk_administrator/settings/service/'),
  setSettings: async settings => {
    await ApiClient.put(
      `/lk_administrator/settings/service/time_active_answer/${settings['Длительность ответа'].pk}/`,
      {
        active_date: settings['Длительность ответа'].active_date,
      },
    );
    await ApiClient.put(
      `/lk_administrator/settings/service/time_active_graph/${settings['Длительность активности сюжета'].pk}/`,
      {
        active_date: settings['Длительность активности сюжета'].active_date,
      },
    );
    await ApiClient.put(
      `/lk_administrator/settings/service/time_vote_graph/${settings['Длительность голосования за граф'].pk}/`,
      {
        active_date: settings['Длительность голосования за граф'].active_date,
      },
    );
    await ApiClient.put(
      `/lk_administrator/settings/service/time_wait_author/${settings['Длительность ожидания авторства'].pk}/`,
      {
        active_date: settings['Длительность ожидания авторства'].active_date,
      },
    );
    await ApiClient.put(
      `/lk_administrator/settings/service/time_write_graph/${settings['Длительность написания графа'].pk}/`,
      {
        active_date: settings['Длительность написания графа'].active_date,
      },
    );
    await ApiClient.put(
      `/lk_administrator/settings/moderator/rating_for_moderator/${settings['Рейтинг до статуса Модератор'].pk}/`,
      {
        moderator_rating: settings['Рейтинг до статуса Модератор'].moderator_rating,
      },
    );
  },
  getModeratorRewards: async () => ApiClient.get('/lk_administrator/settings/moderator/rewards/'),
  getAuthorRewards: async () => ApiClient.get('/lk_administrator/settings/author/rewards/'),
  setAuthorRewards: async rewards =>
    ApiClient.put(`/lk_administrator/settings/author/rewards_rating/${rewards.pk}/`, rewards),
  setModeratorRewards: async rewards =>
    ApiClient.put(`/lk_administrator/settings/moderator/rewards_rating/${rewards.pk}/`, rewards),
  getComplaintsAndSuggestions: async (page = 1, category = '') => {
    if (category === 'suggestions') {
      return ApiClient.post(`/lk_administrator/suggestions/?page=${page}`);
    } else if (category === 'complaints') {
      return ApiClient.post(`/lk_administrator/complaints/?page=${page}`);
    } else {
      return ApiClient.post(`/lk_administrator/complaints_suggestions/?page=${page}`);
    }
  },
  getUsers: async () => ApiClient.post('/lk_administrator/administrate/users/?page=1'),
  banUser: async userId =>
    ApiClient.post(`/lk_administrator/administrate/users/${userId}/ban/`, {
      ban_info: 'Some ban information.',
    }),
  unbanUser: async userId => ApiClient.post(`/lk_administrator/administrate/users/${userId}/unban/`),
  getVerifyRequest: async userId => ApiClient.get(`/lk_administrator/administrate/users/${userId}/verify/info/`), // {"verify_info":{"user":46,"passport":"/media/images/accounts_verification/Oleg/file/2022/08/16/1.png","created_at":"2022-08-16T11:54:38.684029+03:00"}}
  sendVerifyResponse: async (userId, response = false) =>
    ApiClient.post(`/lk_administrator/administrate/users/${userId}/verify/`, {
      admin_answer: response,
    }),
  getServiceInformation: async () => {
    const { data: all } = await ApiClient.get('/lk_administrator/currency/all/sum/');
    const { data: accrued } = await ApiClient.get('/lk_administrator/currency/accrued/sum/');
    const { data: withdrawned } = await ApiClient.get('/lk_administrator/currency/withdrawn/sum/');

    return {
      all: all.all_funds_sum,
      accrued: accrued.accrued_funds_sum,
      withdrawned: withdrawned.withdrawn_funds_sum,
    };
  },
  getServiceStatistics: async () => {
    const { data } = await ApiClient.get('/lk_administrator/tarifs/statistic/');
    return { data };
  },
  getSliderData: async () => {
    const { data } = await ApiClient.get('/lk_administrator/slider/all/');
    return { data };
  },
  addSlide: async body => {
    const { data } = await ApiClient.post('/lk_administrator/slider/new/', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data };
  },
  removeSlide: async body => {
    const { data } = await ApiClient.delete('/lk_administrator/slider/del/', { data: body });
    return { data };
  },
  getCurrency: async (page, data) => await ApiClient.post(`/lk_administrator/currency/all/filter/?page=${page}`, data),
  getCurrencyChart: async () => await ApiClient.post('/lk_administrator/currency/all/filter/grafic/'),
  removeOrder: async (order_id, data) =>
    await ApiClient.post(`/lk_administrator/administrate/order/${order_id}/ban/`, data),
};
