const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// create user

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
  try { 
    
    const { userName } = req.body;

    const user = await User.findOne({ userName });

    !user && res.status(401).json({ message: 'Usuário e ou senha incorreta'});

    const { password } = req.body;

    const validPass = await bcrypt.compare(password, user.password);

    !validPass && res.status(401).json({ message: 'Usuário e ou senha incorreta'});

    res.status(200).json({ _id: user._id, userName: user.userName});
   
  } catch (error) {
    return res.status(500).json({ error: error});
  }
});

module.exports = router;
