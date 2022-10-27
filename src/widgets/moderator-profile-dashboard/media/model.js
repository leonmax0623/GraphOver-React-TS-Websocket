import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { moderatorAPI } from 'shared/api/moderator';

export const useMedia = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [media, setMedia] = useState([]);

  const getMedia = async () => {
    try {
      const { data } = await moderatorAPI.getMedia();
      setMedia(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModerate = async (id, vote, callback) => {
    try {
      const { data } = await moderatorAPI.setMediaVote(id, { media_id: id, vote, reason_for_rejection: vote });

      getMedia();
      enqueueSnackbar(data?.success, {
        variant: 'success',
        preventDuplicate: true,
      });
      callback && callback();
    } catch (err) {
      if (err.response) {
        enqueueSnackbar(err.response?.data?.error, {
          variant: 'error',
          preventDuplicate: true,
        });
      } else
        enqueueSnackbar('Ошибка!', {
          variant: 'error',
          preventDuplicate: true,
        });
    }
  };

  return {
    media,
    getMedia,
    handleModerate,
  };
};
