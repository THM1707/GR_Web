import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import WrappedNormalLoginForm from "./components/AdminLoginLayout";
import SignUpLayout from './components/SignUpLayout';
import AppContext from './control/auth-context';
import DashboardLayout from "./components/DashboardLayout";
import ConfirmationLayout from "./components/ConfirmationLayout";
import HomepageLayout from "./components/LandingLayout";
import PendingLayout from "./components/PendingLayout";
import PendingInfoLayout from "./components/PendingInfoLayout";
import StatisticLayout from "./components/StatisticLayout";
import PropertyLayout from "./components/PropertyLayout";
import {Skeleton} from "antd";
import WrappedLoginForm from "./components/LoginLayout";
import ErrorLayout from "./components/ErrorLayout";
import EditLayout from "./components/EditLayout";

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
                            <Route path="/signUp" component={SignUpLayout}/>
                            <Route path="/login" component={WrappedLoginForm}/>
                            <Route path="/edit/:id" component={EditLayout}/>
                            <Route path="/dashboard" render={() => {
                                if (this.state.isAuthenticated)
                                    return (
                                        <DashboardLayout>
                                            <Switch>
                                                <Route exact path='/dashboard' component={PendingLayout}/>
                                                <Route path='/dashboard/pending/:id' component={PendingInfoLayout}/>
                                                <Route path='/dashboard/stats' component={StatisticLayout}/>
                                                <Route path='/dashboard/property' component={PropertyLayout}/>
                                                <Route component={ErrorLayout}/>
                                            </Switch>
                                        </DashboardLayout>);
                                else
                                    return <Redirect to="/admin/login"/>
                            }}
                            />
                            <Route path='/confirmation' component={ConfirmationLayout}/>
                            <Route component={ErrorLayout}/>
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
