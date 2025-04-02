var express = require('express');
var router = express.Router();
var PC = require('../controllers/product')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.filename)
  }
})

const upload = multer({ storage: storage })

router.post('/', upload.array('image', 2), PC.createData);
router.get('/find/:id', PC.oneproduct)
router.get('/', PC.allProducts)
router.patch('/:id', PC.updateProduct)
router.delete('/:id', PC.deleteProduct)


module.exports = router;
