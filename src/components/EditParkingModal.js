import React from 'react';
import {Button, Form, Icon, Input, InputNumber, Modal, TimePicker, Tooltip, Upload} from 'antd';

const ParkingEditForm = Form.create({name: 'edit_form'})(
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form, onOpenChange, onCloseChange} = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Edit parking lot"
                    okText="Edit"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item
                            label={(
                                <span>
              Parking lot's name&nbsp;
                                    <Tooltip title="Name that will display on map">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                            )}
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true,
                                    message: "Please input your parking lot's name!",
                                    whitespace: true
                                }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Address"
                        >
                            {getFieldDecorator('address', {
                                rules: [{
                                    required: true, message: 'Please input address',
                                }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Latitude"
                        >
                            {getFieldDecorator('latitude', {
                                rules: [{
                                    type: 'number', message: 'The input is not valid latitude!',
                                }, {
                                    required: true, message: 'Please input your Latitude!',
                                }],
                            })(
                                <InputNumber min={0} step={0.1} style={{width: '200px'}}/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Longitude"
                        >
                            {getFieldDecorator('longitude', {
                                rules: [{
                                    type: 'number', message: 'The input is not valid longitude!',
                                }, {
                                    required: true, message: 'Please input your longitude!',
                                }],
                            })(
                                <InputNumber min={0} step={0.1} style={{width: '200px'}}/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Capacity"
                        >
                            {getFieldDecorator('capacity',
                                {
                                    rules: [{
                                        type: 'number', message: 'The input is invalid!',
                                    }, {
                                        required: true, message: 'Please input your capacity!',
                                    }],
                                })(
                                <InputNumber min={0} style={{width: '200px'}}/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Price/hour"
                        >
                            {getFieldDecorator('price',
                                {
                                    rules: [{
                                        type: 'number', message: 'The input is invalid!',
                                    }, {
                                        required: true, message: 'Please input price!',
                                    }],
                                })(
                                <InputNumber style={{width: '200px'}} min={0} step={5000}
                                             formatter={value => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             parser={value => value.replace(/VND\s?|(,*)/g, '')}/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Open time"
                        >
                            {getFieldDecorator('openTime', {
                                rules: [{type: 'object', required: true, message: 'Please select open time!'}],
                            })(
                                <TimePicker onChange={onOpenChange} style={{width: '200px'}}/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Close time"
                        >
                            {getFieldDecorator('closeTime', {
                                rules: [{type: 'object', required: true, message: 'Please select close time!'}],
                            })(
                                <TimePicker onChange={onCloseChange} style={{width: '200px'}}/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Picture"
                        >
                            {getFieldDecorator('upload', {
                                rules: [{type: 'object', required: false}],
                            }, {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo"
                                        listType="picture"
                                        action={() => {
                                            return false
                                        }}
                                        beforeUpload={() => {
                                            return false
                                        }}>
                                    <Button>
                                        <Icon type="upload"/> Click to upload picture
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default ParkingEditForm;