const express = require("express")
const commentRoute = express.Router()
const Comment = require("../models/Comment.js")

//Get All

commentRoute.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// Get All Comments By User

commentRoute.get("/user", (req, res, next) => {
    Comment.find({ user: req.user._id }, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(comments)
    })
})

//Get All Comments By Issue

commentRoute.get("/:issueId", (req, res, next) => {
    Comment.find({ issueId: req.params.issueId }, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(comments)
    })
})

//Post One To Issue

commentRoute.post("/:issueId", (req, res, next) => {
    req.body.user = req.user._id,
    req.body.username = req.user.username,
    issueId = { issueId: req.params.issueId }
    const newComment = new Comment(req.body)
    const addedId = Object.assign(newComment, issueId)
    addedId.save((err, comment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

//Update Comment

commentRoute.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedComment) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(200).send(updatedComment)
        }
    )
})

//Delete One Comment

commentRoute.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete({ _id: req.params.commentId, user: req.user._id }, (err, deletedComment) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedComment)
    })
})

//Delete Comments By Issue

commentRoute.delete("/issue/:issueId", (req, res, next) => {
    Comment.deleteMany({ issueId: req.params.issueId }, (err, deletedComments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedComments)
    })
})

module.exports = commentRoute