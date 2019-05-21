import React, {Component} from 'react';
import {Breadcrumb, Button, Card, Col, Icon, List, message, Modal, Row} from 'antd';
import axios from "axios";
import {Link} from 'react-router-dom';
import ParkingCreateForm from './CreateParkingModal';
import ParkingEditForm from './EditParkingModal';
import moment from 'moment';

const confirm = Modal.confirm;

const IconText = ({type, text, onClick}) => (
    <span onClick={onClick}>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

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

class PropertyPage extends Component {
    state = {
        loading: true,
        listData: [],
        visible: false,
        editing: false,
        openString: null,
        closeString: null,
        openEdit: null,
        closeEdit: null,
        editId: -1,
    };

    delete = (id) => {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.delete('http://localhost:8080/api/parking_lot/' + id, {headers: headers});
        let listData = this.state.listData;
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].id === id) {
                listData.splice(i, 1);
            }
        }
        this.setState({listData: listData});
    };

    showModal = () => {
        this.setState({visible: true});
    };

    beginEdit = (item) => {
        this.setState({editing: true, editId: item.id});
        const form = this.editFormRef.props.form;
        form.setFieldsValue({name: item.name});
        form.setFieldsValue({address: item.address});
        form.setFieldsValue({longitude: item.longitude});
        form.setFieldsValue({latitude: item.latitude});
        form.setFieldsValue({capacity: item.capacity});
        form.setFieldsValue({price: item.price});
        this.setState({openEdit: item.openTime});
        this.setState({closeEdit: item.closeTime});
        form.setFieldsValue({openTime: moment(item.openTime, 'HH:mm:ss')});
        form.setFieldsValue({closeTime: moment(item.closeTime, 'HH:mm:ss')});
    };

    handleCancel = () => {
        this.setState({visible: false});
        const form = this.createFormRef.props.form;
        form.resetFields();
    };

    handleCancelEdit = () => {
        this.setState({editing: false});
        const form = this.editFormRef.props.form;
        form.resetFields();
    };

    handleEdit = () => {
        const form = this.editFormRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data = values;
                data.openTime = this.state.openEdit;
                data.closeTime = this.state.closeEdit;
                // data.image = values.upload.fileList[0].thumbUrl;
                delete data.upload;
                console.log(data);
                const token = localStorage.getItem('token');
                let headers = {
                    'Authorization': 'Bearer ' + token,
                };
                axios.post('http://localhost:8080/api/parking_lot/edit/' + this.state.editId, data, {headers: headers})
                    .then(response => {
                        message.success("Edited");
                        console.log('Received values of form: ', values);
                        form.resetFields();
                        let editedData = this.state.listData.slice();
                        let objIndex = editedData.findIndex((obj => obj.id === this.state.editId));
                        editedData[objIndex] = response.data.data;
                        this.setState({editing: false, listData: editedData});
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.data.message === "Validation error") {
                                message.error("Some field is not meet the requirement");
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

    handleCreate = () => {
        const form = this.createFormRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data = values;
                data.openTime = this.state.openString;
                data.closeTime = this.state.closeString;
                data.image = values.upload.fileList[0].thumbUrl;
                delete data.upload;
                console.log(data);
                const token = localStorage.getItem('token');
                let headers = {
                    'Authorization': 'Bearer ' + token,
                };
                axios.post('http://localhost:8080/api/parking_lot/create', data, {headers: headers})
                    .then(response => {
                        message.success("Created");
                        console.log('Received values of form: ', values);
                        form.resetFields();
                        this.state.listData.push(response.data.data);
                        this.setState({visible: false});
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.data.message === "Validation error") {
                                message.error("Some field is not meet the requirement");
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

    saveFormRef = createFormRef => {
        this.createFormRef = createFormRef;
    };

    changeFormRef = editFormRef => {
        this.editFormRef = editFormRef;
    };

    onOpenEditChange = (time, timeString) => {
        this.setState({openEdit: timeString});
    };

    onCloseEditChange = (time, timeString) => {
        this.setState({closeEdit: timeString});
    };

    onOpenChange = (time, timeString) => {
        this.setState({openString: timeString});
    };

    onCloseChange = (time, timeString) => {
        this.setState({closeString: timeString});
    };

    render() {

        const {loading, listData} = this.state;

        return (
            <div>
                <Breadcrumb style={{marginBottom: '16px'}}>
                    <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Property list
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Card bordered={false} loading={loading}>

                    <Button
                        style={{marginBottom: '16px'}}
                        type="dashed" block
                        onClick={this.showModal}
                    >
                        <Icon type="plus"/> Add new
                    </Button>

                    <ParkingCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        onCloseChange={this.onCloseChange}
                        onOpenChange={this.onOpenChange}
                    />

                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={
                                    item.type === 1 ?
                                        [
                                            <IconText type="delete" text="Delete"
                                                      onClick={() => showConfirm("Are you sure to delete", () => this.delete(item.id))}/>
                                        ] :
                                        [
                                            <IconText
                                                type="edit" text="Edit" onClick={() => this.beginEdit(item)}/>,
                                            <IconText type="delete" text="Delete"
                                                      onClick={() => showConfirm("Are you sure to delete", () => this.delete(item.id))}/>
                                        ]
                                }
                                extra={<img width={272} height={200} alt="logo"
                                            src={'http://localhost:8080/api/image/' + item.image.id}/>}
                            >
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.address}
                                />
                                <Row>
                                    <Col span={6}>
                                        Capacity
                                    </Col>
                                    <Col span={18}>
                                        {item.capacity}
                                    </Col>
                                    <Col span={6}>
                                        Price
                                    </Col>
                                    <Col span={18}>
                                        {item.price.toLocaleString()} đ
                                    </Col>
                                    <Col span={6}>
                                        Active time
                                    </Col>
                                    <Col span={18}>
                                        {item.openTime + '  ~   ' + item.closeTime}
                                    </Col>
                                    <Col span={6}>
                                        Coordinates
                                    </Col>
                                    <Col span={18}>
                                        {item.latitude + '  ,   ' + item.longitude}
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                    <ParkingEditForm
                        wrappedComponentRef={this.changeFormRef}
                        visible={this.state.editing}
                        onCancel={this.handleCancelEdit}
                        onCreate={this.handleEdit}
                        onCloseChange={this.onCloseEditChange}
                        onOpenChange={this.onOpenEditChange}
                    />
                </Card>
            </div>
        );
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.get('http://localhost:8080/api/parking_lot/all', {headers: headers})
            .then(response => {
                this.setState({
                    loading: false,
                    listData: response.data.data,
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

export default PropertyPage;