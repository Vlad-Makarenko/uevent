import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../http';
import { API_URL } from '../utils/constants';
import {
  DEFAULT_FILTERS,
  countTotalPages,
  filterEventsUtil,
  getCurrentEvents,
} from '../utils/filters.utils';
import { errorHandler } from '../utils/errorHandler';
import { updateEventUtil } from '../utils/event.utils';

export const getTodayEvents = createAsyncThunk(
  'event/getTodayEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/today`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'event/getAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  'event/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyEvents = createAsyncThunk(
  'event/getMyEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/my`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (
    { id, name, type, description, color, startEvent, endEvent, allDay },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`${API_URL}/event/${id}`, {
        name,
        type,
        description,
        color,
        startEvent,
        endEvent,
        allDay,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async (
    {
      _id,
      name,
      type,
      description,
      color,
      startEvent,
      endEvent,
      isPerformed,
      allDay,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`${API_URL}/event/${_id}`, {
        name,
        type,
        description,
        color,
        startEvent,
        endEvent,
        isPerformed,
        allDay,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/event/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptEventInvite = createAsyncThunk(
  'event/acceptEventInvite',
  async ({ key }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/acceptInvite/${key}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    filteredEvents: [],
    categories: [],
    todayEvents: [],
    event: {},
    totalPages: 1,
    currentPage: 1,
    currentPageEvents: [],
    eventLoading: false,
    isLoading: false,
    success: false,
  },
  reducers: {
    setCurrentEvent(state, action) {
      state.event = action.payload;
      state.success = false;
    },
    setSuccessFalse(state) {
      state.success = false;
    },
    filterEvents(state, action) {
      const filteredEvents = filterEventsUtil(
        action.payload.events,
        action.payload.filters
      );
      state.filteredEvents = filteredEvents;
      state.totalPages = countTotalPages(filteredEvents);
      state.currentPageEvents = getCurrentEvents(filteredEvents, 1);
      state.currentPage = 1;
    },
    changePage(state, action) {
      state.currentPage = action.payload.page;
      state.currentPageEvents = getCurrentEvents(
        action.payload.events,
        action.payload.page
      );
    },
    resetFilters(state, action) {
      const filteredEvents = filterEventsUtil(
        state.events,
        DEFAULT_FILTERS
      );
      state.filteredEvents = filteredEvents;
      state.totalPages = countTotalPages(filteredEvents);
      state.currentPageEvents = getCurrentEvents(filteredEvents, 1);
      state.currentPage = 1;
    },
  },
  extraReducers: {
    [getTodayEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getEvent.pending]: (state) => {
      state.eventLoading = true;
    },
    [getAllEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [createEvent.pending]: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    [acceptEventInvite.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodayEvents.fulfilled]: (state, action) => {
      state.todayEvents = action.payload;
      state.isLoading = false;
    },
    [getEvent.fulfilled]: (state, action) => {
      state.event = action.payload;
      state.eventLoading = false;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      const filteredEvents = filterEventsUtil(action.payload, DEFAULT_FILTERS);
      state.filteredEvents = filteredEvents;
      state.totalPages = countTotalPages(filteredEvents);
      state.currentPageEvents = getCurrentEvents(filteredEvents, 1);
      state.currentPage = 1;
      state.isLoading = false;
    },
    [getMyEvents.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.events = action.payload;
      state.isLoading = false;
    },
    [createEvent.fulfilled]: (state, action) => {
      toast.success('Event has been successfully created!');
      state.events = [...state.events, action.payload];
      state.isLoading = false;
      state.success = true;
    },
    [acceptEventInvite.fulfilled]: (state) => {
      toast.success('Invite has been successfully accepted!');
      state.isLoading = false;
    },
    [updateEvent.fulfilled]: (state, action) => {
      toast.success('Event has been successfully updated!');
      state.events = updateEventUtil(state.events, action.payload);
      state.todayEvents = updateEventUtil(state.todayEvents, action.payload);
      state.isLoading = false;
      state.success = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      const id = action.payload;
      state.events = state.events.filter((item) => item._id !== id);
      state.isLoading = false;
    },
    [getTodayEvents.rejected]: errorHandler,
    [getEvent.rejected]: (state, action) => {
      state.eventLoading = false;
      toast.error(action.payload.message);
      console.log('Request error: ', action.payload);
    },
    [acceptEventInvite.rejected]: errorHandler,
    [getCategories.rejected]: errorHandler,
    [getAllEvents.rejected]: errorHandler,
    [getMyEvents.rejected]: errorHandler,
    [updateEvent.rejected]: errorHandler,
  },
});

export const {
  setCurrentEvent,
  setSuccessFalse,
  updateFilters,
  clearFilters,
  filterEvents,
  resetFilters,
  changePage,
} = eventSlice.actions;

export default eventSlice.reducer;
