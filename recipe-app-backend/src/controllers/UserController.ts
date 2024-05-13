import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
    static register = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const userExists = await User.findOne({ username });
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
            res.status(200).json({ token:token,userId:user._id });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default UserController;
