import { useDispatch, useSelector } from 'react-redux';
import { complaintsAPI } from 'shared/api/complaints';
import { questAPI } from 'shared/api/quest';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useApproveJoin = (quest_id, updateState) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.user.pk);
  // const userFriends = useSelector(state => state.userReducer.user.pk);

  const { notificateAxiosError } = useAxiosErrorNotificate();

  const approveAuthor = async (author_id, voteType) => {
    try {
      const { data } = await questAPI.joinAuthorConfirm(quest_id, author_id, {
        vote: voteType,
        reason_for_rejection: voteType,
      });

      updateState && updateState();
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { approveAuthor };
};

export const useComplaints = quest_id => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.user.pk);
  // const userFriends = useSelector(state => state.userReducer.user.pk);

  const { notificateAxiosError } = useAxiosErrorNotificate();

  const addComplaint = async (authorId, text) => {
    try {
      const { data } = await complaintsAPI.addComplaint(quest_id, { cause: 1, defendant: authorId, text: text });
    } catch (err) {
      notificateAxiosError(err);
    }
  };

  return { addComplaint };
};
