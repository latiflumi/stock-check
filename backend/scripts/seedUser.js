import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';
import { connectDB } from '../config/db.js';
connectDB();

console.log('usr', process.env.DEMO_USER)
console.log('pw', process.env.DEMO_PASSWORD)

const username = process.env.DEMO_USER;
const password = process.env.DEMO_PASSWORD;

const user = await User.create({
    username,
    password
})

console.log('User created', user)
process.exit();