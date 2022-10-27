import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { moderatorAPI } from 'shared/api/moderator';

export const useCasesGrafs = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [grafs, setGrafs] = useState({});

  const getGrafs = async () => {
    try {
      const { data } = await moderatorAPI.getGrafs();
      setGrafs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGrafs();
  }, []);

  const handleModerate = async (graf_id, chapter_id, vote) => {
    try {
      const { data } = await moderatorAPI.setGrafVote(graf_id, chapter_id, vote);

      getGrafs();
      enqueueSnackbar(data?.success, {
        variant: 'success',
        preventDuplicate: true,
      });
    } catch (err) {
      console.log(err);
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
    grafs,
    handleModerate,
  };
};

export const useCasesAnswers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [answers, setAnswers] = useState({});

  const getAnswers = async () => {
    try {
      const { data } = await moderatorAPI.getAnswers();
      setAnswers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnswers();
  }, []);

  const handleModerate = async (task_id, answer_id, vote) => {
    try {
      const { data } = await moderatorAPI.setAnswerVote(task_id, answer_id, vote);

      getAnswers();
      enqueueSnackbar(data?.success, {
        variant: 'success',
        preventDuplicate: true,
      });
    } catch (err) {
      console.log(err);
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
    answers,
    handleModerate,
  };
};
