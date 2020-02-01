const bcrypt = require('bcrypt');
const dbActions = require('./../services/db/actions');

module.exports = async (mongoose) => {
  const User = await mongoose.model('User');
  let email = 'admin@gmail.com';
  let admin = await User.findOne({ email: email });

  if(admin) {
    return;
  }


  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash('admin', salt);

  const user = new User({
    name: 'Admin',
    email: email,
    role: 'admin',
    password: password,
    isAdmin: true
  })

  await  user.save((err) => {
    // mongoose.disconnect();

    if (err) {
      return console.error(err);
    }

    console.log('Saved', user);

  })
}