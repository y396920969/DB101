let path = require('path');
let express = require('express');
let router = express.Router();

let gameFacade = require('../public/javascripts/GameBuildFacade');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' }); // TODO: just test, remove it later
});

router.get('/toolbox', function(req, res, next) {
    res.sendFile(__dirname + '../views/toolbox.html'); // TODO: just test, remove it later
});

router.get('/login', (req, res, next) => {
    res.sendFile(__dirname + '../views/login.html');
});

router.get('/signup', (req, res, next) => {
    res.sendFile(__dirname + '../views/signup.html');
});

router.post('/signup', (req, res, next) => {
    console.log("Server::SignUp(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const id = data['id'];
    const name = data['name'];
    const pw = data['pw'];
    gameFacade.register(id, name, pw).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

router.post("/login", function (req, res, next) {
    console.log("Server::Login(..)");
    const raw = req.body;
    const data = JSON.parse(Object.keys(raw)[0]);
    const username = data['un'];
    const password = data['pw'];
    gameFacade.login(username, password).then((response) => {
        res.status(response.code);
        res.json(response.body);
        console.log(response.code);
    }).catch((err) => {
        res.status(err.code);
        res.json(err.body);
        console.log(err.code);
    });
});

// TODO: implement other functions below
router.get('/update/:game/:kind', (req, res, next) => {
    console.log("Server::updateData(..)");
    const gameID = parseInt(req.params.game);
    const kind = req.params.kind;
    let url = "api-hi";
    console.log(gameID);
    console.log(kind);
    // TODO: add condition, gameID, Champion or Item
    if (kind === "champion") {
        gameFacade.updateChampions(url, gameID);
        console.log("Server::updateChampions() - " + gameID);
    } else if (kind === "item") {
        gameFacade.updateItems(url, gameID);
        console.log("Server::updateItems() - " + gameID);
    }


});

module.exports = router;
