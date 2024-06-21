import express from 'express'; //serves as framework to create the API
import cors from 'cors'; // library that allows the setup the rules for the communication btw the front and backend (API requests)
import mongoose from 'mongoose'; // allows to write queries and such to the database (mongoDB)
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file located in the project root
dotenv.config({ path: resolve('../.env') })

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MYACCOUNT_CONNECTION)


app.listen(3001, () => console.log("SERVER STARTED!"));
