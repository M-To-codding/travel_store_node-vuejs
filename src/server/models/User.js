module.exports = (mongoose, uniqueValidator) => {

    let UserSchema = new mongoose.Schema({
            name: {
                type: String,
                lowercase: true,
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
        },
        {
            timestamps: true
        });

    // UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

    mongoose.model('User', UserSchema);

}