import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { Loader } from '../components/Loader';

export const EventPage = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleBuyTicket = () => {
  };
  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const event = {
    name: 'bebra',
    memberCount: 15,
    imageUrl: 'https://i.pinimg.com/550x/e1/a5/ab/e1a5ab6837ae411f48a3c436c771e35f.jpg'
  };
  return (
    <div className='container mx-auto'>
        <div className='flex items-center justify-between my-4'>
          <div className='flex items-center'>
            {/* Render event image and name */}
            <div className='flex flex-col'>
              <img src={event.imageUrl} alt={event.name} className='w-80 h-80 mb-2' />
              <div className='text-center'>{event.name}</div>
            </div>
          </div>
      <div className='border rounded px-4 py-2'>
          <div className='flex items-center'>
            <div className='mr-4'>
              {/* Render member count */}
              {event.memberCount}
            </div>
            <div className='relative'>
              {/* Render dropdown list with arrow */}
              <button
                className='bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded'
                onClick={handleOpenDropdown}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='h-5 w-5 inline-block align-middle'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.707a1 1 0 0 1 1.414 0L10 10.586l3.293-2.879a1 1 0 1 1 1.414 1.414l-4 3.5a1 1 0 0 1-1.414 0l-4-3.5a1 1 0 0 1 0-1.414z'
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className='absolute left-0 mt-2 bg-gray-200 p-4 rounded'>
                  {/* Dropdown list content */}
                  <li>Option 1</li>
                  <li>Option 2</li>
                  <li>Option 3</li>
                  {/* Add more list items as needed */}
                </ul>
              )}
            </div>
            <div>
              {/* Render buy ticket/sign to event button */}
              <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded' onClick={handleBuyTicket}>
                Buy Ticket/Sign to Event
              </button>
            </div>
            <div>
              {/* Render event price */}
              Price: $10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//   const { activeCalendars, isLoading: calendarLoading } = useSelector(
//     (state) => state.calendar
//   );
//   if (calendarLoading) {
//     <Loader />;
//   }
