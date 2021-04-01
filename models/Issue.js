const mongoose = require("mongoose")
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        ref: "User",
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    voted: {
        type: Array
    }
})

module.exports = mongoose.model("Issue", issueSchema)