const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({

    shopid:{
        type : String, 
        required: true
    },
    shopname:{
        type : String,
        required: true
    },
    category:{
        type : String,
        required: true
    },
    phone:{
        type : Number,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    shopownerid:{
        type : String, 
        required: true
    },
    shopownername:{
        type : String,
        required: true
    },
    rentaltimeperiod:{
        type : Number,
        required: true
    },
    rentalprice:{
        type : Number, 
        required: true
    }

});

const Manager = mongoose.model("Manager",managerSchema);

module.exports = Manager;
