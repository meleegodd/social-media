const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "https://res.cloudinary.com/meleegod/image/upload/v1672740725/social_media/noAvatar_csvsho.png",
        },
        coverPicture: {
            type: String,
            default: "https://res.cloudinary.com/meleegod/image/upload/v1672754373/social_media/noCover_ulev0k.png",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 50,
        },
        city: {
            type: String,
            max: 50,
        },
        from: {
            type: String,
            max: 50,
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3],
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);