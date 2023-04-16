import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EventCard } from '../components/event/EventCard';
import { Loader } from '../components/Loader';
import { ProfileCard } from '../components/user/ProfileCard';
import { getAllCompanies } from '../store/companySlice';
import { getUser } from '../store/userSlice';

export const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [calendars, setCalendars] = useState([]);
  const { user, isLoading: userLoading } = useSelector((state) => state.user);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, []);

  useEffect(() => {
    if (user.calendars) {
      setCalendars(user.calendars);
    }
  }, [user.calendars]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    const tempTags = [...user.calendars];
    setCalendars(
      tempTags.filter((value) => value.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };
  useEffect(() => {
    dispatch(getUser({ id }));
  }, [id]);

  return (
    <div className='container m-auto justify-end flex flex-col lg:flex-row w-full h-screen'>
      {userLoading ? (
        <Loader />
      ) : (
        <div className='w-full lg:w-1/3'>
          <div className='overflow-y-auto h-full lg:h-5/6 flex flex-col items-center mt-6 border shadow-md shadow-green-400 border-green-200 rounded-xl'>
            <ProfileCard user={user} />
          </div>
        </div>
      )}
      {userLoading ? (
        <Loader />
      ) : (
        <div className='overflow-y-auto mt-12 lg:mt-6 h-3/6 lg:h-5/6 w-full lg:w-2/3'>
          <div className='flex mx-5 my-2 justify-between'>
            <h1 className='text-2xl my-2'>{`${user.login}'s public calendars`}</h1>
            <div className='flex items-center justify-center w-1/2 lg:w-1/3 border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
              <HiSearch color='green' size='30' className='mx-3' />
              <input
                type='text'
                onChange={searchHandler}
                value={search}
                name='search'
                className='w-full bg-transparent border-0 p-3 focus:outline-none focus:border-0'
                placeholder={`${t('Search')}...`}
              />
            </div>
          </div>
          <div className='flex mx-5 my-6 flex-wrap'>
            {calendars.map((calendar) => (
              <EventCard key={calendar._id} calendar={calendar} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
