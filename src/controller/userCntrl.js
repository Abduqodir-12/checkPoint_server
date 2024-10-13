const {rows} = require('../../database/pg');
const query = require('../model/query');
const JWT = require('jsonwebtoken');

const secret_key = process.env.JWT_SECRET_KEY;

const userCtrl = {
    signup: async (req, res) => {
        try {
            const {name, surname, email, password, role} = req.body;
            const oldUser = await rows(query.CHEC_USER, email)
            if(oldUser.length > 0) {
                return res.status(400).send({message: 'This is email already exists!'})
            }           
            const user = await rows(query.SIGNUP, name, surname, email, password, role)
            const token = JWT.sign(user[0], secret_key);
            res.status(201).send({message: 'signup success', user: user[0], token})                        
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await rows(query.LOGIN, email, password)

            if(user.length === 0) {
                return res.status(400).send({message: 'email or password wrong'})
            }

            const token = JWT.sign(user[0], secret_key)
            res.status(200).send({message: 'login success', user, token})
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },
    allUsers: async (req, res) => {
        try {
            const users = await rows(query.GET_ALL_USERS);
            if (users.length === 0) {
                return res.status(404).send({ message: 'users not found' });
            }
            res.status(200).send({ message: 'All users', users });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },
    oneUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await rows(query.GET_USER_BY_ID, id);

            if (user.length === 0) {
                return res.status(404).send({ message: 'User not found!' });
            }
            res.status(200).send({ message: 'User found', user: user[0] });
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const {name, surname, email, password, role} = req.body;

            const updatedUser = await rows(query.UPDATE_USER, id, name, surname, email, password, role);            

            if (updatedUser.length > 0) {
                return res.status(200).send({ message: 'update user', user: updatedUser[0] });
            }
            res.status(400).send({message: 'user not found'})
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;         
    
            if(req.user.user_id == id || req.userIsAdmin) {
                const deleteUser = await rows(query.DELETE_USER, id)
        
                if(deleteUser?.length === 0) {
                    return res.status(400).send({message: 'user not found'})
                }
                return res.status(200).send({message: 'user deleted success'})
            }
            res.status(404).send({message: 'siz ochira olmaysz'})
        } catch (error) {
            console.log(error);
            res.status(403).send({message: error.message})
        }
    }
}

module.exports = userCtrl