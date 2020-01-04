module.exports = (mongoose)=>{
    // const User = require('./../models/User');

    const User = mongoose.model('User');

    const user = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        role: 'admin',
        password: 'admin'
    })

    user.save((err)=>{
        mongoose.disconnect();

        if(err) {
            return console.error(err);
        }

        console.log('Saved', user);

    })
}