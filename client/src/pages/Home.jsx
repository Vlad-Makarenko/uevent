import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { HiSearch, HiPlus } from 'react-icons/hi';
import { EventCard } from '../components/event/EventCard';
import { getAllCalendars } from '../store/calendarSlice';
import { Loader } from '../components/Loader';
import { createCalendarOn } from '../store/modalSlice';
import { Filters } from '../components/event/Filters';
import {
  getAllEvents,
  getCategories,
  getTodayEvents,
} from '../store/eventSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const { events, categories, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    setDisplayedEvents(events);
    setFilteredEvents(events);
  }, [events]);

  useEffect(() => {
    setDisplayedEvents(filteredEvents);
  }, [filteredEvents]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    const tempEvents = [...filteredEvents];
    setDisplayedEvents(
      tempEvents.filter((value) => value.title.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  if (isLoading) {
    <Loader />;
  }
  return (
    <div className='container m-auto justify-end flex flex-col-reverse lg:flex-row-reverse w-full'>
      <div className='lg:mt-6 w-full lg:w-2/3'>
        <div className='flex mx-5 my-2 justify-between'>
          <div className='flex items-center justify-center w-1/2 lg:w-1/3 border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
            <HiSearch color='green' size='30' className='mx-3' />
            <input
              type='text'
              onChange={searchHandler}
              value={search}
              name='search'
              className='w-full bg-transparent border-0 p-3 focus:outline-none focus:border-0'
              placeholder='Search...'
            />
          </div>
          <h1 className='text-2xl my-2'>Events</h1>
        </div>
        <div className='flex flex-col w-full lg:mx-5 my-6'>
          {displayedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
      <div className='w-full lg:mt-6 mt-3 mb-3 lg:w-1/3 h-1/3 lg:h-full'>
        <div
          className='overflow-y-auto h-full lg:h-5/6 flex flex-col items-center lg:mr-16 border shadow-md hover:shadow-green-400 border-green-200 rounded-xl'>
          <Filters
            categories={categories}
            filteredEvents={filteredEvents}
            setFilteredEvents={setFilteredEvents}
          />
        </div>
      </div>
    </div>
  );
};
