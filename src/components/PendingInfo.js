import React, {Component} from 'react';
import axios from "axios";
import {message, Skeleton, Card, Row, Col, Divider, Button, Modal} from "antd";
import {Link} from "react-router-dom";

const confirm = Modal.confirm;

function showConfirm(content, callback) {
    confirm({
        title: "Confirm",
        content: content,
        onOk() {
            callback();
        },
        onCancel() {
        },
    });
}

class PendingInfo extends Component {

    state = {
        data: null,
    };

    accept = () => {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.post('http://localhost:8080/api/admin/signUp/accept/' + this.state.data.id, null, {headers: headers})
            .then(response => {
                message.success("Accept success");
                this.props.history.push('/dashboard');
            }).catch((error) => {
            this.setState({open: false});
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error("No connection");
            }
        });
    };

    deny = () => {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.post('http://localhost:8080/api/admin/signUp/deny/' + this.state.data.id, null, {headers: headers})
            .then(response => {
                message.success("Denied");
                this.props.history.push('/dashboard');
            }).catch((error) => {
            this.setState({open: false});
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error("No connection");
            }
        });
    };

    render() {
        let loaded = this.state.data === null;
        const item = this.state.data;
        return (
            <div>
                {
                    loaded ? <Skeleton/> :
                        <Card
                            title="Form Info"
                            style={{width: '100%'}}
                        >
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Contact number</div>
                                </Col>
                                <Col span={18}>
                                    <div>{item.phone}</div>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Name</div>
                                </Col>
                                <Col span={18}>
                                    <div>{item.propertyName}</div>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Address</div>
                                </Col>
                                <Col span={18}>
                                    <div>{item.address}</div>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Capacity</div>
                                </Col>
                                <Col span={18}>
                                    <div>{item.capacity}</div>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Price (VND/Hour)</div>
                                </Col>
                                <Col span={18}>
                                    <div>{item.price.toLocaleString()} VND</div>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Open time</div>
                                </Col>
                                <Col span={6}>
                                    <div>{item.openTime}</div>
                                </Col>
                                <Col span={6}>
                                    <div>Close time</div>
                                </Col>
                                <Col span={6}>
                                    <div>{item.closeTime}</div>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <div>Latitude</div>
                                </Col>
                                <Col span={6}>
                                    <div>{item.latitude}</div>
                                </Col>
                                <Col span={6}>
                                    <div>Longitude</div>
                                </Col>
                                <Col span={6}>
                                    <div>{item.longitude}</div>
                                </Col>
                            </Row>
                            <div style={{float: 'right', marginTop: '40px'}}>
                                <Link to={'/dashboard'}><Button size="large">Back</Button></Link>
                                <Button onClick={() => showConfirm("Are you sure to deny this form?", this.deny)}
                                        size="large"
                                        style={{marginLeft: '16px'}}
                                        type="danger">Deny</Button>
                                <Button onClick={() => showConfirm("Are you sure to accept this form?", this.accept)}
                                        size="large"
                                        style={{marginLeft: '16px'}}
                                        type="primary">Accept</Button>
                            </div>
                        </Card>
                }
            </div>
        );
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.get('http://localhost:8080/api/admin/signUp/' + params.id, {headers: headers})
            .then(response => {
                this.setState({
                    data: response.data.data
                });
                console.log(response.data.data);
            }).catch((error) => {
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error("No connection");
            }
        });

    }
}

export default PendingInfo;