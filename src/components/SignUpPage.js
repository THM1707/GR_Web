import React, {Component} from 'react';
import WrappedRegistrationForm from './WrappedRegistrationForm';
import {Layout, Menu, Typography} from "antd";

const {Title} = Typography;
const {Header, Content} = Layout;

class SignUpPage extends Component {
    state = {
        isSuccess: false,
    };
    toggleSuccess = () => {
        this.setState({isSuccess: true});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header style={{
                    background: '#fff',
                    borderTop: 'solid 1px #ddd',
                    borderBottom: 'solid 1px #ddd',
                    height: '49px',
                    paddingLeft: '80px',
                    paddingRight: '80px'
                }}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{
                            borderBottom: 'solid 1px #ddd'
                        }}
                    >
                        <Menu.Item key="1" onClick={() => {
                            this.props.history.push('/');
                        }}>Home</Menu.Item>
                        <Menu.Item key="2">Sign up</Menu.Item>
                    </Menu>
                </Header>

                <Content style={{padding: '30px'}}>
                    <Title style={{
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}>{this.state.isSuccess ? "You have successfully registered" : "Manager Sign Up"}</Title>

                    {this.state.isSuccess ? <img src='https://png.pngtree.com/svg/20170918/007d30559e.svg'
                                                 style={{
                                                     padding: '0 24px',
                                                     width: '300px',
                                                     height: '300px',
                                                     marginLeft: 'auto',
                                                     marginRight: 'auto',
                                                     display: 'block'
                                                 }} alt="Success"/> :
                        <WrappedRegistrationForm toggleSuccess={this.toggleSuccess}/>}
                </Content>
            </Layout>
        );
    }
}

export default SignUpPage;