import { SET_BOOKS, ADD_BOOK, EDIT_BOOK, DELETE_BOOK } from '../action-types';
import { getAllBooks, addBookItem, editBookItem, deleteBookItem } from '../../utils/api/books';

const getBooks = () => (dispatch) => dispatch({
    type: SET_BOOKS,
    payload: getAllBooks(),
});

const addBook = book => (dispatch) => dispatch({
    type: ADD_BOOK,
    payload: addBookItem(book),
});

const editBook = (id, book) => (dispatch) => dispatch({
    type: EDIT_BOOK,
    payload: editBookItem(id, book),
});

const deleteBook = id => (dispatch) => dispatch({
    type: DELETE_BOOK,
    payload: deleteBookItem(id.toString()),
});

export {
    getBooks,
    addBook,
    editBook,
    deleteBook,
}
