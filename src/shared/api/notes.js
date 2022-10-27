import { ApiClient } from '.';

export const notesAPI = {
  getNotes: async () => ApiClient.get(`/accounts/notepad/all/`),
  getNotesWithFilter: async params => ApiClient.get(`/accounts/notepad/user/filter/`, { params }),
  deleteNote: async id => ApiClient.delete(`/accounts/notepad/user/delete/${id}/`),
  createNote: async data =>
    ApiClient.post(`/accounts/notepad/user/new/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  updateNote: async (data, id) =>
    ApiClient.patch(`/accounts/notepad/user/edit/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
};

