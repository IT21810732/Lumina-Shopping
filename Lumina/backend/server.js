const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

require("dotenv").config();

const PORT = process.env.PORT || 8070;

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection successful");
});

const UserModel = require('./models/User');

const shopRouter = require("./routes/shops.js");
const managerRouter = require("./routes/managers.js");
const empRouter = require("./routes/semployee.js");
const cartRouter = require("./routes/carts.js");
const booking = require('./routes/booking');

app.use("/shop", shopRouter);
app.use("/manager", managerRouter);
app.use("/employees", empRouter);
app.use("/cart",cartRouter);
app.use('/api', booking);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password: hashedPassword });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Received email:', email);
    console.log('Received password:', password);

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ Login: false, Message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ Login: false, Message: "Invalid password" });
        }

        const accessToken = jwt.sign({ email: email },
            process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email: email },
            process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '5m' });

        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        res.cookie('refreshToken', refreshToken,
            { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' });

        return res.json({ Login: true, role: user.role });
    } catch (error) {
        console.error('An error occurred while logging in:', error);
        return res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

const verifyUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        if (renewToken(req, res)) {
            next();
        }
    } else {
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Token" });
            } else {
                try {
                    const user = await UserModel.findOne({ email: decoded.email });
                    if (!user) {
                        return res.json({ valid: false, message: "User not found" });
                    }
                    req.email = decoded.email;
                    req.role = user.role;
                    next();
                } catch (error) {
                    console.error('Error fetching user from database:', error);
                    return res.status(500).json({ error: 'An error occurred while verifying user' });
                }
            }
        });
    }
};

const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    let exist = false;
    if (!refreshToken) {
        return res.json({ valid: false, message: "No Refresh token" });
    } else {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: "Invalid Refresh Token" });
            } else {
                const accessToken = jwt.sign({ email: decoded.email },
                    process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
                res.cookie('accessToken', accessToken, { maxAge: 60000 });
                exist = true;
            }
        });
    }
    return exist;
};

app.get('/', verifyUser, (req, res) => {
    if (req.role === 'visitor') {
        return res.json({ valid: true, message: "authorized for visitors" });
    } else if (req.role === 'shop_owner') {
        return res.json({ valid: true, message: "authorized for shop owners" });
    } else if (req.role === 'product_manager') {
        return res.json({ valid: true, message: "authorized for product managers" });
    } else if (req.role === 'employee_manager') {
        return res.json({ valid: true, message: "authorized for employee managers" });
    } else {
        return res.status(403).json({ error: 'Forbidden' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
