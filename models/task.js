const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'The input can\'t be empty'],
        trim : true,
        maxlength : [20, 'The name can\'t have more than 20 chars']
    },
    completed : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Task', TaskSchema)