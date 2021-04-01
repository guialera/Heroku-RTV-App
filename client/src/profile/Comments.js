import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext.js"

function Comments(props) {
    const [showDeleteButton, setShowDeleteButton] = useState(true)

    const { user, deleteCommentByUser } = useContext(AppContext)

    const { username, comment, _id } = props

    React.useEffect(() => {
        deleteButtonShow()
    }, [])

    function deleteButtonShow() {
        if (user.username === username) {
            setShowDeleteButton(true)
        } else if (user.username !== username) {
            setShowDeleteButton(false)
        }
    }

    function deleteComment(event) {
        event.preventDefault()
        console.log(_id)
        deleteCommentByUser(_id)
    }

    return (
        <div>
            {`${username}: ${comment}`}
            <button className="deleteCommentBtn" onClick={deleteComment} style={{ display: showDeleteButton ? "block" : "none" }}>Delete Comment</button>
        </div>
    )
}

export default Comments