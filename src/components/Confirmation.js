import React, {Component} from 'react';
import './confirmation.css';
import {Layout, message, Typography} from 'antd';
import axios from 'axios';


const {Title, Text} = Typography;


const {
    Content, Footer,
} = Layout;

function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    console.log(query);
    let vars = query.split("&");
    console.log(vars);
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        console.log(pair);
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}

const Success =
    <Content style={{padding: '0 50px', background: '#fff'}}>
        <Title style={{margin: '16px 0', textAlign: 'center'}}>
            Your account has been activated
        </Title>
        <Layout style={{padding: '24px 0', textAlign: 'center', background: '#fff'}}>
            <img src='https://png.pngtree.com/svg/20170918/007d30559e.svg'
                 style={{
                     padding: '0 24px',
                     width: '300px',
                     height: '300px',
                     marginLeft: 'auto',
                     marginRight: 'auto'
                 }} alt="Success"/>

            <Text strong> Please down load our app to start the service</Text>
        </Layout>
    </Content>;

const Fail =
    <Content style={{padding: '0 50px', background: '#fff'}}>
        <Title style={{margin: '16px 0', textAlign: 'center'}}>
            Your token is invalid
        </Title>
        <Layout style={{padding: '24px 0', textAlign: 'center', background: '#fff'}}>
            <img src='https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Circle-512.png'
                 style={{
                     padding: '0 24px',
                     width: '300px',
                     height: '300px',
                     marginLeft: 'auto',
                     marginRight: 'auto'
                 }} alt="Success"/>

            <Text strong> Please check the token again</Text>
        </Layout>
    </Content>;

class Confirmation extends Component {

    state = {
        loaded: false,
        legit: true
    };

    render() {
        return (
            <Layout style={{paddingTop: '30px', background: '#fff'}}>
                {this.state.loaded ? this.state.legit ? Success : Fail :
                    <div style={{background: '#fff', padding: 24, minHeight: 400, textAlign: 'center'}}/>}
            </Layout>
        );
    }

    componentDidMount() {
        const data = new FormData();
        data.set('token', getQueryVariable('token'));
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/confirm',
            data: data
        }).then(response => {
            console.log(response);
            this.setState({loaded: true, legit: true});
        }).catch((error) => {
            if (error.response) {
                if (error.response.data.message === "Invalid") {
                    this.setState({loaded: true, legit: false});
                } else {
                    message.error(error.response.data.message);
                }
            } else {
                message.error("No connection");
            }
        });
    }
}

export default Confirmation;