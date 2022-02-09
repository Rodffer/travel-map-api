const router = require('express').Router();
const Pin = require('../models/Pin');

// create pin

router.post('/', async (req, res) => {
  try {
    const newPin = await new Pin(req.body);

    const savedPin = await newPin.save();

    return res.status(201).json(savedPin);
    
  } catch (error) {
    return res.status(500).json({ error: error});
  }
});

// get all pin

router.get('/', async (req, res) => {
  try {
    const getAllPins = await Pin.find();

    return res.status(200).json(getAllPins);
    
  } catch (error) {
    return res.status(500).json({ error: error});
  }
});

module.exports = router;
