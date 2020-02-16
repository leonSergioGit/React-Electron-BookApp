import React, { useState, useEffect, useContext, Fragment } from 'react';
import BookContext from '../context/bookContext';
import BookModel from '../model/Book';

import '../../index.css';

const BookItem = ({ bookArr }) => {

    const bookContext =  useContext(BookContext);
    const { books, getBooks } = bookContext;

    const [bookFile, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line
    }, []);




    return (
       <Fragment>
           {bookArr.map(book =>
                <div key={book.id} className="bookElement">
                        <h1>{book.name}</h1>
                        <p><b>Author:</b> {book.author}</p>
                        <p><b>Language:</b> {book.language}</p>
                        <p><b>Date:</b> {book.date}</p>
                        <p><b>State:</b> {book.finished == "true" ? "Completed" : "Not yet"}</p>
                </div>
            )}
        </Fragment>
        
    )
}

export default BookItem;
