const PM = require('../models/product')

exports.createData = async (req, res) => {

    try {
        const product = req.body;

        if (!product) {
            return res.status(404).json({ error: 'Data is not found' });
        }


        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            product.image = fileNames;
        }

        await PM.create(product);
        res.status(201).json({
            status: "success",
            message: "Data created successfully",
            data: product,
        });

    } catch (error) {

        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allProducts = async (req, res) => {
    try {

        const viewalldata = await PM.find().populate([
            { path: 'name' },
            { path: 'category' }
        ]);

        res.status(201).json({
            status: "success",
            message: "Data read successfully",
            data: viewalldata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.oneproduct = async (req, res) => {
    try {
        const productdata = await PM.findById(req.params.id).populate([
            { path: 'name' },
            { path: 'category' }
        ]);
        if (!productdata) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data read successfully",
            data: productdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const updatedata = await PM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedata) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data update successfully",
            data: updatedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};



exports.deleteProduct = async (req, res) => {
    try {
        const deletedata = await PM.findByIdAndDelete(req.params.id);
        if (!deletedata) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data delete successfully",
            data: deletedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

