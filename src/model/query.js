

const CHEC_USER = `select email from users where email = $1`;

const SIGNUP = `insert into users (name, surname, email, password, role) values ($1, $2, $3, crypt($4, gen_salt('bf')), coalesce($5::user_role, 'user'::user_role)) returning user_id, name, surname, email, role`;

const LOGIN = `select user_id, name, surname, email, role from users where email = $1 and password = crypt($2, password)`;

const GET_ALL_USERS = `select user_id, name, surname, email, role from users where role = 'user'`;

const GET_USER_BY_ID = `select user_id, name, surname, email, role from users where user_id = $1`

const UPDATE_USER = `update users set name = coalesce($2, name), surname = coalesce($3, surname), email = coalesce($4, email), password = coalesce(crypt($5, gen_salt('bf')), password), role = coalesce($6::user_role, role) where user_id = $1 returning user_id, name, surname, email, role`;

const DELETE_USER = `delete from users where user_id = $1`;

// quizz

const CREATE_QUIZZ = `insert into quizz (title, quesstions_count, quizz_time, level) values ($1, $2, $3, $4) returning *`;

const ALL_QUIZZ =  `select * from quizz`;
const ONE_QUIZZ = `select * from quizz where quizz_id = $1`;
// const DELETE_QUIZZ = `DELETE FROM questions USING quizz WHERE questions.quizz_id = quizz.quizz_id AND quizz.quizz_id = $1 RETURNING *`;
const DELETE_QUIZZ = `delete from quizz where quizz_id = $1 returning *`;
const DELET_QUESTIONS = `delete from questions where quizz_id = $1`;

const UPDATE_QUIZZ = `update quizz set title = coalesce($2, title), quesstions_count = coalesce($3, quesstions_count), quizz_time = coalesce($4, quizz_time), level = coalesce($5, level) where quizz_id = $1 returning *`;

// questions

const CREATE_QUESTIONS = `insert into questions (text, option1, option2, option3, option4, answer, quizz_id) values ($1, $2, $3, $4, $5, $6, $7) returning *`;

const ALL_QUESTIONS = `select * from questions`;
const ONE_QUESTION = `select * from questions where question_id = $1`;
const DELETE_QUESTION = `delete from questions where question_id = $1 returning *`;

module.exports = {CHEC_USER, SIGNUP, GET_ALL_USERS, GET_USER_BY_ID, LOGIN, UPDATE_USER, CREATE_QUIZZ, ALL_QUIZZ, ONE_QUIZZ, DELETE_QUIZZ, DELETE_USER, DELET_QUESTIONS, UPDATE_QUIZZ, CREATE_QUESTIONS, ALL_QUESTIONS, ONE_QUESTION, DELETE_QUESTION}