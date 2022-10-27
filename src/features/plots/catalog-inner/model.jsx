import { questActions } from 'app/store/quest-slice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { questAPI } from 'shared/api/quest';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { Add_COMMENT_TO_QUEST_ERR, JOIN_TO_QUEST_ERR } from './constants';

export const useQuestData = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.questReducer.questData);

  const setState = data => {
    dispatch(questActions.setQuestData(data));
  };

  const getQuestData = async id => {
    try {
      const { data } = await questAPI.getItem(id);
      setState(data);
    } catch (error) {
      // if (error.response) console.log(error.response.data);
    }
  };
  return { getQuestData };
};

export const useQuest = id => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.questReducer.questData);
  const { getQuestStatus } = useQuestStatus();
  const setState = data => {
    dispatch(questActions.setQuestData(data));
  };
  // const [state, setState] = useState({});
  const [structure, setStructure] = useState([]);
  const [chapterId, setChapterId] = useState(0);
  const [branch, setBranch] = useState(1);
  const [currentChapter, setCurrentChapter] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const getQuestData = async () => {
    try {
      const { data } = await questAPI.getItem(id);
      setState(data);
    } catch (error) {
      // if (error.response) console.log(error.response.data);
    }
  };

  const getQuestStructure = async () => {
    try {
      const { data } = await questAPI.getStructure(id);
      setStructure(data);
      for (let it of data) {
        if (it.winner_graph) {
          setChapterId(it.winner_graph.id);
        }
      }
    } catch (error) {
      if (error.response) {
      }
      // console.log(error.response);
    }
  };

  const getChapter = async () => {
    try {
      const { data } = await questAPI.getChapter(id, chapterId);
      setCurrentChapter(data);
    } catch (error) {
      // if (error.response) console.log(error.response.data);
    }
  };

  const joinToQuestAsPlayer = async () => {
    if (state.id)
      try {
        const {} = await questAPI.saveAsPlayer({ quest_id: state.id });
        getQuestData();
      } catch (err) {
        enqueueSnackbar(JOIN_TO_QUEST_ERR, { variant: 'error', preventDuplicate: true });
      }
  };

  const joinToQuestAsAuthor = async () => {
    if (state.id)
      try {
        const {} = await questAPI.saveAsAuthor({ quest_id: state.id });
        getQuestData();
      } catch (err) {
        enqueueSnackbar(JOIN_TO_QUEST_ERR, { variant: 'error', preventDuplicate: true });
      }
  };

  const resumeQuest = async () => {
    try {
      await questAPI.resumeQuest(id);
      getQuestStatus(id);
      // setOpen(false);
      // getQuestData();
    } catch (err) {
      console.log(err);
    }
  };

  const changeItem = (_field, _value, _id) => {
    let _tmp_item = { ...state };
    _tmp_item[_field] = _value;

    setState(_tmp_item);
  };

  useEffect(() => {
    getQuestData();
    getQuestStructure();
  }, []);

  useEffect(() => {
    if (chapterId) getChapter();
  }, [chapterId]);

  return {
    getQuestData,
    state,
    structure,
    currentChapter,
    changeItem,
    setChapterId,
    chapterId,
    joinToQuestAsPlayer,
    joinToQuestAsAuthor,
    resumeQuest,
    branch,
    setBranch,
  };
};

export const useComments = id => {
  const { notificateAxiosError } = useAxiosErrorNotificate();
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsPageTotal, setCommentsPageTotal] = useState(1);

  const [newComment, setNewComment] = useState('');

  const isNextCommentsPage = commentsPageTotal > commentsPage;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fetchNewComment = async e => {
    e.preventDefault();
    try {
      const { data } = await questAPI.addComment({
        quest: id,
        text: newComment,
      });
      setNewComment('');
      getComments();
    } catch (err) {
      console.log(err);
      notificateAxiosError(err);
      // enqueueSnackbar(Add_COMMENT_TO_QUEST_ERR, {
      //   variant: 'error',
      // });
    }
  };

  const onNextPageComments = () => {
    setCommentsPage(commentsPage => commentsPage + 1);
  };

  const getComments = async () => {
    try {
      const { data } = await questAPI.getComments(id, commentsPage);
      setComments(data.data);
      setCommentsPageTotal(data.num_pages);
    } catch (error) {
      if (error.response) console.log(error.response.data);
    }
  };

  useEffect(() => {
    getComments();
  }, [commentsPage]);

  return {
    fetchNewComment,
    comments,
    onNextPageComments,
    isNextCommentsPage,
    newComment,
    setNewComment,
  };
};

export const useQuestStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const setQuestStatus = (quest_id, new_status) => {
    dispatch(questActions.setQuestStatus({ id: quest_id, data: new_status }));
  };
  const setQuestVoteStatus = (quest_id, new_status) => {
    dispatch(questActions.setQuestVoteStatus({ id: quest_id, data: new_status }));
  };
  const setQuestVoited = (quest_id, new_status) => {
    dispatch(questActions.setQuestVoited({ id: quest_id, data: new_status }));
  };

  const getQuestStatus = async quest_id => {
    try {
      const { data } = await questAPI.getItemStatus(quest_id);
      setQuestStatus(quest_id, data.status);
      setQuestVoteStatus(quest_id, data.vote_status);
      setQuestVoited(quest_id, data.voited);
      if (data.status === 'C' || data.status === 'D') {
        navigate(`/quests/quest/${quest_id}`);
        enqueueSnackbar('Сюжет завершен!', {
          variant: 'error',
          preventDuplicate: true,
          autoHideDuration: 10000,
        });
      }
      return { isCloseStatus: data.status === 'C' || data.status === 'D', status: data.status };
    } catch (err) {}
  };
  return { getQuestStatus, setQuestStatus };
};

// export const useChapter = quest_id => {
//   const createGraphvariant = async graph_id => {
//     try {
//       const {} = await questAPI.addChapter(quest_id, { graf: graph_id });
//       getQuestStructure();
//     } catch (err) {
//       if (err.response && err.response.data) {
//         enqueueSnackbar(err.response.data.error, {
//           variant: 'error',
//           preventDuplicate: true,
//         });
//       } else {
//         enqueueSnackbar('Не удалось выполнить действие. Обратитесь в поддержку или попробуйте позже.', {
//           variant: 'error',
//           preventDuplicate: true,
//         });
//       }
//     }
//   };

//   return {};
// };
