// const mongoose = require('mongoose');

// const eventService = require('./event.service');
// const ApiError = require('../utils/ApiError');

// const { Company, User, Event } = require('../models');

// const createCompany = async (userId, company) => await Company.create(company)
//   .then(async (docCompany) => {
//     await User.findByIdAndUpdate(
//       userId,
//       { $push: { companys: docCompany.id } },
//       { new: true, useFindAndModify: false },
//     );
//     return docCompany;
//   });

// const addParticipant = async (userId, link) => {
//   const participant = await User.findById(userId);
//   if (!participant) {
//     throw ApiError.BadRequestError('User is not authorized');
//   }
//   const candidate = await Company.findOne().where('inviteLink').equals(link);
//   if (!candidate) {
//     throw ApiError.BadRequestError('Wrong link');
//   }
//   if (candidate.participants.includes(userId)) {
//     throw ApiError.BadRequestError('You have already accepted this invitation');
//   }
//   if (candidate.author.toString() === userId) {
//     throw ApiError.BadRequestError('You are already an author');
//   }
//   const company = await Company.findByIdAndUpdate(
//     candidate.id,
//     {
//       $push: { participants: userId }
//       type: 'shared',
//     },
//     { new: true, useFindAndModify: false },
//   );
//   return company;
// };

// const getCompanyById = async (id, userId) => {
//   const company = await Company.findById(id)
//     .populate('events')
//     .populate({ path: 'author', select: 'login fullName avatar id' })
//     .populate({ path: 'participants', select: 'login fullName avatar id' });
//   if (!company || (!company.isPublic && company.author.id !== userId)) {
//     return null;
//   }
//   return company;
// };

// const getAllCompanies = async (userId) => {
//   const company = await Company.find({
//     $or: [
//       { author: mongoose.Types.ObjectId(userId) },
//       { participants: mongoose.Types.ObjectId(userId) },
//     ],
//   });
//   return company;
// };

// const updateCompany = async (
//   userId,
//   companyId,
//   name,
//   description,
//   isHidden,
//   isPublic,
// ) => {
//   const company = await Company.findById(companyId);
//   if (!company) {
//     throw ApiError.BadRequestError('no such company found', errors.array());
//   }
//   if (company.author.toString() !== userId) {
//     throw ApiError.ForbiddenError();
//   }
//   company.name = name || company.name;
//   company.description = description || company.description;
//   company.isHidden = isHidden;
//   company.isPublic = isPublic;
//   await company.save();
//   return company;
// };

// const deleteCompany = async (userId, companyId) => {
//   const company = await Company.findById(companyId);
//   if (!company) {
//     throw ApiError.BadRequestError('Company does not exist');
//   }
//   if (company.author.toString() !== userId) {
//     throw ApiError.ForbiddenError();
//   }
//   await Event.deleteMany({ parentCompany: company.id });
//   company.delete();
// };

// const deleteParticipant = async (userId, companyId) => {
//   const company = await Company.findById(companyId);
//   if (!company) {
//     throw ApiError.BadRequestError('Company does not exist');
//   }
//   company.participants = company.participants.filter(
//     (participant) => participant.toString() !== userId,
//   );
//   await company.save();
// };

// module.exports = {
//   getCompanyById,
//   getAllCompanies,
//   createCompany,
//   updateCompany,
//   deleteCompany,
//   addParticipant,
//   deleteParticipant,
// };
