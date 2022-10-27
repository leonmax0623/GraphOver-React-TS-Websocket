import { questActions } from 'app/store/quest-slice';

import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { questAPI } from 'shared/api/quest';

import { Add_COMMENT_TO_QUEST_ERR, JOIN_TO_QUEST_ERR } from './constants';

export const useQuest = (id, getQuestStatus) => {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const [structure, setStructure] = useState([]);
  const [chapterId, setChapterId] = useState(0);
  const [currentChapter, setCurrentChapter] = useState({});
  const userId = useSelector(state => state.userReducer.user.pk);
  const { enqueueSnackbar } = useSnackbar();

  const getQuestData = async () => {
    try {
      // const { isCloseStatus } = await getQuestStatus();
      // if (isCloseStatus) {
      //   return;
      // }
      const { data } = await questAPI.getItem(id);
      setState(data);
    } catch (error) {
      if (error.response) console.log(error.response.data);
    }
  };

  const getQuestStructure = async () => {
    try {
      const { isCloseStatus } = await getQuestStatus(id);
      if (isCloseStatus) return;

      const { data } = await questAPI.getStructure(id);
      setStructure(data);
      let fl = true;
      if (chapterId === 0)
        for (let i of data) {
          if (i.chapters_list && fl) {
            for (let cp of i.chapters_list) {
              if (cp.user.id === userId) {
                setChapterId(cp.id);
                fl = false;
              }
            }
          }
        }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  const getChapter = async (id, chapterId) => {
    try {
      const { isCloseStatus } = await getQuestStatus(id);
      if (isCloseStatus) return;

      const { data } = await questAPI.getChapter(id, chapterId);
      setCurrentChapter(data);
    } catch (error) {
      if (error.response) console.log(error.response.data);
    }
  };

  // useEffect(() => {
  //   let timerId = setInterval(function () {
  //     if (currentChapter && currentChapter.id) {
  //       if (currentChapter?.role === 'C') return;
  //       getChapter(id, currentChapter.id);
  //       getQuestStructure();
  //     }
  //   }, 5000);
  //   return () => clearInterval(timerId);
  // }, [currentChapter]);

  const joinToQuestAsPlayer = async () => {
    if (state.name)
      try {
        const { isCloseStatus } = await getQuestStatus(id);
        if (isCloseStatus) return;

        const {} = await questAPI.saveAsPlayer({ quest_id: state.id });
        getQuestData();
      } catch (err) {
        enqueueSnackbar(JOIN_TO_QUEST_ERR, { variant: 'error', preventDuplicate: true });
      }
  };

  const joinToQuestAsAuthor = async () => {
    if (state.name)
      try {
        const { isCloseStatus } = await getQuestStatus(id);
        if (isCloseStatus) return;

        const {} = await questAPI.saveAsAuthor({ quest_id: state.id });
        getQuestData();
      } catch (err) {
        enqueueSnackbar(JOIN_TO_QUEST_ERR, { variant: 'error', preventDuplicate: true });
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

  const fetchAnswer = async (id, act) => {
    console.log(id, act);
  };

  useEffect(() => {
    if (chapterId) getChapter(id, chapterId);
  }, [chapterId]);

  return {
    state,
    structure,
    currentChapter,
    changeItem,
    setChapterId,
    chapterId,
    joinToQuestAsPlayer,
    joinToQuestAsAuthor,
    fetchAnswer,
    getQuestStructure,
    getChapter,
    getQuestData,
  };
};

export const useComments = id => {
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
      enqueueSnackbar(Add_COMMENT_TO_QUEST_ERR, {
        variant: 'error',
      });
    }
  };

  const onNextPageComments = () => {
    setCommentsPage(commentsPage => commentsPage + 1);
  };

  const getComments = async () => {
    try {
      const { data } = await questAPI.getComments(id, commentsPage);
      setComments(data.content);
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

export const useRate = (quest_id, getQuestData) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRateChange = async val => {
    try {
      await questAPI.voteRatingQuest(quest_id, { rating: val });
      getQuestData();
      enqueueSnackbar('Ваш голос учтен!', {
        variant: 'success',
        autoHideDuration: 6000,
      });
      // handleCloseRateVote();
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message ===
          'UNIQUE constraint failed: quests_questrating.quest_id, quests_questrating.user_id'
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
  return { handleRateChange };
};
