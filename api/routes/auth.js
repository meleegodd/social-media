const router = require("express").Router()
const User = require("../models/User.js")
const bcrypt = require("bcrypt")

// REGISTER
router.post("/register", async (req, res) => {
    try {
        // Thêm thư viên "bcrypt" để mã hóa password
        // genarate new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // save user and respon
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router