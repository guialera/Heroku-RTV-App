import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext.js"

function CommentsForm(props) {
    let emptyForm = {
        comment: ""
    }

    const [input, setInput] = useState(emptyForm)

    const { issueId, showCommentForm } = props

    const { postCommentToIssue } = useContext(AppContext)

    function fillIn(event) {
        const { value, name } = event.target
        setInput(prevInput => ({ ...prevInput, [name]: value }))
        console.log(input)
    }

    function submitOneComment(event) {
        event.preventDefault()
        postCommentToIssue(input, issueId)
        setInput(emptyForm)
        showCommentForm()
    }

    return (
        <div>
            <form onSubmit={submitOneComment}>
                <textarea
                    row="10"
                    col="10"
                    type="text"
                    name="comment"
                    value={input.comment}
                    onChange={fillIn}
                />
                <br/>
                <button>Submit Comment</button>
            </form>
        </div>
    )
}

export default CommentsForm