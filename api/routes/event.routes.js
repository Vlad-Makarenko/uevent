const { Router } = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get('/:id', eventController.getEvent);
router.get('/today', authMiddleware, eventController.getTodayEvents);
router.get('/', eventController.getAllEvents);
router.get('/company/:companyId', eventController.getAllCompanyEvents);
router.post(
  '/',
  authMiddleware,
  body('name').trim().isLength({ min: 3, max: 30 }),
  body('price').isInt().isLength({ min: 0 }),
  body('name').trim().isLength({ min: 3, max: 30 }),
  eventController.createEvent
);
router.patch('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
