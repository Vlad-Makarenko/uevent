// const mongoose = require('mongoose');

// const eventService = require('./event.service');
const ApiError = require('../utils/ApiError');

const { Company, User, Event } = require('../models');

module.exports.createCompany = async (userId, company) => await Company
  .create(company).then(async (docCompany) => {
    await User.findByIdAndUpdate(
      userId,
      { $push: { companies: docCompany.id } },
      { new: true, useFindAndModify: false }
    );
    return docCompany;
  });

// Read all companies
module.exports.getAllCompanies = async () => {
  const companies = await Company.find();
  return companies;
};

// Read a single company by ID
module.exports.getCompanyById = async (id) => {
  const company = await Company.findById(id)
    .populate({
      path: 'owner',
      select: 'id fullName avatar'
    })
    .populate({
      path: 'events',
      select: 'id title banner price description',
    });
  return company;
};

module.exports.getMyCompany = async (id) => {
  const company = await Company.find().where('owner').equals(id)
    .populate({
      path: 'owner',
      select: 'id fullName avatar'
    })
    .populate({
      path: 'events',
      select: 'id title banner price description',
    });
  return company;
};

// Update a company by ID
module.exports.updateCompanyById = async (id, companyData) => {
  const company = await Company.findById(id);
  if (!company) {
    throw ApiError.NothingFoundError('Company not found');
  }
  Object.assign(company, companyData);
  await company.save();
  return company;
};

// Delete a company by ID
module.exports.deleteCompanyById = async (id) => {
  await Company.findByIdAndDelete(id);
};

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
