const { Router } = require('express');
const { body } = require('express-validator');
const companyController = require('../controllers/company.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get('/', authMiddleware, companyController.getAllCompanies);
router.get('/:id', authMiddleware, companyController.getCompany);
router.get('/acceptInvite/:key', authMiddleware, companyController.acceptInvite);
router.post(
  '/',
  authMiddleware,
  body('name').trim().isLength({ min: 3, max: 50 }),
  companyController.createCompany,
);
router.post('/invite/:id', authMiddleware, companyController.sendInvite);
router.patch(
  '/:id',
  authMiddleware,
  body('name').trim().isLength({ min: 3, max: 50 }),
  companyController.updateCompany,
);
router.delete('/:id', authMiddleware, companyController.deleteCompany);
router.delete('/participant/:id', authMiddleware, companyController.deleteParticipant);

module.exports = router;
