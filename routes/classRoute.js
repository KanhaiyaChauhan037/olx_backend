const express = require('express');
const router = express.Router();
const Classified = require('../models/classModel');

// POST /api
router.post('/', async (req, res) => {
     try {
          const classified = new Classified(req.body);
          await classified.save();
          res.status(201).json(classified);
     } catch (error) {
          res.status(500).json({ error: 'Failed to post the data.' });
     }
});

// DELETE /api/:id
router.delete('/:id', async (req, res) => {
     try {
          const deletedClassified = await Classified.findByIdAndDelete(req.params.id);
          if (deletedClassified) {
               res.status(204).json({ message: 'data deleted successfully.' });
          } else {
               res.status(404).json({ error: 'data not found.' });
          }
     } catch (error) {
          res.status(500).json({ error: 'Failed to delete the data.' });
     }
});

// GET /api
router.get('/', async (req, res) => {
     try {
          const { filter, sort, search, page, limit } = req.query;
          const query = {};
          if (filter) {
               query.category = filter;
          }
          if (search) {
               query.name = { $regex: search, $options: 'i' };
          }
          const total = await Classified.countDocuments(query);
          let sortField = 'date'; 
          let sortOrder = 1; 
          if (sort) {
               const [field, order] = sort.split(':');
               sortField = field;
               sortOrder = order === 'desc' ? -1 : 1;
          }

          // Apply pagination
          const currentPage = parseInt(page) || 1;
          const perPage = parseInt(limit) || 10;
          const skip = (currentPage - 1) * perPage;

        
          const classifieds = await Classified.find(query)
               .sort({ [sortField]: sortOrder })
               .skip(skip)
               .limit(perPage);

          res.json({
               total,
               page: currentPage,
               perPage,
               data: classifieds,
          });
     } catch (error) {
          res.status(500).json({ error: 'Failed to fetch the data.' });
     }
});

module.exports = router;
