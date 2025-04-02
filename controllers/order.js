const OM = require('../models/order');
const mongoose = require('mongoose')

exports.createOrder = async (req, res) => {
    try {
        const product = await mongoose.model('Product').findById(req.body.product);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        if (req.body.quantity > product.stock) {
            return res.status(400).json({
                status: "fail",
                message: `Stock not available. Only ${product.stock} units are available.`,
            });
        }
        if (!req.body.status) {
            req.body.status = 'Pending';
        }
        const createdata = await OM.create(req.body);

        product.stock -= req.body.quantity;
        await product.save();

        res.status(201).json({
            status: "success",
            message: "Order created successfully!",
            createdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};



exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await OM.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $unwind: '$productDetails',
            },
            {
                $addFields: {
                    totalPrice: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'productDetails.category',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            }
        ]);

        res.status(200).json({
            status: "success",
            message: "Orders fetched successfully!",
            data: orders,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.query.userId;

        if (!orderId) {
            return res.status(400).json({
                status: "fail",
                message: "Order ID is required",
            });
        }

        const orders = await OM.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderId),
                    ...(userId && { user: mongoose.Types.ObjectId(userId) }),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
            {
                $addFields: {
                    totalPrice: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'productDetails.category',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            },
        ]);

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: 'Order not found or does not belong to the specified user',
            });
        }

        res.status(200).json({
            status: "success",
            message: "Order fetched successfully!",
            data: orders[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await OM.findById(orderId);

        if (!updatedOrder) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        const product = await mongoose.model('Product').findById(updatedOrder.product);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        if (req.body.quantity > product.stock + updatedOrder.quantity) {
            return res.status(400).json({
                status: "fail",
                message: "Insufficient stock available",
            });
        }

        product.stock += updatedOrder.quantity - req.body.quantity;
        await product.save();

        const updatedData = await OM.findByIdAndUpdate(orderId, req.body, { new: true });

        res.status(201).json({
            status: "success",
            message: "Order updated successfully!",
            updatedData,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        
        const order = await OM.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        const product = await mongoose.model('Product').findById(order.product);

        if (!product) {
            return res.status(404).json({
                status: "fail",
                message: "Product not found",
            });
        }

        product.stock += order.quantity;
        await product.save();

        const deletedOrder = await OM.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: "success",
            message: "Order deleted and stock updated successfully!",
            deletedOrder,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


