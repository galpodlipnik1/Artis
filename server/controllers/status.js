import mongoose from 'mongoose';
import chalk from 'chalk';
import ping from 'ping';

import PublicModel from '../models/public.js';
import CloudModel from '../models/cloud.js';

export const DbStatus = async (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  if (dbStatus === 1) {
    res.status(200).json({
      status: 'OK',
      message: 'Database connection is alive',
      resTime: new Date().toLocaleString()
    });
  }
  if (dbStatus === 0) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Database connection is dead',
      resTime: new Date().toLocaleString()
    });
  }
};

export const ServerStatus = async (req, res) => {
  const host = '46.19.8.94';
  ping.promise.probe(host).then((response) => {
    if (response.alive) {
      res.status(200).json({
        status: 'OK',
        message: 'Server is alive',
        resTime: new Date().toLocaleString()
      });
    } else {
      res.status(500).json({
        status: 'ERROR',
        message: 'Server is dead',
        resTime: new Date().toLocaleString()
      });
    }
  });
};

export const UserStats = async (req, res) => {
  const { id } = req.params;
  let userStats = {
    numOfPosts: 0,
    numOfLikes: 0
  }
  try {
    const { id } = req.params;
    const cloudPostsArr = await CloudModel.find({ $and: [{ owner: id }, { isPublic: true }] });
    const publicPostsArr = await PublicModel.find();

    cloudPostsArr.forEach((cloudPost) => {
      publicPostsArr.forEach((publicPost) => {
        if (cloudPost._id.toString() === publicPost.owner.toString()) {
          userStats.numOfPosts++;
          userStats.numOfLikes += publicPost.likes.length;
        }
      });
    });

    console.log(chalk.green(`[${new Date().toLocaleTimeString()}]`), chalk.blue(`[GET]`), chalk.yellow(`[USER STATS]`), chalk.red(`[SUCCESS]`) );
    res.status(200).json(userStats);
  } catch (error) {
    console.log(chalk.green(`[${new Date().toLocaleTimeString()}]`), chalk.blue(`[GET]`), chalk.yellow(`[USER STATS]`), chalk.red(`[FAILED]`), error.message );
    res.status(500).json({ message: error.message });
  }
};
