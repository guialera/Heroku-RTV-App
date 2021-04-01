const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username:{
        type: String,
        ref: "User",
        required: true
    },
    issueId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)