module.exports = (mongoose) => {

  let MediaFileSchema = new mongoose.Schema({
      fileName: String,
      path: String,
      fileType: String,
      authorName: String,
      authorId: String,
    },
    {
      timestamps: true
    });

  mongoose.model('MediaFile', MediaFileSchema);
};
