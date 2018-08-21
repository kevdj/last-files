import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {App} from "./App";
import {Category} from "./Category";
import {CreateC} from "./CreateC";
import {CatList} from "./CatList";
import {SetLimits} from "./SetLimits";

class App1 extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={App} >
                    <IndexRoute component={App} />
                </Route>
                <Route path={"Category/:id"} component={Category} />
                <Route path={"CreateC"} component={CreateC} />
                <Route path={"CatList"} component={CatList} />
                <Route path={"SetLimits/:id"} component={SetLimits} />

        
            </Router>
        );
    }
}

render(<App1 />, window.document.getElementById('root'));
