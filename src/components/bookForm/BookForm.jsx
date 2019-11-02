import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const useStyles = makeStyles(theme => ({
    form: {
        [theme.breakpoints.down('sm')]: {
            width: 300,
        },
        [theme.breakpoints.up('sm')]: {
            width: 450,
        },
    },
    textField: {
        margin: theme.spacing(2),
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
        height: '40px',
        width: '80px',
    },
}));

const emptyFields = (book, setId, setTitle, setDescription) => {
    setId((book && book.id) || '');
    setTitle((book && book.title) || '');
    setDescription((book && book.description) || '');
};

const BookForm = ({book, type, handleAction, ...props}) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [formValid, setFormValid] = useState(false);
    const {openModal, setOpenModal} = props;

    useEffect(() => {
        emptyFields(book, setId, setTitle, setDescription);
    }, [book, setId, setTitle, setDescription]);

    useEffect(() => {
        setFormValid(title && title.trim() !== '' && description && description.trim() !== '');
    }, [title, description]);

    const handleCloseModal = useCallback(() => {
        setOpenModal(false);
        emptyFields(book, setId, setTitle, setDescription);

    }, [book, setOpenModal, setId, setTitle, setDescription]);
    const handleConfirmModal = useCallback(() => {
        let book = {
            title,
            description,
            date: new Date(),
        };
        handleAction(id, book);
        setOpenModal(false);
        setId('');
        setTitle('');
        setDescription('');
    }, [handleAction, setOpenModal, id, title, description, setTitle, setDescription]);

    const setTitleText = useCallback((e) => setTitle(e.target.value), [setTitle]);
    const setDescriptionText = useCallback((e) => setDescription(e.target.value), [setDescription]);

    const classes = useStyles();

    return (
        <ConfirmationModal
            title={`${ type === 'add' ? 'Add': 'Edit' } Form`}
               body={
                   <div className={ classes.body }>
                       <form autoComplete='off' className={classes.form}>
                           <TextField
                               variant="outlined"
                               value={title}
                               label="Book Title"
                               placeholder="Title"
                               className={classes.textField}
                               name="title"
                               type='text'
                               onChange={setTitleText} />
                           <TextField
                               variant="outlined"
                               value={description}
                               label="Book Description"
                               placeholder="Description"
                               className={classes.textField}
                               name="description"
                               type='text'
                               onChange={setDescriptionText} />
                       </form>
                       <footer>
                           <Button
                               color="primary"
                               variant="contained"
                               className={classes.button}
                               onClick={ handleCloseModal }>
                               Cancel
                           </Button>
                           <Button
                               variant="contained"
                               disabled={!formValid}
                               className={classes.button}
                               onClick={ handleConfirmModal }>
                               OK
                           </Button>
                       </footer>
                   </div>
               }
               open={ openModal }
               closeModal={ handleCloseModal }/>
    );
};

export default BookForm;
