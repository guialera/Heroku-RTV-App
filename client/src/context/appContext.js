import React, { useState } from "react"
import axios from "axios"

export const AppContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AppProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || ""
    }

    const [user, setUser] = useState(initState)
    const [errMessage, setErrMessage] = useState("")
    const [allIssues, setAllIssues] = useState([])
    const [userIssues, setUserIssues] = useState([])
    const [allComments, setAllComments] = useState([])
    const [commentsByUser, setCommentsByUser] = useState([])

    React.useEffect(() => {
        getAllIssues()
        getIssuesByUser()
        getAllComments()
        getCommentsByUser()
    }, [])

    function signUp(credentials) {
        axios.post("/auth/signup", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUser(prevUser => ({
                    ...prevUser,
                    user,
                    token
                }))
            })
            .catch(error => setErrMessage(error.response.data.errMessage))
    }

    function login(credentials) {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { user, token } = response.data
                localStorage.removeItem("user")
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getAllIssues()
                getIssuesByUser()
                getAllComments()
                getCommentsByUser()
                setUser(prevUser => ({
                    ...prevUser,
                    user,
                    token
                }))
            })
            .catch(error => setErrMessage(error.response.data.errMessage))
    }

    function logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser({
            user: {},
            token: ""
        })
    }

    function resetErrMessage() {
        setErrMessage("")
    }

    function getAllIssues() {
        userAxios.get("/api/issues/")
            .then(response => setAllIssues(response.data))
            .catch(error => console.log(error))
    }

    function getIssuesByUser() {
        userAxios.get("/api/issues/user")
            .then(response => setUserIssues(response.data))
            .catch(error => console.log(error))

    }

    function postIssue(newIssue) {
        userAxios.post("/api/issues/", newIssue)
            .then(response => {
                setAllIssues(prevAllIssues => ([...prevAllIssues, response.data]))
                getIssuesByUser()
            })
            .catch(error => console.log(error))
    }

    function updateIssue(issueId, updatedIssue) {
        userAxios.put(`/api/issues/${issueId}`, updatedIssue)
            .then(response => {
                setAllIssues(prevAllIssues => prevAllIssues.map(each => each._id !== issueId ? each : response.data))
            })
    }

    function upvoteIssue(issueId) {
        userAxios.put(`/api/issues/upvote/${issueId}`)
            .then(response => {
                setAllIssues(prevAllIssues => prevAllIssues.map(each => each._id !== issueId ? each : response.data))
                getAllIssues()
                getIssuesByUser()
            })
    }

    function downvoteIssue(issueId) {
        userAxios.put(`/api/issues/downvote/${issueId}`)
            .then(response => {
                setAllIssues(prevAllIssues => prevAllIssues.map(each => each._id !== issueId ? each : response.data))
                getAllIssues()
                getIssuesByUser()
            })
    }

    function deleteIssue(issueId) {
        userAxios.delete(`/api/issues/${issueId}`)
            .then(response => {
                setAllIssues(prevAllIssues => (prevAllIssues.filter(each => each._id !== issueId)))
                deleteCommentsByIssue(issueId)
                getIssuesByUser()
            })
            .catch(error => console.log(error))
    }

    function getAllComments() {
        userAxios.get("/api/comments/")
            .then(response => setAllComments(response.data))
            .catch(error => console.log(error))
    }

    function getCommentsByUser() {
        userAxios.get("/api/comments/user")
            .then(response => {
                setCommentsByUser(response.data)
            })
            .catch(error => console.log(error))
    }

    function postCommentToIssue(newComment, issueId) {
        userAxios.post(`/api/comments/${issueId}`, newComment)
            .then(response => {
                setAllComments(prevAllComments => ([...prevAllComments, response.data]))
                getAllComments()
                getCommentsByUser()
            })
            .catch(error => console.log(error))
    }

    function deleteCommentByUser(commentId) {
        userAxios.delete(`/api/comments/${commentId}`)
            .then(response => {
                getAllComments()
                getCommentsByUser()
            })
            .catch(error => console.log(error))
    }

    function deleteCommentsByIssue(issueId) {
        userAxios.delete(`/api/comments/issue/${issueId}`)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    return (
        <AppContext.Provider
            value={{
                ...user,
                errMessage,
                allIssues,
                userIssues,
                allComments,
                commentsByUser,
                signUp,
                login,
                logout,
                resetErrMessage,
                postIssue,
                updateIssue,
                upvoteIssue,
                downvoteIssue,
                deleteIssue,
                deleteCommentByUser,
                getAllComments,
                getCommentsByUser,
                postCommentToIssue
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}