const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var path = require('path');

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
mongoose.connect('mongodb://localhost/pet_shelter', { useNewUrlParser: true });

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: [3, "Name needs to be at least 3 characters."],
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Type is required.'],
        minlength: [3, "Type needs to be at least 3 characters."]
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minlength: [3, "Descirption needs to be at least 3 characters."]
    },
    skill_1: {
        type: String,
        default: ''
    },
    skill_2: {
        type: String,
        default: ''
    },
    skill_3: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
PetSchema.plugin(uniqueValidator, {message: "Name already exists"});

const Pet = mongoose.model('Pet', PetSchema);

// GET: Retrieve all Pets
app.get('/allpet', function(req, res){
    Pet.find({}, function(err, pets){
        if(err){
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
           res.json({message: 'All Pets:', data: pets})
        }
     }).sort({'type':1});
});

// GET: Retrieve a Pet by ID
app.get('/allpet/:id', function(req, res){
    Pet.findOne({ _id: req.params.id }, function(err, pet){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'Pet:', data: pet})
        }
    });
});

// POST: Create a Pet
app.post('/allpet', function(req, res){
    {this.unique= true};
    var newPet = new Pet();
    newPet.name = req.body.name;
    newPet.type = req.body.type;
    newPet.description = req.body.description;
    newPet.skill_1 = req.body.skill_1;
    newPet.skill_2 = req.body.skill_2;
    newPet.skill_3 = req.body.skill_3;
    newPet.likes = req.body.likes;
    newPet.save(function(err, pet){
        if (err) {
            const errors=[]
            const errorObj = err['errors']
            for (var errKey in errorObj){
                errors.push(errorObj[errKey]['message'])
            }
            res.json({message: 'Error', error: errors})
        } else {
            res.json({message: 'New Pet:', data: pet})
        }
    });
});

// PUT: Update a Pet by ID
app.put('/allpet/:id', function(req, res){
    Pet.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name, type: req.body.type, description: req.body.description, skill_1: req.body.skill_1, skill_2: req.body.skill_2, skill_3: req.body.skill_3 },{runValidators: true, context: 'query'}, function (err, pet) {
        if (err) {
            const errors=[]
            const errorObj = err['errors']
            for (var errKey in errorObj){
                errors.push(errorObj[errKey]['message'])
            }
            res.json({message: 'Error', error: errors})
        } else {
            res.json({message: 'Updated Pet:', data: pet})
        }
    });
});

// DELETE: Delete a Pet by ID
app.delete('/allpet/:id/', function(req, res){
    Pet.remove({ _id: req.params.id }, function(err){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            Pet.find({}, function(err, pets){
                if(err){
                    console.log('*********************');
                    console.log('Returned Error: ', err);
                    res.json({message: 'Error', error: err})
                }
                else {
                   res.json({message: 'Deletion Successful:', data: pets})
                }
            });
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function () {
    console.log('listening on port 8000');
});