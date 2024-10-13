const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const userRouter = require('./src/router/userRouter');
const quizzRouter = require('./src/router/quizzRouter')
const questionsRouter = require('./src/router/questionsRouter')

const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cors());

app.use('/user', userRouter);
app.use('/quizz', quizzRouter);
app.use('/questions', questionsRouter)

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`))