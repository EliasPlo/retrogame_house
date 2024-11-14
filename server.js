require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./assets/models/User'); // Ladataan User-malli
const cors = require('cors');
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
app.use(cors());

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

app.post('/api/register', async (req, res) => {
    const { username, password, role } = req.body;

    // Tarkistetaan, onko käyttäjänimi jo käytössä
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Käyttäjänimi on jo käytössä.' });
    }

    // Luodaan uusi käyttäjä ja tallennetaan tietokantaan
    const newUser = new User({
        username,
        password, // Tässä kohtaa salasana tulee tallentaa salattuna, esimerkiksi bcrypt:lla
        role
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Rekisteröinti onnistui.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Virhe rekisteröinnissä.' });
    }
});

// Uloskirjautumisreitti
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully.' });
});

// Reitti suojatulle sivulle (admin)
/*app.get('/admin.html', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('./login.html');
    }
    next();
});*/

app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
