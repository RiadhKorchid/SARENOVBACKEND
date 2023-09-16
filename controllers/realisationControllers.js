import express from "express";
import Realisation from "../models/Realisation.js";

export async function getAllRealisation(req, res) {
  try {
    const realisations = await Realisation.find();
    return res.status(200).json(realisations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addRealisation(req, res) {
  try {
    const { title, description} = req.body;
    const image = req.file.originalname
    console.log(image)
    const newRealisation = new Realisation({
      title,
      description,
      image,
    });
    const savedRealisation = await newRealisation.save();
    return res.status(201).json(savedRealisation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteRealisation(req, res) {
  const { realisationID } = req.params; // Assuming you pass the realisation ID as a URL parameter
  console.log(realisationID)
  try {
    // Find the realisation by ID and remove it
    const deletedRealisation = await Realisation.findByIdAndRemove(realisationID);

    if (!deletedRealisation) {
      return res.status(404).json({ error: "Realisation not found" });
    }

    return res.json(deletedRealisation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateRealisation(req, res) {
  const { realisationID } = req.params;
  const updateData = req.body;

  try {
    const updatedRealisation = await Realisation.findByIdAndUpdate(realisationID, updateData, {
      new: true,
    });

    if (!updatedRealisation) {
      return res.status(404).json({ message: 'Realisation not found' });
    }

    res.status(200).json(updatedRealisation);
  } catch (error) {
    console.error('Error updating realisation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}