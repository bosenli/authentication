const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('This is root!'))



router.get('/items', controllers.getAllItems)
router.get('/items/:id', controllers.getItemById)

module.exports = router