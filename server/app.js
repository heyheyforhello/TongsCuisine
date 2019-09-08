const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/clinic';
const Patient = require('./model/patient');
const Clinician = require('./model/clinician');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/api/patient/', (req, res) => {
    mongoose.connect(url, function(err) {
        if(err) throw err;
        Patient.find({},
            function(err, patients){
                return res.status(200).json({
                    stutus: 'success',
                    patient: patients,
                })
            })
    }
    )
})

app.post('/api/clinician/login', (req, res) => {
    mongoose.connect(url,{ useMongoClient:true}, function(err){
        if(err) throw err;
        Clinician.find({
            username : req.body.username, password : req.body.password
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){  
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})


app.listen(3000, () => console.log('clinic server running on port 3000!'))
