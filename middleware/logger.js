const mongoose = require('mongoose');



const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    address: {
        type:String
    },
    email: {
        type: String,
        required:true
    },
    joindate: {
        type: Date,
        required: true,
        default: Date.now,
    }
});


module.exports= mongoose.model('Team', teamSchema)