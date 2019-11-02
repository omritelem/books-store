import React  from 'react';
import { makeStyles } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      margin: 10,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #909090',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
        borderRadius: 10,
    },
}));

const ConfirmationModal = ({ open, title, body, closeModal }) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 className={classes.title} id="transition-modal-title">{title}</h2>
                    <div id="transition-modal-description">{body}</div>
                </div>
            </Fade>
        </Modal>
    );
};

export default ConfirmationModal;
