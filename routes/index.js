var express = require('express');
var router = express.Router();

// Simulated user data (replace with a database in a real application)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];

router.get('/', function(req, res) {
    if (req.session.username) {
        res.redirect('/home');
    } else {
        res.render('login', { title: 'Login', errorMessage: '' });
    }
});

router.post('/login', function(req, res) {
    const { username, password } = req.body;

    // Check if the provided username and password match predefined values
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.username = username;
        res.redirect('/home');
    } else {
        res.render('login', { title: 'Login', errorMessage: 'Incorrect username or password' });
    }
});

router.get('/home', function(req, res) {
    if (req.session.username) {
        res.render('home', { title: 'Home', username: req.session.username });
    } else {
        res.redirect('/');
    }
});

router.post('/logout', function(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}); 

module.exports = router;

