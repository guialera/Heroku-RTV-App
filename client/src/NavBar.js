import React, { useContext } from "react"
import { AppContext } from "./context/appContext.js"
import { Link } from "react-router-dom"

function NavBar() {
    const { logout, token } = useContext(AppContext)
    return (
        <div>
            <nav>
                {!token && <Link className="appLinkText" to="/">Login</Link>}
                {token && <Link className="appLinkText" to="userprofile">User Profile</Link>}
                {token && <Link className="appLinkText" to="main">Main Page</Link>}
                {token && <Link className="appLinkText" to="/"><button onClick={logout}>Log Out</button></Link>}
            </nav>
        </div>
    )
}

export default NavBar