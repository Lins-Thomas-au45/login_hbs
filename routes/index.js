var express = require('express');
var router = express.Router();


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

    // Checking for password and username
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.username = username;//using session for storing username
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

