import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import customerRoutes from './routes/customer';
import bookingsRoutes from './routes/bookings';
import staffRoutes from './routes/staff';

import lakesRoutes from './routes/lakes';
import { generateNewUser } from './controllers/user';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/lakes', lakesRoutes);
app.use('/customer', customerRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/staff', staffRoutes);

app.get('/', (req, res) => {
	res.send('lake admin Api Home');
});

const dbConnection = process.env.MONGO_URI;

const PORT = process.env.PORT || 5001;

mongoose
	.connect(dbConnection!)
	.then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
	.catch((e) => console.log(e));

// Creates a default user for this account
generateNewUser({
	firstName: 'Fred',
	lastName: 'Jones',
	password: 'cheese',
	email: 'testcase1@gmail.com',
	role: 'admin',
	parentId: '630fa60a75c7b6ae99a4dadb',
	myLakes: [],
	phoneNo: '07557990224',
});
