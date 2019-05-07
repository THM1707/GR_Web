import React from "react";

import {
    Button,
    Form,
    Icon,
    Input,
    InputNumber,
    message,
    Radio,
    Select,
    TimePicker,
    Tooltip,
    Typography,
    Upload
} from 'antd';

import axios from 'axios';

const {Title} = Typography;

const {Option} = Select;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        openString: null,
        closeString: null,
    };

    onOpenChange = (time, timeString) => {
        console.log(timeString);
        this.setState({openString: timeString});
    };

    onCloseChange = (time, timeString) => {
        console.log(timeString);
        this.setState({closeString: timeString});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                console.log('Received values of form: ', values);
                const data = values;
                data.openTime = this.state.openString;
                data.closeTime = this.state.closeString;
                data.image = values.upload.fileList[0].thumbUrl;
                delete data.prefix;
                delete data.upload;
                console.log(data);
                axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/auth/manager/signUp',
                    data: data
                })
                    .then(() => {
                        message.success("Success");
                        this.props.toggleSuccess();
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

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '84',
        })(
            <Select style={{width: 70}}>
                <Option value="84">+84</Option>
            </Select>
        );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{
                maxWidth: '600px', margin: '0 auto'
            }}>

                <Title level={4}>
                    Account
                </Title>

                <Form.Item
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item
                    label="Username"
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: 'Please input your username!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </Form.Item>
                <Form.Item
                    label={(
                        <span>
              Name&nbsp;
                            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                    )}
                >
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                    )}
                </Form.Item>

                <Form.Item
                    label="Gender"
                >
                    {getFieldDecorator('gender', {
                        rules: [{required: true, message: 'Please chose your gender'}],
                    })(
                        <Radio.Group>
                            <Radio.Button value="0">Male</Radio.Button>
                            <Radio.Button value="1">Female</Radio.Button>
                        </Radio.Group>
                    )}
                </Form.Item>

                <Title level={4}> Parking lot </Title>

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
                    {getFieldDecorator('propertyName', {
                        rules: [{required: true, message: "Please input your parking lot's name!", whitespace: true}],
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
                        <TimePicker onChange={this.onOpenChange} style={{width: '200px'}}/>
                    )}
                </Form.Item>

                <Form.Item
                    label="Close time"
                >
                    {getFieldDecorator('closeTime', {
                        rules: [{type: 'object', required: true, message: 'Please select close time!'}],
                    })(
                        <TimePicker onChange={this.onCloseChange} style={{width: '200px'}}/>
                    )}
                </Form.Item>

                <Form.Item
                    label="Picture"
                >
                    {getFieldDecorator('upload', {
                        rules: [{type: 'object', required: true, message: 'Please upload an image!'}],
                    }, {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload"/> Click to upload
                            </Button>
                        </Upload>
                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Sign up</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default WrappedRegistrationForm;
