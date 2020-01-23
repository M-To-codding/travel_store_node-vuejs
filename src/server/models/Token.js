module.exports = (mongoose) => {

  let TokenSchema = new mongoose.Schema({
    userEmail: String,
    tokenKey: String,
    deleted: Boolean,
    expired: String
  });

  mongoose.model('Token', TokenSchema);
};
