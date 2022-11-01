const express = require('express')
require('dotenv').config();



//packages
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

// database
const connectDB = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.set('trust proxy', 1);



app.use(helmet());
app.use(cors());
app.use(xss());


app.get('/', (req, res) => res.send('Hello World!'))

//  routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);
const userRouter = require('./routes/user');
app.use('/user', userRouter);



const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port , () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();