/* eslint-disable max-len */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../http';
import { API_URL } from '../utils/constants';

const PaymentModal = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Создаем платежную методику с использованием CardElement
    const cardElement = elements.getElement(CardElement);
    const response = await api.post(`${API_URL}/event/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // Сумма платежа в центах
        currency: 'usd', // Валюта платежа
      }),
    });

    if (response.status === 200) {
      console.log('ok');
      // Если платежная информация успешно получена от сервера, получаем клиентский секрет платежа
      const { clientSecret } = await response.data;

      // Подтверждаем платеж с использованием Stripe API
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Здесь можно передать данные о плательщике, например, имя и адрес
          },
        },
      });

      if (result.error) {
        // Обработка ошибок при подтверждении платежа
        setError(result.error.message);
      } else {
        // Если платеж успешно подтвержден, выполняем дополнительные действия, например, обновляем UI или отправляем уведомление о успешной оплате
        console.log('Платеж успешно подтвержден:', result.paymentIntent);

        // eslint-disable-next-line no-shadow
        // const response = await api.post(
        //   `${API_URL}/event/subscribe/:id`,
        //   {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       amount: 1000, // Сумма платежа в центах
        //     }),
        //   }
        // );
        // if (response.ok) {
        //   console.log('Подтверждение платежа успешно отправлено на сервер');
        //   // Выполняем дополнительные действия, например, обновляем UI или отправляем уведомление о успешной оплате
        // } else {
        //   // Обработка ошибок при отправке подтверждения на сервер
        //   setError('Не удалось отправить подтверждение платежа на сервер');
        // }
      }
    } else {
      // Обработка ошибок при получении клиентского секрета платежа от сервера
      setError('Не удалось создать платеж');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Отображение CardElement */}
      <CardElement />
      <button type='submit'>Оплатить</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PaymentModal;
