const router = require('express').Router();
const userController = require('../controller/user_controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure multer to store uploaded files in the 'uploads' directory

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/upload-image', upload.single('image'), userController.uploadImage);
router.get('/image-locations', userController.getAllImageLocationsAndSeverity); // New route

module.exports = router;