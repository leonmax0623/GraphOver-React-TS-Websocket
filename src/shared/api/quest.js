import { ApiClient } from '.';

export const questAPI = {
  getItem: async id => ApiClient.get(`/quests/quest/info/${id}/`),
  getItemStatus: async id => ApiClient.get(`/quests/quest/info/${id}/status/`),
  getStructure: async id => ApiClient.get(`/quests/quest/info/structure/${id}/`),
  getComments: async (id, page) => ApiClient.get(`/quests/quest/info/comments/${id}/${page}/`),
  addComment: async data => ApiClient.post(`/quests/quest/info/comments/add/`, data),
  saveAsPlayer: async data => ApiClient.post(`/quests/quest/join/player/`, data),
  saveAsAuthor: async data => ApiClient.post(`/quests/quest/join/author/`, data),
  joinAuthorConfirm: async (quest_id, member_id, data) =>
    ApiClient.post(`/quests/quest/${quest_id}/join/author/confirm/${member_id}/`, data),
  joinAuthorProject: async data => ApiClient.post(`/quests/quest/project/join/author/`, data),
  closeQuestOffer: async quest_id => ApiClient.post(`/quests/quest/${quest_id}/close/offer/`),
  closeQuestVote: async (quest_id, data) => ApiClient.post(`/quests/quest/${quest_id}/close/offer/vote/`, data),
  getGrafsForBook: async quest_id => ApiClient.get(`/quests/quest/${quest_id}/info/graphs/view/`),
  getGrafsForBookPdf: async quest_id => ApiClient.get(`/quests/quest/${quest_id}/info/graphs/view/pdf/`),
  // chapter ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addChapterVote: async (quest_id, chapter_id, data) =>
    ApiClient.post(`/quests/quest/chapter/${quest_id}/${chapter_id}/vote/`, data),
  addChapter: async (quest_id, data) => ApiClient.post(`/quests/quest/chapter/${quest_id}/`, data),
  getChapter: async (quest_id, chapter_id) => ApiClient.get(`/quests/quest/chapter/${quest_id}/${chapter_id}/`),
  changeChapter: async (quest_id, chapter_id, data) =>
    ApiClient.patch(`/quests/quest/chapter/${quest_id}/${chapter_id}/`, data),

  // changeChapterStatus: async data => ApiClient.post(`/quests/quest/join/author/`, data),
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addItem: async data =>
    ApiClient.post(`/quests/quest/add/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  resumeQuest: async quest_id => ApiClient.post(`/quests/quest/${quest_id}/resume/offer/`),
  voteResumeQuest: async (quest_id, data) => ApiClient.post(`/quests/quest/${quest_id}/resume/offer/vote/`, data),
  voteRatingQuest: async (quest_id, data) => ApiClient.post(`/quests/quest/${quest_id}/rate/rating/`, data),
  getMedia: async quest_id => ApiClient.get(`/quests/quest/${quest_id}/media/`),
  appendMedia: async (quest_id, chapter_id, data) =>
    ApiClient.post(`/quests/quest/${quest_id}/chapter/${chapter_id}/images/`, data),
  parallelGraph: async (quest_id, data) => ApiClient.post(`/quests/quest/${quest_id}/create_new_quest_line/`, data),
  inviteAuthor: async data => ApiClient.post(`/quests/quest/project/join/author/`, data),
};
