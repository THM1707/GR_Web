import React, {Component} from 'react';
import {List, Card, Icon, message} from 'antd';
import axios from "axios";
import {Link} from 'react-router-dom';

const {Meta} = Card;
const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);
class Pending extends Component {

    state = {
        data: [],
    };

    render() {
        return (
            <div>
                <List
                    grid={{gutter: 16, column: 4}}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                bordered={true}
                                cover={<img alt="example"
                                            src={item.image !== undefined ? 'http://localhost:8080/api/image/' + item.image.id
                                                : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}/>}
                                actions={[<Link to={"/dashboard/pending/" + item.id}><IconText type="eye" text="View"/></Link>]}
                            >
                                <Meta
                                    title={item.propertyName}
                                    description={item.address}
                                />
                            </Card>
                        </List.Item>
                    )}
                />

            </div>
        );
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.get('http://localhost:8080/api/admin/signUp/index', {headers: headers})
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

export default Pending;