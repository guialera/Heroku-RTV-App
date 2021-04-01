const express = require("express")
const issueRoute = express.Router()
const Issue = require("../models/Issue.js")

//Get All

issueRoute.get("/", (req, res, next) => {
    Issue.find((err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//Get All By User

issueRoute.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//Post One

issueRoute.post("/", (req, res, next) => {
    req.body.user = req.user._id,
        req.body.username = req.user.username
    const newIssue = new Issue(req.body)
    newIssue.save((err, issue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

//Update Issue

issueRoute.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(200).send(updatedIssue)
        }
    )
})

//Upvote Issue

issueRoute.put("/upvote/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        {
            $inc: { votes: 1 },
            $push: { voted: req.user._id }
        },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(200).send(updatedIssue)
        }
    )
})

//Downvote Issue

issueRoute.put("/downvote/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        {
            $inc: { votes: -1 },
            $pull: { voted: req.user._id }
        },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                next(err)
            }
            return res.status(200).send(updatedIssue)
        }
    )
})

//Delete Issue

issueRoute.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({ _id: req.params.issueId, user: req.user._id }, (err, deletedIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedIssue)
    })
})

module.exports = issueRoute