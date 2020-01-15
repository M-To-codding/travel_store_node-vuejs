module.exports = (mongoose, uniqueValidator) => {

  const jwt = require('jsonwebtoken');

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
      isAdmin: Boolean
    },
    {
      timestamps: true
    });

  // UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});


  UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
  }


  mongoose.model('User', UserSchema);

}