module.exports = (mongoose) => {
    require('dotenv').config()

    mongoose.connect(
        {
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
        },
        {
            useNewUrlParser: true
        });
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('db connected!'));

}