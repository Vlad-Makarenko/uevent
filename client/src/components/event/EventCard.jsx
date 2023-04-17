import React from 'react';
import { Tooltip } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/date.utils';

export const EventCard = ({ event }) => (
  <div className='w-full mx-auto flex flex-col lg:flex-row cursor-pointer my-5 border-green-400 rounded-lg overflow-hidden shadow-md hover:shadow-green-400 animate-appear'>
    {/* <div className='max-w-md mx-auto my-4 rounded-lg overflow-hidden shadow-md'> */}
    <img
      className='lg:w-5/12 w-full h-64 object-cover'
      src={event.banner}
      alt={event.title}
    />
    <div className='flex flex-col lg:w-7/12 px-4 justify-between my-3'>
      <h2 className='text-xl font-bold mb-2 self-start'>{event.title}</h2>
      <p className='text-gray-700 text-sm mb-4 self-start text-left'>
        {event.description.length > 150 ? `${event.description.slice(0, 150)}...` : event.description}
      </p>
      <p className='text-gray-700 text-sm mb-4  self-start'>
        {formatDate(event.startEvent)}
      </p>
      <div className='text-gray-700 flex self-start text-sm mb-4'>
        {event.categories.map((cat, index) => (
          <div
            key={index}
            className='p-2 rounded-lg mr-1 text-white bg-green-400'>
            {cat.name}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-gray-700 text-sm'>
          {event.price > 0 ? `₴${event.price}` : 'Free'}
        </p>
        <p className='text-gray-700 text-sm'>
          {event.attendees.length}/{event.maxAttendees}
        </p>
      </div>
    </div>
  </div>
);

export default EventCard;