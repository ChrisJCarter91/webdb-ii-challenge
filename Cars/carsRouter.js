const express = require('express');

const db = require('../data/db-config');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const cars = await db('cars');
    res.json(cars);
  } catch (error) {
    res.status(500).json({
      message: 'Server was unable to retrieve cars',
    });
  }
});


router.get('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const car = await db('cars')
      .where({ id: id })
      .first();

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: 'Server failed to retrieve the specified car',
    });
  }
});


router.post('/', async (req, res) => {
  try {
    const carData = req.body;
    const [id] = await db('cars').insert(carData);
    const newCarEntry = await db('cars').where({ id });

    res.status(201).json(newCarEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server failed to add new car entry' });
  }
});


router.put('/:id', async (req, res) => {
  const {
    params: { id },
    body: body,
  } = req;

  try {
    const updatedCarEntry = await db('cars')
      .where({ id: id })
      .update(body);

    res.status(200).json(updatedCarEntry);
  } catch (error) {

    res.status(500).json({
      message: 'Server failed to update car entry',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const deleteCarEntry = await db('cars')
      .where({ id: id })
      .del();

    res
      .status(200)
      .json({ message: `${deleteCarEntry} was deleted successfully` });
  } catch (error) {

    res.status(500).json({
      message: 'Server failed to delete the specified car entry',
    });
  }
});

module.exports = router;