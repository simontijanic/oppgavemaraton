const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const greeting = require("../models/greeting");
const User = require("../models/user");

router.post('/register', async (req, res) => {
    console.log(req.body);
    const {username,password} = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.error("user exits")
            return res.render('index');
        }

        const salt = await bcrypt.genSalt(10);
        const hashaPasosord = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashaPasosord });
        await newUser.save();
        
        res.render('index', { message: 'User created successfully' });

    } catch (err) {
        console.error("error registration")
        return res.render('index');
}
});


router.post('/login', async (req, res) => {
    const {username,password} = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.error("user not found")
            return res.render('index');
        }

        const isMatch = bcrypt.compare(password, user.password)
        if (isMatch) {
            req.session.userId = { id: user._id, username: user.username, role: user.role };
            res.redirect('/api/mongo-world');
        } else {
            console.error("wrong passweord")
            return res.render('index');
        }
    } catch (err) {
        console.error("login failed")
        return res.render('index');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.render('index');
});



module.exports = router;
