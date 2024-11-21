const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Ota käyttöön CORS, JSON-käsittely ja body-parser
app.use(cors());
app.use(bodyParser.json());

// Aseta JSON-tiedoston polku
const DATA_FILE = path.join(__dirname, 'data/games.json');
//const USERS_FILE = path.join(__dirname, 'data/users.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Käyttäjänimi ja salasana ovat pakollisia.' });
    }

// Lue olemassa olevat käyttäjät
fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
        console.error('Virhe luettaessa käyttäjätietoja:', err);
        return res.status(500).json({ message: 'Palvelinvirhe.' });
    }

    let users;
    try {
        users = JSON.parse(data || '[]'); // Jos tiedosto on tyhjä, käytä oletuksena tyhjää taulukkoa
    } catch (parseErr) {
        console.error('Virhe parsittaessa käyttäjätietoja:', parseErr);
        return res.status(500).json({ message: 'Tietojen käsittely epäonnistui.' });
    }

    /*/ Tarkista, onko käyttäjänimi jo olemassa
    if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: 'Käyttäjänimi on jo käytössä.' });
    }*/

    // Lisää uusi käyttäjä
    const newUser = { username, password }; // Salasanojen suojaus tulee lisätä tuotantokäyttöön
    users.push(newUser);

    // Tallenna päivitetty käyttäjälista
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Virhe tallentaessa käyttäjätietoja:', writeErr);
            return res.status(500).json({ message: 'Palvelinvirhe tallentaessa tietoja.' });
        }

        res.status(201).json({ message: 'Rekisteröinti onnistui!' });
    });
});
});

// Palauta games.json-tiedoston sisältö
app.get('/data/games.json', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Virhe luettaessa tiedostoa:', err);
            return res.status(500).send('Virhe tiedoston lataamisessa.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Päivitä games.json-tiedosto
app.put('/data/games.json', (req, res) => {
    const updatedData = req.body;

    // Tallenna JSON-tiedosto
    fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Virhe tallentaessa tiedostoa:', err);
            return res.status(500).send('Virhe tiedoston tallentamisessa.');
        }
        res.send('Data päivitetty onnistuneesti.');
    });
});

// Palvele index.html suoraan
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'edit.html'));
});

app.get('/snake', (req, res) => {
    res.sendFile(path.join(__dirname, 'matopeli/snake.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Palvele staattiset tiedostot (esim. script.js)
app.use(express.static(__dirname));

// Käynnistä palvelin
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
