const Item = require('../models/item')
const db = require('../db')


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//JWT PART begin
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')  // npm i jsonwebtoken
const User = require('../models/user')

const SALT_ROUNDS = 11
const TOKEN_KEY = 'areallylongkey'

const signUp = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({
      username, 
      email,
      password_digest
    })

    const payload = {
      id = user.id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign({payload, TOKEN_KEY})
    return res.status(201).json({user, token})
  } catch (error) {
    console.log('error')
    return res.status(400).json({error: error.message})
  }
}

const signIn = async (req, res) => {
  try {

    console.log(req.body)
    const { username, password } = req.body
    const user = await User.findOne({
      where: {
        username
      }
    })
    if (await bcrypt.compare(password, user.dataValues.password_digest)) {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      const token = jwt.sign(payload, TOKEN_KEY)
      return res.status(201).json({ user, token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

//JWT end 

const createItem = async (req, res) => {
  try {
      const item = await new Item(req.body)
      await item.save()
      return res.status(201).json(item)
  } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error.message })
  }
}

const getAllItems = async (req, res) => {
  try {
      const items = await Item.find()
      return res.status(200).json({ items })
  } catch (error) {
      return res.status(500).send(error.message)
  }
}


const getItemById = async (req, res) => {
  try {
      const { id } = req.params
      const item = await Item.findById(id)
      if (item) {
          return res.status(200).json({ item })
      }
      return res.status(404).send('Item with the specified ID does not exists')
  } catch (error) {
      return res.status(500).send(error.message)
  }
}

const updateItem = async (req, res) => {
  try {
      const { id } = req.params;
       Item.findByIdAndUpdate(id, req.body, { new: true }, function (err, item) {
          if (err) {
              res.status(500).send(err);
          }
          if (!item) {
              res.status(500).send('Item not found!');
          }
          return res.status(200).json(item)
      })
  } catch (error) {
      return res.status(500).send(error.message);
  }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Item deleted");
    }
    throw new Error("Item not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


module.exports = {
  createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    signIn, 
    signUp
}