import { useState } from 'react';
import { scenarioAPI } from 'shared/api/scenario';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useScenarioStatistic = quest_id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const [tesk_s, settask_s] = useState({});
  const [authors_s, setauthors_s] = useState({
    'прирост авторов за 7 дня': 0,
    'убыток авторов за 7 дня': 0,
  });
  const [text_s, settext_s] = useState({
    'Объем написанного текста за 7 дня': 0,
  });

  const getStatisticAuthors = async days => {
    try {
      const { data } = await scenarioAPI.getStatisticAuthors(quest_id, days);
      setauthors_s(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  const getStatisticText = async days => {
    try {
      const { data } = await scenarioAPI.getStatisticText(quest_id, days);
      settext_s(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  const getStatisticTasks = async () => {
    try {
      const { data } = await scenarioAPI.getStatisticTasks(quest_id);
      settask_s(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { authors_s, text_s, tesk_s, getStatisticAuthors, getStatisticText, getStatisticTasks };
};

export const useUsersStat = quest_id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [tesk_s, settask_s] = useState({});

  const getStatisticTasks = async () => {
    try {
      const { data } = await scenarioAPI.getStatisticTasks(quest_id);
      settask_s(data);
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { tesk_s, getStatisticTasks };
};
