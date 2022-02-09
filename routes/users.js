const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// create user

router.post('/', async (req, res) => {
  try {
    const { userName, email } = req.body;

    const existsUser = await User.exists({ userName });

    if(existsUser){
      return res.status(400).json({ message: 'Username indisponível'});
    }

    const existsEmail = await User.exists({ email });

    if(existsEmail){
      return res.status(400).json({ message: 'E-mail indisponível'});
    }

    const hashedPass = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT));

    const newUser = await new User({
      userName,
      email,
      password: hashedPass
    });

    const savedUser = await newUser.save();

    const { password, updatedAt, ...other } = savedUser._doc;

    return res.status(201).json(other);
  } catch (error) {
    return res.status(500).json({ error: error});
  }
});

// login

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
