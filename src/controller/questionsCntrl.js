const {rows} = require('../../database/pg')
const query = require('../model/query')

const questionsCntrl = {
    createQuestions: async (req, res) => {
        try {
            const {text, option1, option2, option3, option4, answer, quizz_id} = req.body;
            
            if (!text || !option1 || !option2 || !option3 || !option4 || !answer || !quizz_id) {
                return res.status(400).send({ message: "All fields are required" });
            }

            const result = await rows(query.CREATE_QUESTIONS, text, option1, option2, option3, option4, answer, quizz_id)

            res.status(201).send({ message: "Questions created successfully", question: result[0] });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },

    allQuestions: async (req, res) => {
        try {
            const questions = await rows(query.ALL_QUESTIONS);
            if (questions.length === 0) {
                return res.status(404).send({ message: 'questions not found' });
            }
            res.status(200).send({ message: 'All questions', questions });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },

    oneQuestion: async (req, res) => {
        try {
            const { id } = req.params;
            const question = await rows(query.ONE_QUESTION, id);

            if (question.length === 0) {
                return res.status(404).send({ message: 'question not found!' });
            }
            res.status(200).send({ message: 'question found', question: question[0] });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },

    deleteQuestions: async (req, res) => {
        try {
            const {id} = req.params;

            const deleteQuestions = await rows(query.DELETE_QUESTION, id)
            
            if(deleteQuestions.length === 0) {
                return res.status(400).send({message: 'question not found'})
            }
            res.status(200).send({message: 'question deleted success', deleteQuestions: deleteQuestions[0]})
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    }
}

module.exports = questionsCntrl;