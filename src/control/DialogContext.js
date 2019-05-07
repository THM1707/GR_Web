import React from 'react';

const DialogContext = React.createContext({
    open: false,
    handleClose: () => {
    },
    handleClickOpen: () => {
    }
});
export default DialogContext;