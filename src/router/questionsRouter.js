const router = require('express').Router()

const questionsCntrl = require('../controller/questionsCntrl');
const { midleware } = require('../midleware/midleware');

router.post('/', midleware, questionsCntrl.createQuestions)
router.get('/', questionsCntrl.allQuestions)
router.get('/:id', questionsCntrl.oneQuestion)
router.delete('/:id', midleware, questionsCntrl.deleteQuestions)

module.exports = router;