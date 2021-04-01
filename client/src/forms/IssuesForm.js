import React, { useState, useContext } from "react"
import { AppContext } from "../context/appContext"

function IssuesForm() {
    let emptyForm = {
        title: "",
        description: ""
    }

    const [input, setInput] = useState(emptyForm)

    const { postIssue } = useContext(AppContext)

    function fillIn(event) {
        const { name, value } = event.target
        setInput(prevInput => ({ ...prevInput, [name]: value }))
    }

    function postNewIssue(event) {
        event.preventDefault()
        postIssue(input)
        setInput(emptyForm)
    }

    return (
        <div>
            <form onSubmit={postNewIssue}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={input.title}
                    onChange={fillIn}
                />
                <br/>
                <textarea
                    rows="5"
                    cols="22"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={input.description}
                    onChange={fillIn}
                />
                <br/>
                <button>Submit Issue</button>
            </form>
        </div>
    )
}

export default IssuesForm