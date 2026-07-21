const cloudinary = require("../config/cloudinary");

/**
 * Helper to log all Cloudinary operations with context
 */
const logCloudinaryOperation = (action, status, details = {}) => {
  const logData = {
    action, // 'upload' | 'delete' | 'cleanup'
    status, // 'success' | 'failure'
    applicationId: details.applicationId || "N/A",
    founderEmail: details.founderEmail || "N/A",
    publicId: details.publicId || "N/A",
    timestamp: new Date().toISOString(),
    error: details.error ? (details.error.stack || details.error.message || details.error) : undefined,
    message: details.message || ""
  };
  console.log(`[CLOUDINARY_LOG] ${JSON.stringify(logData)}`);
};

/**
 * Uploads a file buffer to Cloudinary using a stream.
 * @param {Buffer} fileBuffer 
 * @param {string} folder 
 * @param {object} logContext 
 * @returns {Promise<object>}
 */
const uploadFromStream = (fileBuffer, folder, logContext = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          logCloudinaryOperation("upload", "failure", {
            ...logContext,
            error,
            message: "Failed to upload stream to Cloudinary"
          });
          return reject(error);
        }
        logCloudinaryOperation("upload", "success", {
          ...logContext,
          publicId: result.public_id,
          message: "Successfully uploaded stream to Cloudinary"
        });
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Deletes a raw resource from Cloudinary.
 * @param {string} publicId 
 * @param {object} logContext 
 * @returns {Promise<object>}
 */
const deleteFromCloudinary = async (publicId, logContext = {}) => {
  if (!publicId) return null;
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    if (result.result === "ok") {
      logCloudinaryOperation("delete", "success", {
        ...logContext,
        publicId,
        message: `Successfully deleted file from Cloudinary: ${JSON.stringify(result)}`
      });
    } else {
      logCloudinaryOperation("delete", "failure", {
        ...logContext,
        publicId,
        error: result,
        message: `Cloudinary delete response was not ok: ${JSON.stringify(result)}`
      });
    }
    return result;
  } catch (error) {
    logCloudinaryOperation("delete", "failure", {
      ...logContext,
      publicId,
      error,
      message: "Exception occurred while deleting file from Cloudinary"
    });
    throw error;
  }
};

module.exports = {
  uploadFromStream,
  deleteFromCloudinary,
  logCloudinaryOperation
};
