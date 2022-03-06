const Item = require('../models/item')
const db = require('../db')


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

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
    deleteItem
}