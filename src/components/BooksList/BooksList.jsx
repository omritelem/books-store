import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getBooks, deleteBook, addBook, editBook } from '../../actions/books/index';
import BookItem from "../BookItem/BookItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import BookForm from "../bookForm/BookForm";
import './BooksList.css';

const BooksList = () => {
    const { books, loading } = useSelector(state => ({
        books: state.books.data,
        loading: state.books.isLoading,
    }), shallowEqual) || [];
    const [openModal, setOpenModal] = useState(false);
    const [formType, setFormType] = useState('');
    const [editedBook, setEditedBook] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllBooks = async () => {
            await dispatch(getBooks());
        };

        getAllBooks();
    }, [dispatch]);

    const deleteBookHandler = useCallback(id => {
        const deleteCurrentBook = async id => {
            await dispatch(deleteBook(id));
        };

        if (id) {
            deleteCurrentBook(id);
        }
    }, [dispatch]);

    const addBookHandler = useCallback(() => {
        setEditedBook(null);
        setFormType('add');
        setOpenModal(true);
    }, [setEditedBook]);

    const editBookHandler = useCallback(id => {
        setEditedBook(books.find(book => book.id === id));
        setFormType('edit');
        setOpenModal(true);
    }, [setEditedBook, books]);

    const addBookAction = useCallback(book => {
        const addCurrentBook = async book => {
            await dispatch(addBook(book));
        };

        addCurrentBook(book);
    }, [dispatch]);

    const editBookAction = useCallback((id, book) => {
        const editCurrentBook = async (id, book) => {
            await dispatch(editBook(id, book));
        };

        if (id) {
            editCurrentBook(id, book);
        }
    }, [dispatch]);

    const actionHandler = useCallback((id, book) => {
        setEditedBook(null);
        if (formType === 'add') {
            addBookAction(book);
        } else {
            editBookAction(id, book);
        }
    }, [formType, addBookAction, editBookAction]);

    return (
        <div className="BooksList">
            { loading
                ? <CircularProgress className="circular"/>
                : <Fragment>
                    <button className="add-book" onClick={ addBookHandler }>Add</button>
                    {
                        books.map((book, index) => (
                            <BookItem
                                key={ index }
                                id={ book.id }
                                title={ book.title }
                                description={ book.description }
                                date={ book.date }
                                deleteItem={ deleteBookHandler }
                                editItem={ editBookHandler }
                            />
                        ))
                    }
                    <BookForm
                        type={ formType }
                        openModal={ openModal }
                        setOpenModal={ setOpenModal }
                        handleAction={ actionHandler }
                        book={ editedBook }/>
                </Fragment>
            }
        </div>
    );
};

export default BooksList;
