import axios from 'axios';
import { ApiClient } from '.';
import { v4 as uuidv4 } from 'uuid';

export const paymentAPI = {
  createPayment: async (amount, username, password) =>
    axios.post(
      `https://api.yookassa.ru/v3/payments`,
      {
        amount: {
          value: amount,
          currency: 'RUB',
        },
        confirmation: {
          type: 'embedded',
        },
        capture: true,
        description: 'Заказ ',
      },
      {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': uuidv4(),
          Origin: 'http://localhost:3000',
        },
      },
    ),
  createPayout: async (amount, synonim, username, password) =>
    axios.post(
      `https://api.yookassa.ru/v3/payouts`,
      {
        amount: {
          value: amount,
          currency: 'RUB',
        },
        payout_token: synonim,
        // capture: true,
        description: 'Заказ ',
      },
      {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': uuidv4(),
          Origin: 'http://localhost:3000',
        },
      },
    ),

  getHistory: async params => ApiClient.get('/lk_author/user_currency/', { params }),
  testPayment: async body => ApiClient.post('/currency/test_payment/', body),
  testPayout: async body => ApiClient.post('/currency/test_payout/', body),
};
