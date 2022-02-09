const router = require('express').Router();
const User = require('../models/User');

// create user

router.post('/', async (req, res) => {
  try {
    const newUser = await new User(req.body);

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: error});
  }
});

// get all user

router.get('/', async (req, res) => {
  try {
    const getAllUsers = await User.find();

    return res.status(200).json(getAllUsers);
  } catch (error) {
    return res.status(500).json({ error: error});
  }
});

module.exports = router;
