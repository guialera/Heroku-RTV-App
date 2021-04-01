import React, { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { AppContext } from "./context/appContext.js"
import NavBar from "./NavBar.js"
import Auth from "./profile/Auth.js"
import UserProfile from "./profile/UserProfile.js"
import Main from "./profile/Main.js"

function App(props) {
    const { token } = useContext(AppContext)
    return (
        <div>
            <NavBar />
            <Switch>
                <Route
                    exact path="/"
                    render={() => token ? <Redirect to="userprofile" /> : <Auth />}
                />
                <Route
                    exact path="/userprofile"
                    render={() => token ? <UserProfile /> : <Redirect to="/" />}
                />

                <Route
                    exact path="/main"
                    render={() => token ? <Main /> : <Redirect to="/" />}
                />
            </Switch>
        </div>
    )
}

export default App