import React, {Component} from 'react';
import AuthContext from '../control/auth-context';
import {Link, Redirect} from 'react-router-dom';
import {Button, Icon, Layout, Menu} from 'antd';
import './Dashboard.css';

const {Header, Sider, Content} = Layout;

class DashboardLayout extends Component {
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
            <Layout style={{height: '100%', minHeight: '100vh'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="dash-logo"/>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1">
                            <Icon type="form"/>
                            <span>Pending</span>
                            <Link to='/dashboard'/>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="line-chart"/>
                            <span>Statistic</span>
                            <Link to='/dashboard/stats'/>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="table"/>
                            <span>Property List</span>
                            <Link to='/dashboard/property'/>
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
                            onClick={this.context.logout}>
                            Logout
                        </Button>
                    </Header>
                    <Content style={{
                        padding: 24,
                    }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>)

    };

}

DashboardLayout.contextType = AuthContext;

export default DashboardLayout;