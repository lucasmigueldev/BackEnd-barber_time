import express from 'express';
import cors from 'cors';

import createUser from './routes/createUser.js'

import './firebase/firebase.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/createUser', createUser);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});