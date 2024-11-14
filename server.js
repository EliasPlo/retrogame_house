require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./assets/models/User'); // Ladataan User-malli
const app = express();

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { /*useNewUrlParser: true, useUnifiedTopology: true*/ })
    .then(() => console.log('Yhdistetty MongoDB-tietokantaan'))
    .catch((error) => console.error('Virhe yhdistettäessä MongoDB:hen:', error));

app.use(express.json());
app.use(express.static('public')); // Tarjoaa staattiset tiedostot, kuten HTML, CSS ja JS
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false
}));

// Kirjautumisreitti
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
        req.session.user = { username: user.username, role: user.role };
        res.json({ success: true, message: 'Login successful!', role: user.role });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
});

// Uloskirjautumisreitti
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully.' });
});

// Reitti suojatulle sivulle (admin)
app.get('/admin.html', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
