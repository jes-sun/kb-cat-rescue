import { BrowserRouter, Route, Switch } from "react-router-dom";

import MyNavbar from "./MyNavbar";
import Homepage from "./Homepage";
import Adopt from "./Adopt";
import CatPage from "./CatPage";

function App() {
    return (
        <>
        <MyNavbar/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/cats"/>
                <Route exact path ="/cats/:catName" component={CatPage}/>
                <Route exact path="/adopt" component={Adopt}/>
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;
