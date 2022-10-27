import { taskActions } from 'app/store/task-slice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskAPI } from 'shared/api/task';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useTasks = quest_id => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const tasks = useSelector(state => state.tasksReducer.taskList[quest_id]);

  const setTasks = data => {
    dispatch(taskActions.setTaskList({ quest_id, data }));
  };

  const getTasks = async _quest_id => {
    const q_id = _quest_id ? _quest_id : quest_id;
    try {
      const { data } = await taskAPI.getTasks(q_id);
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getAnswers = async (_quest_id, _task_id) => {
    const q_id = _quest_id ? _quest_id : quest_id;
    try {
      const { data } = await taskAPI.getAnswers(q_id, _task_id);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const handleVote = async (vote_type, aId) => {
    try {
      const {} = await taskAPI.voteAnswer(quest_id, aId, { chose: vote_type });
      getTasks();
      return getAnswers();
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error ===
          'UNIQUE constraint failed: quests_answertaskvoit.user_id, quests_answertaskvoit.task_id'
      ) {
        enqueueSnackbar('Вы уже проголосовали!', {
          variant: 'error',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar('Не удалось проголосовать. Попробуйте позже или обратитесь в поддержку', {
          variant: 'error',
          preventDuplicate: true,
        });
      }
    }
  };

  return { tasks, getAnswers, getTasks, handleVote };
};

export const useAnswerToTask = (quest_id, task_id, setIsOpen) => {
  const { getTasks } = useTasks(quest_id);
  const [err, setErr] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const addAnswer = async data => {
    try {
      const {} = await taskAPI.addAnswer(quest_id, task_id, data);
      setIsOpen(false);
      getTasks();
      enqueueSnackbar('Ответ успешно добавлен', {
        variant: 'success',
      });
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        setErr(error.response.data);
      }
    }
  };
  return { addAnswer, err };
};

export const useLikeAnswer = (quest_id, task_id, getData) => {
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const toggleFavorites = async (answ_id, vote_type) => {
    try {
      const { data } = await taskAPI.voteLikeAnswer(quest_id, task_id, answ_id, { vote: vote_type ? 'L' : 'D' });
      const text = data.success;
      enqueueSnackbar(text, {
        variant: 'success',
        preventDuplicate: true,
      });
      getData && getData();
    } catch (err) {
      notificateAxiosError(err);
      // enqueueSnackbar('Не удалось отправить сообщение', {
      //   variant: 'error',
      //   preventDuplicate: true,
      // });
      // console.log(err);
    }
  };

  return { toggleFavorites };
};

export const useVoteAnswer = (quest_id, answer_id, getData) => {
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const { getTasks } = useTasks(quest_id);

  const handleVote = async vote_type => {
    try {
      const {} = await taskAPI.voteAnswer(quest_id, answer_id, { chose: vote_type });
      getTasks();
      getData();
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error ===
          'UNIQUE constraint failed: quests_answertaskvoit.user_id, quests_answertaskvoit.task_id'
      ) {
        enqueueSnackbar('Вы уже проголосовали!', {
          variant: 'error',
          preventDuplicate: true,
        });
      } else {
        notificateAxiosError(err);
      }
    }
  };

  return { handleVote };
};

export const useAddTask = quest_id => {
  const [err, setErr] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { getTasks } = useTasks(quest_id);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async data => {
    try {
      const {} = await taskAPI.addTask(quest_id, data);
      setIsOpen(false);
      getTasks();
      enqueueSnackbar('Задача успешно добавлена', {
        variant: 'success',
      });
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        setErr(error.response.data);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  return { onSubmit, err, isOpen, setIsOpen };
};
