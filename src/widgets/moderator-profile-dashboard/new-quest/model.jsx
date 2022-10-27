import { useEffect, useState } from 'react';
import { moderatorAPI } from 'shared/api/moderator';

export const useNewQuests = () => {
  const [quests, setquests] = useState([]);

  const getQuests = async () => {
    try {
      const { data } = await moderatorAPI.getQuests();
      setquests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuests();
  }, []);

  return {
    getQuests,
    quests,
  };
};
