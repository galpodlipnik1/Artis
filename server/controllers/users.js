import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';

import UserModel from '../models/users.js';

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'User does not exist.' });

    const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    console.log(
      chalk.green.bold(
        `[${new Date().toLocaleString()}] POST /user/signin ${existingUser.email} signed in.`
      )
    );
    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] POST /user/signin ${error}`));
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await UserModel.create({
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { email: user.email, id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    console.log(
      chalk.green.bold(
        `[${new Date().toLocaleString()}] POST /user/signup ${user.email} signed up.`
      )
    );
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] POST /user/signup ${error}`));
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist.' });

    console.log(
      chalk.green.bold(`[${new Date().toLocaleString()}] GET /user/${id} ${user.name} retrieved.`)
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] GET /user/${id} ${error}`));
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(
      chalk.green.bold(
        `[${new Date().toLocaleString()}] GET /user ${users.length} users retrieved.`
      )
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] GET /user ${error}`));
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) return res.status(404).json({ message: 'User does not exist.' });

    console.log(
      chalk.green.bold(`[${new Date().toLocaleString()}] PATCH /user/${id} ${user.name} updated.`)
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] PATCH /user/${id} ${error}`));
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist.' });

    await UserModel.findByIdAndDelete(id);

    console.log(
      chalk.green.bold(`[${new Date().toLocaleString()}] DELETE /user/${id} ${user.name} deleted.`)
    );
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] DELETE /user/${id} ${error}`));
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
