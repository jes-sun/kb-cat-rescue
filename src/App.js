import { BrowserRouter, Route, Switch } from "react-router-dom";

import MyNavbar from "./MyNavbar";
import Homepage from "./Homepage";
import AdoptList from "./AdoptList";

function App() {
    return (
        <>
        <MyNavbar/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/cats" component={AdoptList}/>
                <Route exact path="/adopt"/>
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;
