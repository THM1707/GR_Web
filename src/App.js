import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import WrappedNormalLoginForm from "./components/LoginPage";
import SignUpPage from './components/SignUpPage';
import AppContext from './control/auth-context';
import Dashboard from "./components/Dashboard";
import Confirmation from "./components/Confirmation";
import HomepageLayout from "./components/Home";

class App extends Component {

    authenticate = () => {
        localStorage.setItem('isAuthenticated', 'true');
        this.setState({isAuthenticated: true});
    };

    logout = () => {
        this.setState({isAuthenticated: false});
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('token');
    };

    state = {
        isAuthenticated: false,
        logout: this.logout,
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <Switch>
                    <Route path='/' exact component={HomepageLayout}/>
                    <Route path='/admin/login'
                           component={() => <WrappedNormalLoginForm authenticate={this.authenticate}
                                                                    isAuthenticated={this.state.isAuthenticated}/>}/>
                    <Route path="/signUp" component={SignUpPage}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path='/confirmation' component={Confirmation}/>
                    <Route path='*' component={() => '404 Not Found'}/>
                </Switch>
            </AppContext.Provider>
        );
    }

    componentDidMount() {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        let value = true;
        if (isAuthenticated === null || isAuthenticated === 'false') {
            value = false;
        }
        this.setState({isAuthenticated: value});
    }

}

export default App;
