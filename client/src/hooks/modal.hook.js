/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEventForm } from '../components/event/CreateEventForm';
import { EditEventForm } from '../components/event/EditEventForm';
import { InfoEventForm } from '../components/event/InfoEventForm';
import { ModalWin } from '../components/ModalWin';
import { ProfileSettings } from '../components/user/ProfileSettings';
import {
  createEventOff,
  paymentOff,
  editCalendarOff,
  editEventOff,
  infoEventOff,
  settingsOff,
  infoCalendarOff,
} from '../store/modalSlice';
import PaymentModal from '../components/PaymentModal';

export const useModal = () => {
  const dispatch = useDispatch();
  const {
    payment,
    editCalendar,
    createEvent,
    editEvent,
    infoEvent,
    infoCalendar,
    settings,
  } = useSelector((state) => state.modal);

  return (
    <div>
      <ModalWin
        show={settings}
        header={'Profile settings'}
        onHide={() => dispatch(settingsOff())}>
        <ProfileSettings />
      </ModalWin>
      <ModalWin
        show={createEvent}
        header={'Event creation'}
        onHide={() => dispatch(createEventOff())}>
        <CreateEventForm />
      </ModalWin>
      <ModalWin
        show={payment}
        header={'Payment'}
        onHide={() => dispatch(paymentOff())}>
        <PaymentModal />
      </ModalWin>
      <ModalWin
        show={editEvent}
        header={'Event edition'}
        onHide={() => dispatch(editEventOff())}>
        <EditEventForm />
      </ModalWin>
      <ModalWin
        show={infoEvent}
        header={
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Event Information
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Details about event
            </p>
          </div>
        }
        onHide={() => dispatch(infoEventOff())}>
        <InfoEventForm />
      </ModalWin>
    </div>
  );
};
