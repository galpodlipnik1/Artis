import chalk from "chalk";

import presetDimensionsModel from "../models/presetDimentions.js";

export const getPresets = async (req, res) => {
  try {
    const presets = await presetDimensionsModel.find({ $or: [{ owner: req.userId }, { owner: "6409f695c0d9247e878e36cf" }] });

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] GET /dimensions/`));
    res.status(200).json(presets);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] GET /dimensions/`));
    res.status(404).json({ message: error.message });
  }
};

export const createPreset = async (req, res) => {
  try {
    const { name, width, height } = req.body;
    const owner = req.userId;

    const presets = await presetDimensionsModel.find({ $or: [{ owner: req.userId }, { owner: "6409f695c0d9247e878e36cf" }] });

    if (presets.length > 12) {
      res.status(409).json({ message: "You can't have more than 12 presets" });
    };

    const newPreset = await presetDimensionsModel.create({
      name,
      dimensionX: width,
      dimensionY: height,
      owner,
    });

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] POST /dimensions/`));
    res.status(201).json(newPreset);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] POST /dimensions/ ${error.message}`));
    res.status(409).json({ message: error.message });
  }
};

export const getPreset = async (req, res) => {
  try {
    const { id } = req.params;

    const preset = await presetDimensionsModel.findById(id);

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] GET /dimensions/${id}`));
    res.status(200).json(preset);
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] GET /dimensions/${id}`));
    res.status(404).json({ message: error.message });
  }
};

export const deletePreset = async (req, res) => {
  try {
    const { id } = req.params;

    await presetDimensionsModel.findByIdAndRemove(id);

    console.log(chalk.green.bold(`[${new Date().toLocaleString()}] DELETE /dimensions/${id}`));
    res.status(200).json({ message: "Preset deleted successfully." });
  } catch (error) {
    console.log(chalk.red.bold(`[${new Date().toLocaleString()}] DELETE /dimensions/${id}`));
    res.status(404).json({ message: error.message });
  }
};