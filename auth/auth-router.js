const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('./auth-model')

router.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await Users.findBy({username}).first()
    if (user){return res.status(409).json({message: "Username already taken"})}
    const newUser = await Users.add({username, password: await bcrypt.hash(password, 2)})
    return res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try{
    const {username, password} = req.body
    const user = await Users.findBy({username}).first()
    if (!user) {return res.status(401).json({message: "Invalid Credentials"})}
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid){return res.status(409).json({message: "Invalid Credentials"})}
    const token = jwt.sign({userId: user.id, username: user.username}, "process.env.JWT_SECRET")
    res.cookie('token', token)
    res.json({message: `Welcome ${user.username}!`, token})
  } catch(err) {
      next(err)
  }
});

module.exports = router;
