module.exports = (mongoose) => {
    require('dotenv').config();
    mongoose.set('useCreateIndex', true);

    mongoose.connect(process.env.DB_HOST,
        {
            // dbName: process.env.DB_NAME,
            // user: process.env.DB_USER,
            password: process.env.DB_PASS,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('db connected!'));

    require('./../models/User')(mongoose);
    require('./../models/Token')(mongoose);

}