const router = require('express').Router()

router.use('/api', require('./notesRoutes.js'))
router.use('', require('./htmlRoutes.js'))

module.exports = router