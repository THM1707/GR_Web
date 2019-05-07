import React from "react";
import './LoginPage.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


import {Form, Icon, Input, Button, message, Typography} from "antd";

const {Title} = Typography;

const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100px" height="100px">
        <path
            d="m61.93518 13.13184v-2.26368l-1.82751-.80645a8.58059 8.58059 0 0 0 -.42762-1.36871l1.007-1.73718a10.21364 10.21364 0 0 0 -1.31091-1.83173l-1.93372.44281a8.35009 8.35009 0 0 0 -1.13372-.83856l-.18492-2.02094a9.76089 9.76089 0 0 0 -2.10388-.7074l-1.31781 1.529h-1.40409l-1.31778-1.529a9.75964 9.75964 0 0 0 -2.10388.70734l-.18493 2.02093a8.36535 8.36535 0 0 0 -1.13373.8385l-1.93368-.44287a10.21753 10.21753 0 0 0 -1.311 1.83179l1.007 1.73712a8.58007 8.58007 0 0 0 -.42761 1.36877l-1.82758.80652v2.26374l1.82751.80645a8.58826 8.58826 0 0 0 .42768 1.36871l-1.007 1.73712a10.21658 10.21658 0 0 0 1.31091 1.83179l1.93372-.44288a8.34427 8.34427 0 0 0 1.13372.83857l.18494 2.02093a9.7643 9.7643 0 0 0 2.10381.70747l1.3179-1.52905h1.404l1.31784 1.52905a9.768 9.768 0 0 0 2.10382-.7074l.18493-2.02087a8.3623 8.3623 0 0 0 1.13373-.8385l1.93368.44277a10.21738 10.21738 0 0 0 1.311-1.83173l-1.007-1.73714a8.57746 8.57746 0 0 0 .42761-1.36871z"
            fill="#a8a8c6"/>
        <circle cx="52" cy="12" fill="#dfdeed" r="6"/>
        <path
            d="m25.92224 15.35822v-2.71644l-2.193-.96777a10.30085 10.30085 0 0 0 -.51313-1.64245l1.20839-2.08456a12.25892 12.25892 0 0 0 -1.57312-2.1981l-2.32044.53143a10.01529 10.01529 0 0 0 -1.36047-1.00633l-.22192-2.42511a11.71685 11.71685 0 0 0 -2.52466-.84889l-1.58142 1.83484h-1.68488l-1.58136-1.83484a11.715 11.715 0 0 0 -2.52459.84882l-.22193 2.42511a10.02192 10.02192 0 0 0 -1.36047 1.00622l-2.32044-.53143a12.2602 12.2602 0 0 0 -1.57318 2.19806l1.20838 2.08459a10.29778 10.29778 0 0 0 -.51313 1.64252l-2.19311.96783v2.71643l2.19305.96778a10.30341 10.30341 0 0 0 .51313 1.64245l-1.20844 2.08462a12.25892 12.25892 0 0 0 1.57312 2.1981l2.32044-.53143a10.01992 10.01992 0 0 0 1.36047 1.00633l.22192 2.42511a11.71571 11.71571 0 0 0 2.52466.84889l1.58142-1.83484h1.68488l1.58136 1.83484a11.71953 11.71953 0 0 0 2.52459-.84888l.22193-2.425a10.02829 10.02829 0 0 0 1.36047-1.00622l2.32044.53143a12.26065 12.26065 0 0 0 1.57318-2.19812l-1.20838-2.08464a10.29586 10.29586 0 0 0 .51313-1.64252z"
            fill="#a8a8c6"/>
        <circle cx="14" cy="14" fill="#dfdeed" r="8"/>
        <path
            d="m61.88593 49.70538v-3.4107l-2.08783-.43878a11.879 11.879 0 0 0 -.51282-1.90314l1.59972-1.43317a13.96613 13.96613 0 0 0 -1.71643-2.93615l-2.01831.66284a12.064 12.064 0 0 0 -1.39626-1.39612l.663-2.01837a13.96389 13.96389 0 0 0 -2.93634-1.71662l-1.43323 1.59961a11.88774 11.88774 0 0 0 -1.90319-.51288l-.43885-2.08783h-3.4107l-.43879 2.08783a11.88531 11.88531 0 0 0 -1.90314.51282l-1.43317-1.59972a13.96462 13.96462 0 0 0 -2.93615 1.71643l.66284 2.01831a12.064 12.064 0 0 0 -1.39612 1.39626l-2.01837-.663a13.96322 13.96322 0 0 0 -1.71656 2.93628l1.59961 1.43322a11.87909 11.87909 0 0 0 -.51287 1.9032l-2.0879.43885v3.41076l2.08783.43878a11.87733 11.87733 0 0 0 .51282 1.90314l-1.59972 1.43318a13.96613 13.96613 0 0 0 1.71643 2.93615l2.01831-.66284a12.064 12.064 0 0 0 1.39626 1.39612l-.663 2.01837a13.96389 13.96389 0 0 0 2.93634 1.71662l1.43323-1.59967a11.88788 11.88788 0 0 0 1.90319.51294l.43885 2.08783h3.4107l.43878-2.08783a11.88545 11.88545 0 0 0 1.90314-.51288l1.43318 1.59978a13.96613 13.96613 0 0 0 2.93615-1.71643l-.66284-2.01831a12.06871 12.06871 0 0 0 1.39612-1.39626l2.01837.663a13.96389 13.96389 0 0 0 1.71662-2.93634l-1.59961-1.43323a11.88774 11.88774 0 0 0 .51288-1.90319z"
            fill="#a8a8c6"/>
        <circle cx="48" cy="48" fill="#dfdeed" r="10"/>
        <circle cx="14" cy="14" fill="#fed966" r="6"/>
        <circle cx="52" cy="12" fill="#f73445" r="4"/>
        <circle cx="48" cy="48" fill="#58cc8f" r="8"/>
        <path d="m30 13h8v2h-8z" fill="#3c6ed3"/>
        <path
            d="m30.39355 47.08105-7-3a.99932.99932 0 0 0 -1.39355.91895v2h-12v-16h-2v17a.99943.99943 0 0 0 1 1h13v2a.99933.99933 0 0 0 1 1 .98642.98642 0 0 0 .39355-.081l7-3a.99946.99946 0 0 0 0-1.8379z"
            fill="#3c6ed3"/>
        <path
            d="m47 52a.99686.99686 0 0 1 -.707-.293l-3-3 1.414-1.414 2.22559 2.22558 4.29883-5.15917 1.5371 1.28125-5 6a1.00143 1.00143 0 0 1 -.72363.35839c-.01462.00095-.03024.00095-.04489.00095z"
            fill="#414141"/>
    </svg>
);

class NormalLoginForm extends React.Component {

    handleSubmit = e => {
        const {authenticate} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = new FormData();
                data.set('usernameOrEmail', values.username);
                data.set('password', values.password);
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/auth/signIn',
                    data: data
                }).then(response => {
                    console.log(response);
                    localStorage.setItem('token', response.data.accessToken);
                    authenticate();
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.data.message === "Bad credentials") {
                            message.error("Username or Password is wrong");
                        } else {
                            message.error(error.response.data.message);
                        }
                    } else {
                        message.error("No connection");
                    }
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {isAuthenticated} = this.props;
        if (isAuthenticated) {
            return (
                <Redirect to='/dashboard'/>
            )
        }
        return (
            <div className="login-layout" style={{textAlign: 'center'}}>

                <Icon component={AdminIcon} style={{marginTop: '60px'}}/>

                <Title level={1} style={{marginBottom: '30px'}} >Admin login</Title>

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [{required: true, message: "Please input your username!"}]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "Please input your Password!"}]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: "normal_login"})(
    NormalLoginForm
);
export default WrappedNormalLoginForm;
