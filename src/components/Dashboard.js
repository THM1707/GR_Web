import React, {Component} from 'react';
import AuthContext from '../control/auth-context';
import {Redirect, Route, Switch, Link} from 'react-router-dom';
import {Layout, Menu, Icon, Button} from 'antd';
import './Dashboard.css';
import Pending from "./Pending";
import PendingInfo from "./PendingInfo";

const {Header, Sider, Content} = Layout;

class Dashboard extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <AuthContext.Consumer>
                {({isAuthenticated, logout}) => (
                    <>
                        {
                            isAuthenticated ?
                                <Layout style={{height: '100%', minHeight: '100vh'}}>
                                    <Sider
                                        trigger={null}
                                        collapsible
                                        collapsed={this.state.collapsed}
                                    >
                                        <div className="dash-logo"/>
                                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                            <Menu.Item key="1">
                                                <Icon type="folder-open"/>
                                                <span>Pending</span>
                                                <Link to='/dashboard'/>
                                            </Menu.Item>
                                            <Menu.Item key="2">
                                                <Icon type="line-chart"/>
                                                <span>Statistic</span>
                                                <Link to='/dashboard/stats'/>
                                            </Menu.Item>
                                        </Menu>
                                    </Sider>
                                    <Layout>
                                        <Header style={{background: '#fff', padding: 0, width: '100%'}}>
                                            <Icon
                                                className="trigger"
                                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                                onClick={this.toggle}
                                            />
                                            Admin Dashboard
                                            <Button
                                                className="logout"
                                                onClick={logout}>
                                                Logout
                                            </Button>
                                        </Header>
                                        <Content style={{
                                            margin: '24px 16px', padding: 24,
                                        }}
                                        >
                                            <Switch>
                                                <Route path='/dashboard' exact component={Pending}/>
                                                <Route path='/dashboard/pending/:id' component={PendingInfo}/>
                                                <Route path='/dashboard/stats' component={() => <div>stats</div>}/>
                                                <Route path='*' component={() => '404 Not Found'}/>
                                            </Switch>
                                        </Content>
                                    </Layout>
                                </Layout> :
                                <Redirect to={'/admin/login'}/>
                        }
                    </>
                )}
            </AuthContext.Consumer>
        );
    }
}

export default Dashboard;