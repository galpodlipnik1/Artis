import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();
import userRoutes from './routes/users.js';
import statusRoutes from './routes/status.js';
import dimensionsRoutes from './routes/dimensions.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/user', userRoutes);
app.use('/status', statusRoutes);
app.use('/dimensions', dimensionsRoutes);

app.get('/', (req, res) => {
  const messageJson = {
    message: 'Artis API',
    version: '1.0.0',
    author: 'Gal Podlipnik',
    resTime: new Date().toLocaleString()
  };

  res.status(200).json(messageJson);
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()} ]`),
      chalk.blue('DATABASE'),
      chalk.yellow('CONNECTED'),
      chalk.green('200'),
      chalk.magenta('OK'),
      chalk.cyan(`on port ${PORT}`)
    )
  )
  .finally(() =>
    app.listen(PORT, () =>
      console.log(
        chalk.green(`[${new Date().toLocaleTimeString()} ]`),
        chalk.blue('SERVER'),
        chalk.yellow('STARTED'),
        chalk.green('200'),
        chalk.magenta('OK'),
        chalk.cyan(`on port ${PORT}`)
      )
    )
  )
  .catch((error) => console.log(chalk.red(error.message)));
