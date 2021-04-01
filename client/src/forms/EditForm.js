import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext.js"

function EditForm(props) {

    const { title, description, _id, showEditForm } = props

    let editForm = {
        title: title,
        description: description
    }

    const { updateIssue } = useContext(AppContext)

    const [update, setUpdate] = useState(editForm)

    function fillIn(event) {
        const { name, value } = event.target
        setUpdate(prevUpdate => ({ ...prevUpdate, [name]: value }))
    }

    function postUpdatedIssue(event) {
        event.preventDefault()
        updateIssue(_id, update)
        showEditForm()
    }

    return (
        <div>
            <form onSubmit={postUpdatedIssue}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={update.title}
                    onChange={fillIn}
                />
                <br />
                <textarea
                    rows="5"
                    cols="22"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={update.description}
                    onChange={fillIn}
                />
                <br />
                <button>Submit Update</button>
            </form>
        </div>
    )
}

export default EditForm