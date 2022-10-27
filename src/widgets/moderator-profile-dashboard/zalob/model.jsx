import { useEffect, useState } from 'react';
import { moderatorAPI } from 'shared/api/moderator';

export const useZaloba = () => {
  const [items, setItems] = useState([]);

  const getQuests = async () => {
    try {
      const { data } = await moderatorAPI.getQuests();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuests();
  }, []);

  return {
    getQuests,
  };
};
