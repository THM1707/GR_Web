import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import DialogContext from '../control/DialogContext';
import axios from "axios";
import SignUpItemDialog from "./SignUpItemDialog";
import {message} from 'antd';

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`,
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
});

function parseISOString(s) {
    let b = s.split(/\D+/);
    let date = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes();
}

class PendingSignUpList extends Component {

    handleAccept = () => {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.post('http://localhost:8080/api/admin/signUp/accept/' + this.state.card.id, null, {headers: headers})
            .then(response => {
                this.setState((state) => ({
                    open: false, data:
                        state.data.filter((item) =>
                            item.id !== state.card.id)
                }));
                message.success(response.data.message);
            }).catch((error) => {
            this.setState({open: false});
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error("No connection");
            }
        });
    };

    handleDeny = () => {
        const token = localStorage.getItem('token');
        let headers = {
            'Authorization': 'Bearer ' + token,
        };
        axios.post('http://localhost:8080/api/admin/signUp/deny/' + this.state.card.id, null, {headers: headers})
            .then(response => {
                this.setState((state) => ({
                    open: false, data:
                        state.data.filter((item) =>
                            item.id !== state.card.id)
                }));
                message.success(response.data.message);
            }).catch((error) => {
            this.setState({open: false});
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error("No connection");
            }
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    state = {
        open: false,
        handleAccept: this.handleAccept,
        handleClose: this.handleClose,
        handleDeny: this.handleDeny,
        card: '',
        data: [],
    };

    handleClickOpen = (card) => {
        this.setState({open: true, card: card});
    };

    render() {
        message.config({
            top: 100,
            duration: 2,
            maxCount: 2,
        });
        const {classes} = this.props;
        let data = this.state.data;
        const list = data.map(card => (
            <Grid item key={card.id} xs={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography align='center' gutterBottom variant="h5" component="h2">
                            {card.propertyName}
                        </Typography>
                        <Typography>
                            Address: {card.address}
                        </Typography>
                        <Typography>
                            Created time : {parseISOString(card.createdDate)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary"
                                onClick={() => this.handleClickOpen(card)}>
                            View
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ));
        return (
            <React.Fragment>
                <CssBaseline/>
                <DialogContext.Provider value={this.state}>
                    <SignUpItemDialog/>
                </DialogContext.Provider>
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>
                            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                                Pending Sign Up Request
                            </Typography>
                        </div>
                    </div>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <Grid container spacing={40}>
                            {list}
                        </Grid>
                    </div>
                </main>
            </React.Fragment>
        );
    }

    componentWillMount() {
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

PendingSignUpList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PendingSignUpList);