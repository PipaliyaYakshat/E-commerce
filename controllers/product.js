const PM = require('../models/product');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.createData = async (req, res) => {
    try {
        const product = req.body;

        if (!product) {
            return res.status(400).json({ error: 'Product data is required' });
        }

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
                fs.unlinkSync(file.path);
                return result.secure_url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            product.image = imageUrls;
        }

        const createdProduct = await PM.create(product);

        res.status(201).json({
            status: "success",
            message: "Product created successfully",
            data: createdProduct,
        });

    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({
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
        const updatedFields = req.body;

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
                fs.unlinkSync(file.path); 
                return result.secure_url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            updatedFields.image = imageUrls;
        }

        const updatedProduct = await PM.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({
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


exports.searchProducts = async (req, res) => {
    try {
        let searchQuery = req.query.query?.trim();
        let orderdata;

        if (searchQuery) {
            orderdata = await PM.find({
                productname: { $regex: searchQuery, $options: 'i' }
            });
        } else {
            orderdata = await PM.find();
        }

        res.status(200).json({
            status: "Success",
            message: "Your proudct was found successfully",
            data: orderdata
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.allcategory = async (req, res) => {
    try {
        var catid = req.params.id

        const viewalldata = await PM.find({category:catid}).populate([
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

