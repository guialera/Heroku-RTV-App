import React, { useContext, useState } from "react"
import { AppContext } from "../context/appContext.js"
import Issues from "../profile/Issues.js"
import Comments from "../profile/Comments.js"

function UserProfile(props) {

    let initUser = ""

    const { userIssues, commentsByUser, user } = useContext(AppContext)

    const [username, setUserName] = useState(initUser)

    React.useEffect(() => {
        (typeof (user) === "undefined" ? setUserName(initUser) : setUserName(user.username))
    }, [])

    let sortedIssues = userIssues.sort((a, b) => b.votes - a.votes)

    let issues = sortedIssues.map(each => <Issues {...each} key={each._id} />)

    let comments = commentsByUser.map(each => <Comments {...each} key={each._id} />)

    return (
        <div>
            <h1>{`Welcome To Your Profile Page ${username}!`}</h1>
            <h1>{`These Are Your Posts`}</h1>
            {issues}
            <h1>Comments Posted By You</h1>
            <p className="userComments">{comments}</p>
        </div>
    )
}

export default UserProfile