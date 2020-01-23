const bcrypt = require('bcrypt');
const dbActions = require('./../services/db/actions');

module.exports = async (mongoose) => {

  const User = await mongoose.model('User');

  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash('admin', salt);

  const user = new User({
    name: 'Admin',
    email: 'admin@gmail.com',
    role: 'admin',
    password: password,
    isAdmin: true
  })

  await  user.save((err) => {
    mongoose.disconnect();

    if (err) {
      return console.error(err);
    }

    console.log('Saved', user);

  })
}