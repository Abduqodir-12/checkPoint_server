const router = require('express').Router()

const userCtrl = require('../controller/userCntrl')
const { midleware } = require('../midleware/midleware')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/', userCtrl.allUsers)
router.get('/:id', userCtrl.oneUser)
router.put('/:id', userCtrl.updateUser)
router.delete('/:id', midleware, userCtrl.deleteUser)

module.exports = router;