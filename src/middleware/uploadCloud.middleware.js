const uploadToCloudinary = require('../helpers/uploadToCloudinary');

module.exports.uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const result = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = result;
  } catch (error) {
    return next(error);
  }

  next();
};

module.exports.uploadFields = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new Error('No files uploaded');
    }

    const uploadPromises = Object.entries(req.files).map(async ([key, files]) => {
      req.body[key] = [];
      for (const file of files) {
        console.log(file)
        const result = await uploadToCloudinary(file.buffer);
        req.body[key].push(result);
      }
    });

    await Promise.all(uploadPromises);
  } catch (error) {
    return next(error);
  }

  next();
};
