import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext.js"
import Issues from "../profile/Issues.js"
import IssuesForm from "../forms/IssuesForm.js"

function Main() {

    let initUser = ""

    const { allIssues, user } = useContext(AppContext)

    const [username, setUserName] = useState(initUser)

    React.useEffect(() => {
        (typeof(user) === "undefined" ? setUserName(initUser) : setUserName(user.username))
    }, [])

    let sortedIssues = allIssues.sort((a, b) => b.votes - a.votes)

    let everyIssue = sortedIssues.map(each => <Issues {...each} key={each._id} />)

    return (
        <div>
            <h1>
                {`What Are Your Pressing Issues ${username}!`}
                <br />
                {`Join The Conversation Below!`}
            </h1>
            <div className="issuesForm">
                <IssuesForm />
            </div>
            {everyIssue}
        </div>
    )
}

export default Main