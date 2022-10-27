export const createNotTitle = not_type => {
  switch (not_type) {
    case 'new_task':
      return 'У вас появилась новая задача';
    case 'new_answer_task':
      return 'У вас появились новые ответы';
    case 'new_author_team':
      return 'Присоединился новый автор';
    case 'new_user_team':
      return 'Присоединился новый игрок';
    case 'vote_author_team':
      return 'Голосование';
    case 'vote_user_team':
      return 'Голосование';
    case 'delete_author_team':
      return 'Удален автор';
    case 'delete_user_team':
      return 'Удален игрок';
    case 'quest_moderation':
      return 'Изменение статуса сюжета';
    case 'chapter_winner':
      return 'Изменение статуса графа';
    default:
      return 'Уведомление';
  }
};
