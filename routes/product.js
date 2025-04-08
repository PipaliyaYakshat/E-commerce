const express = require('express');
const router = express.Router();
const PC = require('../controllers/product');
const multer = require('multer');
const path = require('path');

// Ensure public/images folder exists
const fs = require('fs');
const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.array('image', 10), PC.createData);
router.get('/find/:id', PC.oneproduct);
router.get('/', PC.allProducts);
router.get('/catid/:id', PC.allcategory);
router.get('/search', PC.searchProducts);
router.patch('/:id', PC.updateProduct);
router.delete('/:id', PC.deleteProduct);

module.exports = router;
