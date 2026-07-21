const cron = require("node-cron");
const TemporaryUpload = require("../models/TemporaryUpload");
const { deleteFromCloudinary, logCloudinaryOperation } = require("./uploadService");

const runCleanup = async () => {
  const startTime = Date.now();
  logCloudinaryOperation("cleanup", "success", { message: "Cleanup started" });

  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const expiredUploads = await TemporaryUpload.find({ uploadedAt: { $lt: cutoff } });

    let totalDeleted = 0;
    const batchSize = 50;

    for (let i = 0; i < expiredUploads.length; i += batchSize) {
      const batch = expiredUploads.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (upload) => {
          try {
            await deleteFromCloudinary(upload.publicId, {
              founderEmail: upload.uploadedBy,
              message: "Cleanup of expired temporary upload"
            });
            await TemporaryUpload.findByIdAndDelete(upload._id);
            totalDeleted++;
          } catch (err) {
            console.error(`Failed to clean up expired upload: ${upload.publicId}`, err);
          }
        })
      );
    }

    const duration = Date.now() - startTime;
    logCloudinaryOperation("cleanup", "success", {
      message: `Cleanup completed. Files deleted: ${totalDeleted}. Duration: ${duration}ms`
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logCloudinaryOperation("cleanup", "failure", {
      error,
      message: `Cleanup failed after ${duration}ms`
    });
  }
};

const startCleanupScheduler = () => {
  // Run hourly
  cron.schedule("0 * * * *", () => {
    runCleanup().catch((err) => console.error("Error running cleanup scheduler:", err));
  });
  console.log("Cleanup scheduler initialized successfully (running hourly).");
};

module.exports = {
  startCleanupScheduler,
  runCleanup,
};
