import React, { useCallback } from 'react';
import moment from 'moment';

import './BookItem.css';

const BookItem = ({id, title, description, date, deleteItem, editItem}) => {

    const editBookItem = useCallback(() => editItem(id), [editItem, id]);
    const deleteBookItem = useCallback(() => deleteItem(id), [deleteItem, id]);

    return (
        <div className="BookItem">
            <header>{title}</header>
            <section>
                <h5>{moment(date).format('DD/MM/YYYY')}</h5>
                <p>{description} </p>
            </section>
            <footer>
                <button onClick={editBookItem}>Edit</button>
                <button onClick={deleteBookItem}>Delete</button>
            </footer>
        </div>
    );
};

export default BookItem;
