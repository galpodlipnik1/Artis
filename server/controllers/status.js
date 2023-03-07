import mongoose from 'mongoose';
import ping from 'ping';

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
