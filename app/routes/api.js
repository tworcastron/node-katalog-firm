const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/api/company-controller');
const UserController = require('../controllers/api/user-controller');
const upload = require('../services/uploader');
const authMiddleware = require('../middleware/is-auth-api-middleware');

router.get('/companies', CompanyController.showCompanies);
router.post('/companies', authMiddleware, CompanyController.create);
router.put('/companies/:slug', authMiddleware, upload.single('image'), CompanyController.edit);
router.delete('/companies/:slug', authMiddleware, CompanyController.delete);

router.post('/login', UserController.login);

module.exports = router;