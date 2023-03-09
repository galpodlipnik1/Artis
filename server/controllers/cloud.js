import chalk from "chalk";
import cloudModel from "../models/cloud.js";

export const getCloudImages = async (req, res) => {
  try {
    const cloudImages = await cloudModel.find({ owner: req.userId });
    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] GET /cloud/, ${cloudImages.length }`));
    res.status(200).json(cloudImages);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] GET /cloud/, ${error.message}`));
    res.status(404).json({ message: error.message });
  }
};

export const createCloudImage = async (req, res) => {
  try {
    const { name, data, } = req.body;

    const newCloudImage = cloudModel.create({
      name,
      image: data,
      owner: req.userId,
    });

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] POST /cloud/`));
    res.status(201).json(newCloudImage);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] POST /cloud/, ${error.message}`));
    res.status(409).json({ message: error.message });
  }
};

export const getCloudImage = async (req, res) => {
  try {
    const cloudImage = await cloudModel.findById(req.params.id);

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] GET /cloud/${req.params.id}`));
    res.status(200).json(cloudImage);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] GET /cloud/${req.params.id}, ${error.message}`));
    res.status(404).json({ message: error.message });
  }
};

export const deleteCloudImage = async (req, res) => {
  try {
    const cloudImage = await cloudModel.findByIdAndDelete(req.params.id);

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] DELETE /cloud/${req.params.id}`));
    res.status(200).json(cloudImage);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] DELETE /cloud/${req.params.id}, ${error.message}`));
    res.status(404).json({ message: error.message });
  }
};