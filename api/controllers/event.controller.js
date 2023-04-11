const { validationResult } = require('express-validator');

const uuid = require('uuid');
const eventService = require('../services/event.service');
const mailService = require('../services/mail.service');
const ApiError = require('../utils/ApiError');

const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.InvalidDataError('validation error', errors.array())
      );
    }
    const { organizer } = req.body;
    const event = await eventService.createEvent(organizer, req.body);

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const event = await eventService.updateEvent(
      req.user.id,
      req.params.id,
      req.body
    );

    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvents();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllCompanyEvents = async (req, res, next) => {
  try {
    const result = await eventService.getAllCompanyEvents(req.params.companyId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getMyEvents = async (req, res, next) => {
  try {
    const result = await eventService.getMyEvents(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getTodayEvents = async (req, res, next) => {
  try {
    const result = await eventService.getTodayEvents(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const result = await eventService.getCategories();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const result = await eventService.getEventById(req.params.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(req.user.id, id);
    res.status(204).json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const subscribeEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.subscribeEvent(req.user.id, id);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

const unsubscribeEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventService.unsubscribeEvent(req.user.id, id);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getAllCompanyEvents,
  getMyEvents,
  getTodayEvents,
  getCategories,
  getEvent,
  deleteEvent,
  subscribeEvent,
  unsubscribeEvent,
};
