module.exports = (mongoose) => {
    require('dotenv').config();
    mongoose.set('useCreateIndex', true);

    mongoose.connect(process.env.DB_HOST,
        {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('db connected!'));

    require('./../models/User')(mongoose);

}