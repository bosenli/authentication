const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('This is root!'))



router.get('/items', controllers.getAllItems)
router.get('/items/:id', controllers.getItemById)


//after JWT on controller
router.post('/items', restrict, controllers.createItem)
router.post('/items/:id', restrict, controllers.updateItem)
router.post('/items/:id', restrict, controllers.deleteItem)

module.exports = router