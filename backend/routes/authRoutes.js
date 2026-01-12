import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '../utils/getJWTSecret.js';


const router = express.Router();

// @route           POST api/auth/login
// @description     Authenticate user
// @access          Public

router.post('/login', async(req, res, next)=>{
    try {
        const {username, password} = req.body;

        if(!username || !password){
            res.status(400);
            throw new Error('Username and password is required')
        }
        // Find user

        const user = await User.findOne({username});

        if(!user){
            res.status(401);
            throw new Error('Invalid credentials');
        }
        // Check if the password matches

        const isMatch = await user.matchPassword(password);
        
        if(!isMatch){
            res.status(401);
            throw new Error('Invalid credentials');
        }

        const payload = {userId: user._id.toString()};
        const accessToken = await generateToken(payload, '1m');
        const refreshToken = await generateToken(payload, '30d');

        // Set refresh token in HTTP-Only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            accessToken,
            user: {
                id: user._id,
                username:username
            }
        })

    } catch (err) {
        console.log(err);
        next(err);
    }
})

// @route           POST api/auth/refresh
// @description     Generate new access Token from refreshToken
// @access          Public (Needs to have a valid refresh token in cookie)

router.post('/refresh', async(req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;
        console.log('refreshing token...')

        if(!token){
            res.status(401);
            throw new Error('No refresh token')
        }

        const { payload } = await jwtVerify(token, JWT_SECRET);

        const user = await User.findById(payload.userId)

        if(!user){
            res.status(401);
            throw new Error('No user')
        }

        const newAccessToken = await generateToken({userId: user._id.toString()},
        '1m');

        res.json({
            accessToken: newAccessToken,
            user:{
                id:user._id,
                username: user.username
            }
        })
    } catch (err) {
        res.status(401);
        next(err);
    }
})



export default router;