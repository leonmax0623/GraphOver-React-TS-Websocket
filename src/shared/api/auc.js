import { ApiClient } from '.';

export const aucAPI = {
  getAucList: async params => ApiClient.get(`/lk_author/auction/lots/all/`, { params }),
  getItemById: async id => ApiClient.get(`/auction/lot/${id}/`),
  getBetHistoryById: async id => ApiClient.get(`/auction/lot/${id}/bet_history/`),
  closeLot: async id => ApiClient.post(`/lk_author/auction/${id}/ban/`, { ban_info: 'ban' }),
  createNewLot: async body => ApiClient.post(`/auction/new_lot/`, body),
  sendLotRedempt: async lot_id => ApiClient.post(`/auction/buy_lot/${lot_id}/`),
  getTerms: async () => ApiClient.get(`/auction/terms/`),
  sendLotBit: async (lot_id, body) => ApiClient.post(`/auction/do_bet/${lot_id}/`, body),
  betLot: async (lot_id, body) => ApiClient.post(`/auction/sell/${lot_id}/`, body),
};
