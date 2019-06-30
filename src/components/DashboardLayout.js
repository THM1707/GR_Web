import React, {Component} from 'react';
import AuthContext from '../control/auth-context';
import {Link} from 'react-router-dom';
import {Button, Icon, Layout, Menu} from 'antd';
import './Dashboard.css';

const {Header, Sider, Content} = Layout;

class DashboardLayout extends Component {
    state = {
        collapsed: false,
        selected: ['1'],
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const selected = this.state.selected;
        return (
            <Layout style={{height: '100%', minHeight: '100vh'}}>
                <Sider theme="light"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="dash-logo"/>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={selected}>
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

    componentWillMount() {
        switch (window.location.pathname) {
            case '/dashboard':
            default:
                this.setState({selected: ['1']});
                break;
            case  '/dashboard/stats':
                this.setState({selected: ['2']});
                break;
            case  '/dashboard/property':
                this.setState({selected: ['3']});
                break;

        }
    }
}

DashboardLayout.contextType = AuthContext;

export default DashboardLayout;