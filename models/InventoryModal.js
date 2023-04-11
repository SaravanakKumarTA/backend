const mongoose = require('mongoose')

const inventory = new mongoose.Schema({
    company:{type:String, strip:true, required:true},
    photo:{type:String, strip:true, required:true},
    name:{type:String, strip:true, required:true},
    size:{type:String, strip:true, required:true}
})