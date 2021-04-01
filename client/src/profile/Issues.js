import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext.js"
import Comments from "../profile/Comments.js"
import CommentsForm from "../forms/CommentsForm.js"
import EditForm from "../forms/EditForm.js"

function Issues(props) {
    const [commentForm, setCommentForm] = useState(false)
    const [buttonsShow, setButtonsShow] = useState(true)
    const [hasVoted, setHasVoted] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const { title, description, username, votes, voted, _id } = props
    const { allComments, upvoteIssue, downvoteIssue, deleteIssue, user } = useContext(AppContext)

    let everyComment = allComments.map(function (each) {
        if (each.issueId === _id) {
            return (
                <Comments
                    username={each.username}
                    comment={each.comment}
                    _id={each._id}
                    key={each._id}
                />
            )
        } else return false
    })

    React.useEffect(() => {
        showButtons()
        checkVoted()
    }, [])

    function upvote() {
        upvoteIssue(_id)
        setHasVoted(true)
    }

    function downvote() {
        downvoteIssue(_id)
        setHasVoted(false)
    }

    function checkVoted() {
        voted.map(function (each) {
            if (each === user._id) {
                setHasVoted(true)
            } /*else if (each !== user._id) {
                setHasVoted(false)
            }*/
        })
    }

    function deleteOneIssue(id) {
        deleteIssue(id)
    }

    function showEditForm() {
        setShowEdit(prevShowEdit => !prevShowEdit)
    }

    function showCommentForm() {
        setCommentForm(prevCommentForm => !prevCommentForm)
    }

    function showButtons() {
        if (user.username === username) {
            setButtonsShow(true)
        } else if (user.username !== username) {
            setButtonsShow(false)
        }
    }

    return (
        <div className="singleIssueDiv">
            <p>{`Posted By: ${username}`}</p>
            <p>{`Votes: ${votes}`}</p>
            <h2>{title}</h2>
            <p>{description}</p>
            <div style={{ display: showEdit ? "block" : "none" }}>
                <EditForm {...props} showEditForm={showEditForm} />
            </div>
            <button className="voteBtn" onClick={upvote} style={{ display: hasVoted ? "none" : "block" }}>Upvote Issue</button>
            <button className="voteBtn" onClick={downvote} style={{ display: hasVoted ? "block" : "none" }}>Downvote Issue</button>
            <div style={{ display: buttonsShow ? "block" : "none" }}>
                <button onClick={() => deleteOneIssue(_id)}>Delete</button>
                <button onClick={() => showEditForm()}>Edit Issue</button>
            </div>
            <button onClick={showCommentForm}>Comment</button>
            <div style={{ display: commentForm ? "block" : "none" }}>
                <CommentsForm issueId={_id} showCommentForm={showCommentForm} />
            </div>
            <h3>Comments:</h3>
            {everyComment}
        </div>
    )
}

export default Issues