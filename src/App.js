import { BrowserRouter, Route, Switch } from "react-router-dom";

import Homepage from "./Homepage";
import MyNavbar from "./MyNavbar";

function App() {
    return (
        <>
        <MyNavbar/>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
            </Switch>
        </BrowserRouter>
        </>
    );
}

export default App;
