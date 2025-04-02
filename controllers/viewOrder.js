const VM = require('../models/viewOrder')

exports.createViewOrder = async (req, res) => {
    try {
        if (!req.body.status) {
            req.body.status = 'Pending';
        }
        const createdata = await VM.create(req.body)

        res.status(201).json({
            status: "success",
            message: "User created successfully !",
            createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};


exports.getAllViewOrders = async (req, res) => {
    try {
        const viewOrders = await VM.find().populate('user').populate('order').populate('payment');
        res.status(201).json({
            status: "success",
            message: "User views successfully !",
            viewOrders
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};


exports.getViewOrderById = async (req, res) => {
    try {
        const viewOrder = await VM.findById(req.params.id).populate('user').populate('order').populate('payment');
        if (!viewOrder) {
            return res.status(404).json({ message: 'ViewOrder not found' });
        }
        res.status(201).json({
            status: "success",
            message: "User view successfully !",
            viewOrder
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};


exports.updateViewOrder = async (req, res) => {
    try {
        const viewOrderupdate = await VM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!viewOrder) {
            return res.status(404).json({ message: 'ViewOrder not found' });
        }
        res.status(201).json({
            status: "success",
            message: "User update successfully !",
            viewOrderupdate
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};


exports.deleteViewOrder = async (req, res) => {
    try {
        const viewOrderdelete = await VM.findByIdAndDelete(req.params.id);
        if (!viewOrder) {
            return res.status(404).json({ message: 'ViewOrder not found' });
        }
        res.status(201).json({
            status: "success",
            message: "User delete successfully !",
            viewOrderdelete
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};