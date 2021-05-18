import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MyNavbar from "./MyNavbar";
import Homepage from "./Homepage";
import AdoptList from "./AdoptList";
import Adopt from "./Adopt";
import Login from "./Login";
import Account from "./Account";

function App() {

    function isLoggedIn() {
        return localStorage.getItem("currentLogin")
    }

    return (
        <>
        <MyNavbar/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/cats" component={AdoptList}/>
                <Route exact path="/adopt" component={Adopt}/>
                <Route exact path="/account">
                    {isLoggedIn() ? <Redirect to="/myaccount"/> : <Redirect to="/login"/>}
                </Route>
                <Route exact path="/myaccount" component={Account}/>
                <Route exact path="/login" component={Login}/>
    
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;
