// Controller to add a new service
import Service from "../models/Service.js";
export const addService = async (req, res) => {
  const { name, description, time, price, imagePublicId } = req.body;

  try {
    const newService = new Service({
      name,
      description,
      time,
      price,
      imagePublicId,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllServices = async (req, res) => {
  console.log("hello")
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller to delete a service by ID

export const deleteService = async (req, res) => {
  const { serviceId } = req.params; // Assuming you pass the service ID as a URL parameter

  try {
    // Find the service by ID and remove it
    const deletedService = await Service.findByIdAndRemove(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(deletedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getServiceById = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await Service.findById(serviceId)
    if (service) {
      res.status(200).json(service)
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
export const updateService = async (req, res) => {
  const { serviceId } = req.params;
  const updateData = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, updateData, {
      new: true, 
    });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
