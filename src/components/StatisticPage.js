import React, {Component} from 'react';
import {Statistic, Row, Col, Card, Breadcrumb, message} from 'antd';
import {Icon} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];


class StatisticPage extends Component {
    state = {
        stats: null,
        loading: true,
        pieData: null,
        barData: null
    };

    render() {
        const {loading, stats, pieData, barData} = this.state;
        return (
            <div>
                <Breadcrumb style={{marginBottom: '16px'}}>
                    <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                       Statistic
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card bordered={false} loading={loading}>
                            <Statistic
                                title="Parking lot"
                                value={stats === null ? 0 : stats.parkingCount}
                                prefix={<Icon name='car'/>}
                                valueStyle={{fontSize: '25px', color: '#F44336'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading={loading}>
                            <Statistic
                                title="User"
                                value={stats === null ? 0 : stats.userCount}
                                prefix={<Icon name="user"/>}
                                valueStyle={{fontSize: '25px', color: '#8BC34A'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading={loading}>
                            <Statistic
                                title="Total invoice"
                                value={stats === null ? 0 : stats.invoiceCount}
                                prefix={<Icon name='file'/>}
                                valueStyle={{fontSize: '25px', color: '#FFEB3B'}}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} loading={loading}>
                            <Statistic
                                title="Revenue"
                                value={stats === null ? 0 : stats.revenue}
                                suffix={"đ"}
                                valueStyle={{fontSize: '25px', color: '#03A9F4'}}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card
                            style={{marginTop: '16px'}}
                            bordered={false}
                            loading={loading}
                            title="Total year revenue"
                        >
                            <BarChart
                                width={600}
                                height={300}
                                data={barData}
                                margin={{
                                    top: 30, right: 20, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="income" fill="#8884d8"/>
                            </BarChart>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{marginTop: '16px'}}
                            bordered={false}
                            loading={loading}
                            title="Parking lots' components"
                        >
                            <PieChart width={300} height={300} onMouseEnter={this.onPieEnter}>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {
                                        pieData !== null ? pieData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                               fill={COLORS[index % COLORS.length]}/>) : null
                                    }
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.get('http://localhost:8080/api/admin/statistic', {headers: headers})
            .then(response => {
                const stats = response.data;
                const pieData = [
                    {name: 'Bookable', value: stats.bookableCount},
                    {name: 'Normal', value: stats.parkingCount - stats.bookableCount},
                ];
                const revenueData = stats.revenueData;
                const barData = [
                    {
                        name: 'Jan', income: revenueData[0]
                    },
                    {
                        name: 'Feb', income: revenueData[1]
                    },
                    {
                        name: 'Mar', income: revenueData[2]
                    },
                    {
                        name: 'Apr', income: revenueData[3]
                    },
                    {
                        name: 'May', income: revenueData[4]
                    },
                    {
                        name: 'Jun', income: revenueData[5]
                    },
                    {
                        name: 'Jul', income: revenueData[6]
                    },
                    {
                        name: 'Aug', income: revenueData[7]
                    },
                    {
                        name: 'Sep', income: revenueData[8]
                    },
                    {
                        name: 'Oct', income: revenueData[9]
                    },
                    {
                        name: 'Nov', income: revenueData[10]
                    },
                    {
                        name: 'Dec', income: revenueData[11]
                    }
                ];
                this.setState({
                    stats: stats,
                    loading: false,
                    pieData: pieData,
                    barData: barData,
                });
                console.log(response.data);
            }).catch((error) => {
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error("No connection");
            }
        });
    }
}

export default StatisticPage;