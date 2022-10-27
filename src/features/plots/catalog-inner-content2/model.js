import { questActions } from 'app/store/quest-slice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questAPI } from 'shared/api/quest';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';
import { useQuestStatus } from '../catalog-inner2/model';
import { JOIN_TO_QUEST_ERR } from './constants';

export const useMediaLib = (quest_id, files, structure) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const [allMedia, setAllMedia] = useState([]);

  const [media, setMedia] = useState([]);
  const [activeBtn, setActiveBtn] = useState(true);
  const [activeTab, setActiveTab] = useState('image');

  const { enqueueSnackbar } = useSnackbar();

  const getMedia = async () => {
    try {
      const { data } = await questAPI.getMedia(quest_id);
      setAllMedia(data.data);
      setMedia(data.data.filter(i => i.media_type === activeTab && i.moderation !== 'M'));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttach = async graph_id => {
    // if (!files.lenght) return;
    const form = new FormData();
    form.append('media', files);
    setActiveBtn(false);
    try {
      const { data } = await questAPI.appendMedia(quest_id, graph_id, form);
      getMedia();
      // setActiveTab('image');
      // resetState();
      setActiveBtn(true);
      enqueueSnackbar('Файл отправлен на модерацию.', {
        variant: 'success',
        preventDuplicate: true,
      });
    } catch (error) {
      console.log(error);
      setActiveBtn(true);
      if (error.response) {
        try {
          if (error.response.status === 413)
            enqueueSnackbar('Размер загружаемого изображения больше допустимого!', {
              variant: 'error',
              preventDuplicate: true,
            });
          else {
            enqueueSnackbar('Что-то пошло не так. Попробуйте позже.', {
              variant: 'error',
              preventDuplicate: true,
            });
          }
        } catch (err) {
          enqueueSnackbar('Что-то пошло не так. Попробуйте позже.', {
            variant: 'error',
            preventDuplicate: true,
          });
        }
      } else {
        enqueueSnackbar('Что-то пошло не так. Попробуйте позже.', {
          variant: 'error',
          preventDuplicate: true,
        });
      }
    }
  };

  const resetMedia = () => {
    setMedia(allMedia);
  };

  useEffect(() => {
    if (structure?.length && files) handleAttach(structure[0].id);
  }, [files]);

  useEffect(() => {
    if (activeTab === 'append') {
    } else {
      setMedia(allMedia.filter(i => i.media_type === activeTab && i.moderation !== 'M'));
    }
  }, [activeTab]);

  return {
    activeTab,
    activeBtn,
    setActiveTab,
    getMedia,
    media,
    resetMedia,
    handleAttach,
    isOpen,
    setIsOpen,
    current,
    setCurrent,
  };
};

export const useQuest = id => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.questReducer.questData);
  const userId = useSelector(state => state.userReducer.user.pk);
  const { getQuestStatus } = useQuestStatus();
  const setState = data => {
    dispatch(questActions.setQuestData(data));
  };
  // const [state, setState] = useState({});
  const [structure, setStructure] = useState([]);
  const [chapterId, setChapterId] = useState(0);
  const [currentBranch, setCurrentBranch] = useState(1);

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

  const getQuestStructure = async (updateStructure = true) => {
    try {
      const { data } = await questAPI.getStructure(id);
      setStructure(data);
      let fl = true;
      // for (let it of data) {
      //   if (it.winner_graph) {
      //     setChapterId(it.winner_graph.id);
      //   }
      // }
      if (chapterId === 0) {
        for (let i of data) {
          if (i.chapters_list && fl) {
            for (let cp of i.chapters_list) {
              if (cp.user.id === userId) {
                setChapterId(cp.id);

                setCurrentBranch(i.branch);

                fl = false;
              }
            }
          }
          //  else if (i.winner_graph) {
          //   setChapterId(it.winner_graph.id);
          // }
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
    if (userId) {
      getQuestData();
      getQuestStructure();
    }
  }, [userId]);

  useEffect(() => {
    if (chapterId) getChapter();
  }, [chapterId]);

  return {
    getQuestData,
    getQuestStructure,
    getChapter,
    state,
    structure,
    currentChapter,
    changeItem,
    setChapterId,
    chapterId,
    joinToQuestAsPlayer,
    joinToQuestAsAuthor,
    resumeQuest,
    currentBranch,
    setCurrentBranch,
  };
};

export const useCreateChapter = (quest_id, getQuestStructure) => {
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const createGraphvariant = async graph_id => {
    if (!graph_id) return;
    try {
      const {} = await questAPI.addChapter(quest_id, { graph: graph_id, title: '', text: '' });
      getQuestStructure();
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { createGraphvariant };
};

export const useParallel = (quest_id, getQuestStructure) => {
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const parallelGraph = async body => {
    try {
      const {} = await questAPI.parallelGraph(quest_id, body);
      getQuestStructure();
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { parallelGraph };
};

export const useStartChapterVote = (quest_id, getQuestStructure, getChapter) => {
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const handleStartVote = async currentChapter_id => {
    try {
      await questAPI.changeChapter(quest_id, currentChapter_id, { role: 'W' });
      getChapter(quest_id, currentChapter_id);
      getQuestStructure();
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { handleStartVote };
};

export const useChangeChapter = (quest_id, getChapter, getQuestStructure) => {
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async (currentChapter_id, data) => {
    try {
      const {} = await questAPI.changeChapter(quest_id, currentChapter_id, data);
      getChapter(quest_id, currentChapter_id);
      getQuestStructure();
      getChapter(quest_id, currentChapter_id);
    } catch (err) {
      if (err.response && err.response.data) {
        enqueueSnackbar(err.response.data.error, {
          variant: 'error',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar('Не удалось выполнить действие. Обратитесь в поддержку или попробуйте позже.', {
          variant: 'error',
          preventDuplicate: true,
        });
      }
    }
  };

  return { fetchData };
};
export const useVoteChapter = (quest_id, getChapter, getQuestStructure) => {
  const { enqueueSnackbar } = useSnackbar();
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const handleVote = async (vote_type, currentChapter_id) => {
    try {
      await questAPI.addChapterVote(quest_id, currentChapter_id, { chose: vote_type });
      getQuestStructure();
      getChapter(quest_id, currentChapter_id);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error ===
          'UNIQUE constraint failed: quests_chaptervoit.user_id, quests_chaptervoit.chapter_id'
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
