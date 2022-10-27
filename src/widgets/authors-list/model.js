import { questAPI } from 'shared/api/quest';
import { useAxiosErrorNotificate } from 'shared/hooks/axios-error-notificate';

export const useInviteAuthor = (quest_id, updateState) => {
  const { notificateAxiosError } = useAxiosErrorNotificate();

  const inviteAuthor = async user_id => {
    try {
      const { data } = questAPI.inviteAuthor({ quest_id, user_id });
      updateState();
    } catch (err) {
      notificateAxiosError(err);
    }
  };
  return { inviteAuthor };
};
