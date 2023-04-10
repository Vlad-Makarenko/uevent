const { Router } = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get('/', eventController.getAllEvents);
router.get('/categories', eventController.getCategories);
router.get('/today', authMiddleware, eventController.getTodayEvents);
router.get('/:id', eventController.getEvent);
router.get('/company/:companyId', eventController.getAllCompanyEvents);
router.post('/subscribe/:id', authMiddleware, eventController.subscribeEvent);
router.post('/unsubscribe/:id', authMiddleware, eventController.unsubscribeEvent);
router.post(
  '/',
  authMiddleware,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    // body('startEvent').notEmpty().isDate().withMessage('Invalid start date'),
    // body('endEvent').notEmpty().isDate().withMessage('Invalid end date'),
    body('price').notEmpty().isNumeric().withMessage('Price is required and must be a number'),
    body('maxAttendees').notEmpty().isNumeric().withMessage('Max attendees is required and must be a number'),
    body('organizer').notEmpty().withMessage('Organizer is required'),
    body('categories').isArray({ min: 1 }).withMessage('At least one category is required'),
  ],
  eventController.createEvent
);
router.patch(
  '/:id',
  authMiddleware,
  [
    body('title').optional().trim().notEmpty()
      .withMessage('Title is required'),
    body('description').optional().trim().notEmpty()
      .withMessage('Description is required'),
    body('location').optional().trim().notEmpty()
      .withMessage('Location is required'),
    // body('startEvent').optional().isDate().withMessage('Invalid start date'),
    // body('endEvent').optional().isDate().withMessage('Invalid end date'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('maxAttendees').optional().isNumeric().withMessage('Max attendees must be a number'),
    body('organizer').optional().notEmpty().withMessage('Organizer is required'),
    body('categories').optional().isArray({ min: 1 }).withMessage('At least one category is required'),
  ],
  eventController.updateEvent
);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
