import { ApiClient } from '.';

export const scenarioAPI = {
  getStatisticAuthors: async (quest_id, days_count) =>
    ApiClient.get(`/statistic/quest/${quest_id}/authors_count/${days_count}/`),
  getStatisticText: async (quest_id, days_count) =>
    ApiClient.get(`/statistic/quest/${quest_id}/text_volume/${days_count}/`),
  getStatisticTasks: async quest_id => ApiClient.get(`/statistic/quest/${quest_id}/authors_tasks_stat/`),
};
