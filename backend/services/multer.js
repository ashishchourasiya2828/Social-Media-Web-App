const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../services/cloudinary');

// Configure Multer to use Cloudinary storage for profile pictures
const profilePictureStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profilePictures', // Specify a folder in your Cloudinary account for profile pictures
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  },
});

const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files are allowed.'));
    }
  },
});

// Configure Multer to use Cloudinary storage for post media
const postMediaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'postMedia', // Specify a folder in your Cloudinary account for post media
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'], // Allowed file formats
  },
});

const uploadPostMedia = multer({
  storage: postMediaStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image and video files are allowed.'));
    }
  },
});

module.exports = {
  uploadProfilePicture,
  uploadPostMedia,
};