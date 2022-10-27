// import { useTasks } from 'components/ActualTasks/model';
// import { useTeamMembers } from 'components/Chat/hooks';

// import { useQuestData } from 'pages/StoryPage/model';
// import { useQuestStatus } from 'pages/StoryPageSigned/model';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { notificateWebsocket } from 'shared/ws/notificate';
// import { useMedia } from 'widget/moderator-block/media/model';
import { useNotifications } from './notification';

export const useActions = () => {
  // const { getTasks, getAnswers } = useTasks();
  // const { getAuthors, getPlayers } = useTeamMembers();
  // const { getQuestData } = useQuestData();
  // const { getQuestStatus } = useQuestStatus();
  // const { getMedia } = useMedia();
  const navigate = useNavigate();
  const userId = useSelector(state => state.userReducer.user.pk);

  const actionSwitch = message => {
    const { action_type } = message;
    switch (action_type) {
      case 'new_task':
        // getTasks(message.quest_id);
        return;
      case 'new_answer_task':
        // getTasks(message.quest_id);
        return;
      case 'new_author_team':
        // getAuthors(message.quest_id);
        // getQuestData(message.quest_id);
        return;
      case 'new_user_team':
        // getPlayers(message.quest_id, message.team_id);
        return;
      case 'vote_author_team':
        // getAuthors(message.quest_id);
        // getQuestData(message.quest_id);
        return;
      case 'vote_user_team':
        // getPlayers(message.quest_id, message.team_id);
        return;
      case 'delete_author_team':
        // if (userId === message?.user_id) {
        //   navigate(`/quests/quest/${message.quest_id}`);
        // }
        // getAuthors(message.quest_id);
        return;
      case 'delete_user_team':
        // getPlayers(message.quest_id, message.team_id);
        return;
      case 'quest_moderation':
        console.log('quest_moderation');
        return;
      // В сюжете завершено голосование за Граф
      case 'chapter_winner':
        console.log('chapter_winner');
        return;
      // Спрорная ситуация при голосовании за графы
      case 'graf_dispute':
        console.log('graf_dispute');
        return;
      case 'answer_winner':
        console.log('answer_winner');
        return;
      case 'task_dispute':
        console.log('task_dispute');
        return;
      // В сюжете для графа появился новый медиа файл
      case 'moderation_media_graf':
        console.log('moderation_media_graf');
        // getMedia();
        return;
      case 'confirmed_media_file':
        console.log('confirmed_media_file');
        return;
      case 'rejected_media_file':
        console.log('rejected_media_file');
        return;
      // Поступило предложение на закрытие сюжета
      case 'offer_close_quest':
        console.log('offer_close_quest');
        // getQuestStatus(message.quest_id);
        return;
      // Поступило предложение на возобновление сюжета
      case 'offer_resume_quest':
        console.log('offer_resume_quest');
        // getQuestStatus(message.quest_id);
        return;
      default:
        return '';
    }
  };

  return { actionSwitch };
};

export const useUpdate = user_id => {
  const dispatch = useDispatch();
  const notList = useSelector(state => state.notificateReducer.notificationList);
  const notLenght = useSelector(state => state.notificateReducer.newNotificationCount);
  const { getNotificationsStatus } = useNotifications();
  const { actionSwitch } = useActions();
  const nSocket = useRef(null);

  useEffect(() => {
    if (!user_id) return;
    nSocket.current = notificateWebsocket(user_id);

    getMessage();
    getNotificationsStatus();
  }, [user_id]);

  useEffect(() => {}, [nSocket]);

  const getMessage = useCallback(() => {
    if (!user_id) return;
    nSocket.current.onmessage = e => {
      const message = JSON.parse(e.data);
      actionSwitch(message);
      getNotificationsStatus();
    };
  }, [user_id]);

  return { notList, notLenght };
};

export * from './notification';
