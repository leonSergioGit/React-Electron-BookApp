import React, { useReducer } from 'react';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import BookModel from '../model/Book';
import {
    GET_BOOKS,
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK
} from './types';

var app = window.require('electron').remote;
const fs = app.require('fs');

const BookState = props => {
    const initialState = {
        books: []
    }

    const [state, dispatch] = useReducer(bookReducer, initialState);


    //Add contact
    const addBooks = book => {
        dispatch({ type: ADD_BOOK, payload: book });
    }

    const trying = () => {
        return state.books;
    }
    const getBooks = () => {
        let books = fs.readFileSync('books.txt','utf8').split("\n");
        dispatch({ type: GET_BOOKS, payload: books });
    }

    const checkBooks = () => {
        console.log(state.books)
    }

    return (
        <BookContext.Provider
          value={{
              books: state.books,
              addBooks,
              getBooks,
              checkBooks,
              trying
          }}
        >
            { props.children }
        </BookContext.Provider>
    )
};

export default BookState;