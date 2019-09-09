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
                // sort the patients data
                patients.sort((p1, p2) => {
                    let p1Length = p1.attack.length;
                    let p2Length = p2.attack.length;
                    // Always put the empty list to bottom
                    if(p1Length === 0) {return 1;}
                    else if (p2Length === 0) {return -1;}

                    return p1.attack[p1Length-1].time - p2.attack[p2Length-1].time}
                )
                
                return res.status(200).json({
                    stutus: 'success',
                    patient: patients,
                })
            })
    }
    )
});

app.post('/api/clinician/login', (req, res) => {
    mongoose.connect(url, function(err){
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
});

app.post('/api/patient-details', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        //console.log(req.body.username);
        Patient.find({
            username : req.body.username
        },function(err, patient){
            if(err) throw err;
            //console.log(patient);
            if(patient.length ===1){
                return res.status(200).json({
                    status: 'success',
                    data: patient
                })
            } else{
                return res.status(200).json({
                    status:'fail',
                    message: 'Failed'
                })
            }
        })
    })
})
app.post('/api/add-attack',(req, res)=>{
    mongoose.connect(url, function(err){
        if(err) throw err;
        Patient.findOneAndUpdate(
            {username: req.body.username},
            {$push: {attack: req.body.attack}},
            function (error, success){
                if (error) {
                    console.log(error);
                    return res.status(200).json({
                        status: 'fail',
                        data: patient
                    })
                } else{
                    console.log(success);
                    return res.status(200).json({
                        status:'success',
                        data: success
                    })
                }
            });
    })
})
app.post('/api/attack-update',(req, res)=>{
    mongoose.connect(url, function(err){
        if(err) throw err;
        Patient.update(
            { username: 'roy2' },
            { $set: { "attack.$[element]" : {time: new Date(), location: 'outside'} } },
            { multi: true,
              arrayFilters: [ { "element.time": { $eq: new Date("2008-09-08T20:01:00.364Z") } } ]
            },
            function (error, success){
                if (error) {
                    console.log(error);
                    return res.status(200).json({
                        status: 'fail',
                        data: patient
                    })
                } else{
                    console.log(success);
                    return res.status(200).json({
                        status:'success',
                        data: success
                    })
                }
            });
    })
})



app.listen(3000, () => console.log('clinic server running on port 3000!'))
