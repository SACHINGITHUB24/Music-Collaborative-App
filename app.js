const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const path  = require('path');
const startuser = require('./views/models/start')



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());


app.get('/',function(req,res){
    res.render('welcome')
})
app.post('/start', async function(req,res){
    let {name} = req.body;
    let startuser1 = await startuser.create({
        name : name,
    });
    res.redirect('/room')

})
app.get('/room',async function(req,res){
    let starteduser = await startuser.findOne({name: req.body.name});
    res.render('songdata', { starteduser });
    
})
app.listen(3000,function(){
    console.log("Welcome to BeatShare");
    
})