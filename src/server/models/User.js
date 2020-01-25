module.exports = (mongoose) => {

  let UserSchema = new mongoose.Schema({
      name: {
        type: String,
        lowercase: null,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
      },
      email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
      },

      password: String,
      image: String,
      role: String,
      isAdmin: Boolean,
      chartData: Object
    },
    {
      timestamps: true
    });


  mongoose.model('User', UserSchema);

};
