import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    let decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    req.userId = decodedData.id;

    next();
  } catch (error) {
    console.log(
      chalk.red(`[${new Date().toLocaleTimeString()} ]`),
      chalk.blue('AUTH'),
      chalk.yellow('FAILED'),
      chalk.red('401'),
      chalk.magenta('UNAUTHORIZED')
    );
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;
