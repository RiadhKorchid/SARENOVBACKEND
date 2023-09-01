import Order from '../models/Order.js'; // Assuming the path is correct

// POST /api/orders
const createOrder = async (req, res) => {
    try {
        const { services, clientEmail, totalPrice ,date} = req.body;
        const orderCount = await Order.countDocuments();
        const paddedNumber = String(orderCount + 1).padStart(5, '0');
        const orderId = paddedNumber.toString()
        const order = new Order({
            orderId: orderId,
            services,
            clientEmail,
            totalPrice, 
            date
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
};

// GET /api/orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()// Populate client details

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
};

// GET /api/orders/:orderId
const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId).populate('clientId', 'name email'); // Populate client details

        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the order.' });
    }
};

export { createOrder, getAllOrders, getOrderById };