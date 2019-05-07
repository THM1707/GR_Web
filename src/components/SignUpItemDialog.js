import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContext from '../control/DialogContext';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const imageStyle = {
    marginBottom: '16px',
    width: '50%',
};

class SignUpItemDialog extends React.Component {
    render() {
        return (
            <DialogContext.Consumer>
                {({open, handleAccept, handleDeny, handleClose, card}) => (
                    <Dialog
                        open={open}
                        scroll='paper'
                        aria-labelledby="scroll-dialog-title"
                    >
                        <DialogTitle id="scroll-dialog-title">
                            {card.name}
                        </DialogTitle>
                        <DialogContent>
                            {card.image !== undefined && console.log(card.image.id)}
                            <img style={imageStyle}
                                 src={card.image !== undefined ? 'http://localhost:8080/api/image/' + card.image.id : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
                                 alt='Not available'/>
                            <Grid container spacing={8}>
                                <Grid item xs={3}>
                                    <Typography variant={"subtitle2"}>Name</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{card.name}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant={"subtitle2"}>Address</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{card.address}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant={"subtitle2"}>Capacity</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{card.capacity} slots</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant={"subtitle2"}>Active time</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{card.openTime + ' ~ ' + card.closeTime}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant={"subtitle2"}>Co-ordinate</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{card.latitude}, {card.longitude}</Typography>
                                </Grid>
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>

                            <Button onClick={handleDeny} color="secondary">
                                Deny
                            </Button>

                            <Button onClick={handleAccept} color="primary">
                                Accept
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </DialogContext.Consumer>
        );
    }
}

export default SignUpItemDialog;