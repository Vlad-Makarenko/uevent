const { validationResult } = require('express-validator');

const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const companyService = require('../services/company.service');
const ApiError = require('../utils/ApiError');
const mailService = require('../services/mail.service');

const createCompany = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const { name, description, isPublic } = req.body;
    const company = await companyService.createCompany(req.user.id, {
      author: req.user.id,
      name,
      description,
      isPublic,
      inviteLink: `${
        process.env.CLIENT_URL
      }/acceptInvite/company/${uuid.v4()}`,
    });
    return res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const {
      name, description, isHidden, isPublic,
    } = req.body;
    const company = await companyService.updateCompany(
      req.user.id,
      req.params.id,
      name,
      description,
      isHidden,
      isPublic,
    );

    return res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const result = await companyService.getAllCompanies(req.user.id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getCompany = async (req, res, next) => {
  try {
    const result = await companyService.getCompanyById(
      req.params.id,
      req.user.id,
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    await companyService.deleteCompany(req.user.id, id);
    res.status(204).json({ message: 'Company deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteParticipant = async (req, res, next) => {
  try {
    const { id } = req.params;
    await companyService.deleteParticipant(req.user.id, id);
    res.status(204).json({ message: 'Company deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const sendInvite = async (req, res, next) => {
  try {
    const token = jwt.sign(
      { from: req.user.id, company: req.params.id, to: req.body.participant },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '7d',
      },
    );
    await mailService.sendInviteCompany(
      req.body.participant.email,
      token,
      req.user.fullName,
      req.params.id,
    );
    res.status(200).json({ message: 'Invite sent successfully' });
  } catch (err) {
    next(err);
  }
};

const acceptInvite = async (req, res, next) => {
  try {
    const { key } = req.params;
    const link = `${process.env.CLIENT_URL}/acceptInvite/company/${key}`;
    const company = await companyService.addParticipant(req.user.id, link);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCompany,
  updateCompany,
  getAllCompanies,
  getCompany,
  deleteCompany,
  deleteParticipant,
  sendInvite,
  acceptInvite,
};