import HomeMovie from '../Pages/HomeMovie';
import DetailMovie from '../Pages/DetailMovie';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Navigation(){
    return(
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={HomeMovie}/>
                    <Route path="/movie/:id" component={DetailMovie}/>
                </Switch>
            </div>
        </Router>
    )
}

export default Navigation;