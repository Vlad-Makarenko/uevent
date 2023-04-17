/* eslint-disable max-len */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import api from '../http';
import { API_URL } from '../utils/constants';
import { subscribeEvent } from '../store/eventSlice';
import { formatDate } from '../utils/date.utils';

const PaymentModal = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { event: currEvent } = useSelector((state) => state.event);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const cardElement = elements.getElement(CardElement);
    const response = await api.post(`${API_URL}/event/create-payment-intent`, {
      amount: currEvent.price, // Сумма платежа в центах
      currency: 'usd', // Валюта платежа
    });

    if (response.status === 200) {
      const { clientSecret } = await response.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {},
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        console.log(result);
        dispatch(
          subscribeEvent({
            id: currEvent._id,
            paymentIntentId: result.paymentIntent.id,
            price: currEvent.price,
            title: currEvent.title,
            startEvent: formatDate(currEvent.startEvent),
            endEvent: formatDate(currEvent.endEvent),
          })
        ); //
        console.log('Платеж успешно подтвержден:', result.paymentIntent);
      }
    } else {
      setError('Не удалось создать платеж');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Отображение CardElement */}
      <CardElement />
      <button type='submit'>Pay</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PaymentModal;
