import React, { useReducer } from 'react';
import BookContext from './bookContext';
import bookReducer from './bookReducer';
import {
    GET_BOOKS,
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK
} from './types';

const BookState = props => {
    const initialState = {
        books: []
    }

    const [state, dispatch] = useReducer(bookReducer, initialState);


    //Add contact
    const addBooks = book => {
        dispatch({ type: ADD_BOOK, payload: book });
    }

    const getBooks = () => {
        let books = state.books;
        dispatch({ type: GET_BOOKS, payload: books });
        console.log(state.books)
    }


    return (
        <BookContext.Provider
          value={{
              books: state.books,
              addBooks,
              getBooks
          }}
        >
            { props.children }
        </BookContext.Provider>
    )
};

export default BookState;