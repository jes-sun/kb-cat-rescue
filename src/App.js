import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MyNavbar from "./MyNavbar";
import Homepage from "./Homepage";
import AdoptList from "./AdoptList";
import Adopt from "./Adopt";
import Login from "./Login";

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
                    {isLoggedIn() ? <Redirect to="/"/> : <Redirect to="/login"/>}
                </Route>
                <Route exact path="/login" component={Login}/>
    
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;
