import chalk from "chalk";

import PublicModel from "../models/public.js";
import CloudModel from "../models/cloud.js";

export const getPublicImages = async (req, res) => {
  try {
    const { page } = req.params;

    const publicImages = await PublicModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * 8)
      .limit(8);

    const publicImagesCount = await PublicModel.countDocuments();

    const populatedImages = await Promise.all(
      publicImages.map(async (publicImage) => {
        const { name, image, owner } = await CloudModel.findById(publicImage.image);
        return { name, image, owner, createdAt: publicImage.createdAt };
      })
    );    

    res.status(200).json({ populatedImages, publicImagesCount });
    
  } catch (error) {
    console.log(chalk.green(`[${new Date().toLocaleTimeString()}]`), chalk.blue(`[GET]`), chalk.yellow(`[PUBLIC IMAGES]`), chalk.red(`[FAILED]`));
    res.status(500).json({ message: error.message });
  }
};

export const createPublicImage = async (req, res) => {
  try {
    const { cloudImageId } = req.body;
    const publicImage = await PublicModel.create({
      name: cloudImageId,
      image: cloudImageId,
      owner: cloudImageId
    });

    console.log(chalk.green(`[${new Date().toLocaleTimeString()}]`), chalk.blue(`[POST]`), chalk.yellow(`[PUBLIC IMAGE]`), chalk.red(`[SUCCESS]`));
    res.status(200).json(publicImage);
  } catch (error) {
    console.log(chalk.green(`[${new Date().toLocaleTimeString()}]`), chalk.blue(`[POST]`), chalk.yellow(`[PUBLIC IMAGE]`), chalk.red(`[FAILED]`));
    res.status(500).json({ message: error.message });
  }
};