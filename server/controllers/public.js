import chalk from 'chalk';

import PublicModel from '../models/public.js';
import CloudModel from '../models/cloud.js';

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
        const res = await CloudModel.findById(publicImage.image);
        const { name, image, owner } = res;
        return {
          name,
          image,
          owner,
          createdAt: publicImage.createdAt,
          likes: publicImage.likes,
          id: publicImage._id
        };
      })
    );

    res.status(200).json({ populatedImages, publicImagesCount });
  } catch (error) {
    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[GET]`),
      chalk.yellow(`[PUBLIC IMAGES]`),
      chalk.red(`[FAILED]`),
      error.message
    );
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

    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[POST]`),
      chalk.yellow(`[PUBLIC IMAGE]`),
      chalk.red(`[SUCCESS]`)
    );
    res.status(200).json(publicImage);
  } catch (error) {
    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[POST]`),
      chalk.yellow(`[PUBLIC IMAGE]`),
      chalk.red(`[FAILED]`)
    );
    res.status(500).json({ message: error.message });
  }
};

export const updatePublicImage = async (req, res) => {
  const { likes } = req.body;
  const { id } = req.params;

  try {
    const updatedPublicImage = await PublicModel.findByIdAndUpdate(id, { likes }, { new: true });

    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[PUT]`),
      chalk.yellow(`[PUBLIC IMAGE]`),
      chalk.red(`[SUCCESS]`)
    );
    res.status(200).json(updatedPublicImage);
  } catch (error) {
    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[PUT]`),
      chalk.yellow(`[PUBLIC IMAGE]`),
      chalk.red(`[FAILED]`)
    );
    res.status(500).json({ message: error.message });
  }
};

export const deletePublicImage = async (req, res) => {
  const { id } = req.params;
  const cloudId = id;
  try {
    const cloudImage = await CloudModel.findById(cloudId);
    const publicImage = await PublicModel.findOneAndDelete({ image: cloudImage._id });

    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[DELETE]`),
      chalk.yellow(`[PUBLIC IMAGE]`),
      chalk.red(`[SUCCESS]`)
    );
    res.status(200).json(publicImage);
  } catch (error) {
    console.log(
      chalk.green(`[${new Date().toLocaleTimeString()}]`),
      chalk.blue(`[DELETE]`),
      chalk.yellow(`[PUBLIC IMAGE]`),
      chalk.red(`[FAILED]`)
    );
    res.status(500).json({ message: error.message });
  }
};
