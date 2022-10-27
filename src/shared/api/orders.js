import { ApiClient } from '.';

export const ordersAPI = {
  getOrders: async params => ApiClient.get(`/orders/all/`, { params }),
  getOrderById: async order_id => ApiClient.get(`/orders/${order_id}/info/`),
  getUserOrders: async params => ApiClient.get(`/lk_author/orders/all/`, { params }),
  createNeworder: async body => ApiClient.post(`/orders/add/`, body),
  getrespondsById: async order_id => ApiClient.get(`/orders/${order_id}/responds/all/`),
  pushRespond: async (order_id, data) => ApiClient.post(`/orders/${order_id}/respond/`, data),
  closeOrder: async order_id => ApiClient.delete(`/orders/delete/`, { data: { order_id: order_id } }),
  selectExec: async (order_id, respond_id, data) =>
    ApiClient.post(`/orders/${order_id}/appoint_an_executor/${respond_id}/`, data),
  orderAcceptOrRejectExec: async (order_id, data) => ApiClient.post(`/orders/${order_id}/accept_or_reject/`, data),
  // performer
  getViewWork: async order_id => ApiClient.get(`orders/${order_id}/view/{work_id}/`),

  getWork: async order_id => ApiClient.get(`/orders/${order_id}/draft/`),
  saveWork: async (order_id, data) => ApiClient.patch(`/orders/${order_id}/draft/`, data),
  submitWork: async (order_id, data) => ApiClient.post(`/orders/${order_id}/submit_for_review/`, data),
  acceptWork: async (order_id, work_id, data) =>
    ApiClient.post(`/orders/${order_id}/review/${work_id}/accept_or_reject/`, data),
};
