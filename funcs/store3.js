
var mysql = require('mysql');
var express = require('express');
var cookie = require('cookie-parser');
var db = require('../controllers/db');

var router = express.Router();

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else if(req.cookies['username'] == "pharmacist"){
		next();
	}
    else{
        res.send("Please login as pharmacist to access this page")
    }
});

router.get('/', function (req, res) {
    db.getallmed(function (err, result) {
        res.render('store3.ejs', { list: result });
    })

});

router.get('/add_med3', function (req, res) {
    res.render('add_med3.ejs');
});


router.post('/add_med3', function (req, res) {
    var name = req.body.name;
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date = req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;

    db.addMed(name, p_date, expire, e_date, price, quantity, function (err, result) {
        res.redirect('/store3');
    });

});

router.get('/edit_med3/:id', function (req, res) {
    var id = req.params.id;
    db.getMedbyId(id, function (err, result) {
        res.render('edit_med3.ejs', { list: result });
    });
});

router.post('/edit_med3/:id', function (req, res) {
    var id = req.params.id;
    db.editmed(id, req.body.name, req.body.p_date, req.body.expire, req.body.e_date, req.body.price, req.body.quantity, function (err, result) {
        res.redirect('/store3');
    });

});

router.get('/delete_med3/:id', function (req, res) {
    var id = req.params.id;
    db.getMedbyId(id, function (err, result) {
        res.render('delete_med3.ejs', { list: result });
    });
});


router.post('/delete_med3/:id', function (req, res) {
    var id = req.params.id;
    db.deletemed(id, function (err, result) {
        res.redirect('/store3');
    });

});


router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchmed(key, function (err, result) {
        res.render('store3.ejs', { list: result });
    });
});

module.exports = router;