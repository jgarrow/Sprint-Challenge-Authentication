const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userScheme = require('../api/usersModel');

router.post('/register', (req, res) => {
    // implement registration
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    userScheme
        .createUser(credentials)
        .then((response) => res.status(201).json(response))
        .catch((err) =>
            res.status(500).json({ message: `Error creating account` })
        );
});

router.post('/login', (req, res) => {
    // implement login
    const { username, password } = req.body;

    userScheme
        .findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: `Invalid login credentials` });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: `Error logging in ${username}` })
        );
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.send('Error logging out');
            } else {
                res.send('Goodbye!');
            }
        });
    }
});

module.exports = router;
