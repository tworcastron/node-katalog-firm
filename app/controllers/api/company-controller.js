const Company = require('../../db/models/company');
const fs = require('fs');

class CompanyController {

  async showCompanies(req, res) {
    const companies = await Company.find();
    res.status(200).json(companies);
  }

  async create(req, res) {
    const company = new Company({
      name: req.body.name,
      slug: req.body.slug,
      employeesCount: req.body.employeesCount,
      user: req.user._id
    });

    try {
      await company.save();
      res.status(201).json(company);
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }

  async edit(req, res) {
    const { slug } = req.params;
    const company = await Company.findOne({ slug });
    if (req.body.name) company.name = req.body.name;
    if (req.body.slug) company.slug = req.body.slug;
    if (req.body.employeesCount) company.employeesCount = req.body.employeesCount;

    if (req.file && company.image) {
      fs.unlinkSync('public/uploads/' + company.image);
    }
    if (req.file) {
      company.image = req.file.filename;
    }

    try {
      await company.save();
      res.status(200).json(company);
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }

  async delete(req, res) {
    const { slug } = req.params;
    const company = await Company.findOne({ slug });
    try {
      if (company.image) {
        fs.unlinkSync('public/uploads/' + company.image);
      }
      await Company.deleteOne({ slug });
      res.sendStatus(204);
    } catch (e) {
      //
    }
  }

}

module.exports = new CompanyController();