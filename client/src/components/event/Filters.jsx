import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Tooltip } from 'flowbite-react';
import { getCategories } from '../../store/eventSlice';
import { prepareCategories, getTimes, filterByTime } from '../../utils/filters.utils';

export const Filters = ({ categories, filteredEvents, setFilteredEvents }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [times, setTimes] = useState(getTimes);
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    setDisplayedCategories(prepareCategories(categories));
  }, [categories]);

  const handleCategoryFilter = (category) => {
    setDisplayedCategories(
      displayedCategories.map((value) => (value._id === category._id
        ? { ...value, isChecked: !value.isChecked }
        : { ...value }))
    );
    const tempEvents = [...events];
    console.log(tempEvents);
    setFilteredEvents(
      tempEvents.filter((value) => value.categories.some((e) => e._id === category._id))
    );
  };

  const handleTimeFilter = (time) => {
    setTimes(
      getTimes.map((value) => (value.value === time.value
        ? { ...value, isChecked: true }
        : { ...value, isChecked: false }))
    );
    setFilteredEvents(filterByTime(events, time.value));
  };

  const clearHandler = () => {
    setDisplayedCategories(prepareCategories(categories));
    setTimes(getTimes);
    setFilteredEvents(events);
  };

  return (
    <div className='filters-container w-full'>
      <button
        className='block w-full pt-2 pb-3 font-bold uppercase lg:hover:bg-transparent hover:bg-gray-100'
        onClick={() => setIsOpen(!isOpen)}>
        Filters
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block pt-2 pb-3`}>
        <div>
          <h3 className='font-bold text-lg bg-green-50 flex justify-center items-center h-5 p-5 mb-2'>
            Time
          </h3>
          {times.map((time, index) => (
            <div
              key={index}
              className={`${
                time.isChecked ? 'bg-green-100' : ''
              } flex items-center text-lg h-5  p-5 pl-20 cursor-pointer border-b hover:bg-green-50 active:text-blue-500`}
              onClick={() => handleTimeFilter(time)}>
              <div>{time.name}</div>
            </div>
          ))}
        </div>
        <div className='mb-3'>
          <h3 className='font-bold text-lg bg-green-50 flex justify-center items-center h-5 p-5 mb-2 mt-2'>
            Category
          </h3>
          {displayedCategories.map((category, index) => (
            <div
              key={index}
              className={`${
                category.isChecked ? 'bg-green-100' : ''
              } flex items-center text-lg h-5  p-5 pl-20 cursor-pointer border-b hover:bg-green-50 active:text-blue-500`}
              onClick={() => handleCategoryFilter(category)}>
              <div>{category.name}</div>
            </div>
          ))}
        </div>
        <button
          className='block w-full pt-2 pb-3 font-bold uppercase hover:bg-gray-100'
          onClick={clearHandler}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};
