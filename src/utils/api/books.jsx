import { db } from './database';
import { COLLECTION_BOOKS } from "../constants";

const getAllBooks = async () => {
    const books = [];
    await db.collection(COLLECTION_BOOKS).get().then(docs => {
        return docs.forEach(doc => {
            books.push({ id: doc.id, ...doc.data(), date: doc.data().date.toDate() });
        });
    });

    return books;
};

const addBookItem = async book => {
    let newBook = {...book};
    await db.collection(COLLECTION_BOOKS).add(book).then(doc => {
        newBook = {id: doc.id, ...newBook};
    });

    return newBook;
};

const editBookItem = async (id, book) => {
    await db.collection(COLLECTION_BOOKS).doc(id).set(book);
    return {id, ...book};
};

const deleteBookItem = async id => {
    await db.collection(COLLECTION_BOOKS).doc(id).delete();
    return id;
};

export {
    getAllBooks,
    addBookItem,
    editBookItem,
    deleteBookItem,
};
