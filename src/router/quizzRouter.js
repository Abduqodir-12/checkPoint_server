const router = require('express').Router()

const quizzCntrl = require('../controller/quizzCntrl');
const { midleware } = require('../midleware/midleware');

router.post('/', midleware, quizzCntrl.createQuizz)
router.get('/', quizzCntrl.allQuizz)
router.get('/:id', quizzCntrl.oneQuizz)
router.delete('/:id', midleware, quizzCntrl.deletQuizz)
router.put('/:id', midleware, quizzCntrl.updateQuizz)

module.exports = router;