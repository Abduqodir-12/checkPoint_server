const {rows} = require('../../database/pg');
const query = require('../model/query')

const quizzCntrl = {
    createQuizz: async (req, res) => {
        try {
            const {title, quesstions_count, quizz_time, level} = req.body;            

            if (!title || !quesstions_count || !quizz_time || !level) {
                return res.status(400).send({ message: "All fields are required" });
            }

            const result = await rows(query.CREATE_QUIZZ, title, quesstions_count, quizz_time, level)

            res.status(201).send({ message: "Quiz created successfully", quiz: result[0] });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },

    allQuizz: async (req, res) => {
        try {
            const quizz = await rows(query.ALL_QUIZZ);
            if (quizz.length === 0) {
                return res.status(404).send({ message: 'quizz not found' });
            }
            res.status(200).send({ message: 'All quizz', quizz });
        } catch (error) {
            onsole.log(error);
            res.status(403).send({message: error.message})
        }
    },

    oneQuizz: async (req, res) => {
        try {
            const { id } = req.params;
            const quizz = await rows(query.ONE_QUIZZ, id);

            if (quizz.length === 0) {
                return res.status(404).send({ message: 'quizz not found!' });
            }
            res.status(200).send({ message: 'quizz found', quizz: quizz[0] });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },

    deletQuizz: async (req, res) => {
        try {
            const {id} = req.params;

            const deleteQuestions = await rows(query.DELET_QUESTIONS, id)
           
            const deleteQuizz = await rows(query.DELETE_QUIZZ, id)
            
            if(deleteQuizz?.length === 0) {
                return res.status(400).send({message: 'quizz not found'})
            }
            res.status(200).send({message: 'quizz deleted success', deletedQuizz: deleteQuizz[0], deleteQuestions: deleteQuestions[0]})
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },

    updateQuizz: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, quesstions_count, quizz_time, level } = req.body;

            const updateQuizz = await rows(query.UPDATE_QUIZZ, id, title, quesstions_count, quizz_time, level);            

            if (updateQuizz.length > 0) {
                return res.status(200).send({ message: 'update quizz', quizz: updateQuizz[0] });
            }
            res.status(400).send({message: 'quizz not found'})
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    }
}

module.exports = quizzCntrl;