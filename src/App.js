import React, {Component} from "react";
import {Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import WrappedNormalLoginForm from "./components/LoginPage";
import SignUpPage from './components/SignUpPage';
import AppContext from './control/auth-context';
import DashboardLayout from "./components/DashboardLayout";
import Confirmation from "./components/Confirmation";
import HomepageLayout from "./components/Home";
import Pending from "./components/Pending";
import PendingInfo from "./components/PendingInfo";
import StatisticPage from "./components/StatisticPage";
import PropertyPage from "./components/PropertyPage";
import {withRouter} from 'react-router';
import {Skeleton} from "antd";

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
        isLoading: false
    };

    render() {
        if (!this.state.isLoading) {
            return (
                <AppContext.Provider value={this.state}>
                    <Router>
                        <Switch>
                            <Route path='/' exact component={HomepageLayout}/>
                            <Route path='/admin/login'
                                   render={() => !this.state.isAuthenticated ?
                                       <WrappedNormalLoginForm authenticate={this.authenticate}
                                                               isAuthenticated={this.state.isAuthenticated}/> :
                                       <Redirect to="/dashboard"/>}/>
                            <Route path="/signUp" component={SignUpPage}/>
                            <Route path="/dashboard" render={() => {
                                if (this.state.isAuthenticated)
                                    return (
                                        <DashboardLayout>
                                            <Switch>
                                                <Route exact path='/dashboard' component={Pending}/>
                                                <Route exact path='/dashboard/pending/:id' component={PendingInfo}/>
                                                <Route exact path='/dashboard/stats' component={StatisticPage}/>
                                                <Route exact path='/dashboard/property' component={PropertyPage}/>
                                                <Route component={() => '404 Not Found'}/>
                                            </Switch>
                                        </DashboardLayout>);
                                else
                                    return <Redirect to="/admin/login"/>
                            }}
                            />
                            <Route path='/confirmation' component={Confirmation}/>
                            <Route component={() => '404 Not Found'}/>
                        </Switch>
                    </Router>
                </AppContext.Provider>
            );
        } else return <Skeleton/>
    }

    componentWillMount() {
        this.setState({
                isLoading: true
            }, () => {
                const isAuthenticated = localStorage.getItem('isAuthenticated');
                let value = true;
                if (isAuthenticated === null || isAuthenticated === 'false') {
                    value = false;
                }
                console.log('value: ', value);
                this.setState({isAuthenticated: value, isLoading: false});
            }
        )
    }
}

export default withRouter(App);
