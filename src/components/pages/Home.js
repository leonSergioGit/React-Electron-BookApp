import React, { useContext, useEffect, useState } from 'react';
import Modal from './AddBookModal';
import Book from '../model/Book';
import BookContext from '../context/bookContext';
import Books from '../books/Books';
import Info from '../books/Info';

const Home = () => {
    const bookContext =  useContext(BookContext);


    const { addBooks, getBooks, checkBooks, books } = bookContext;

    useEffect(() => {
        
        getBooks();
        checkBooks();
     }, []);


    return (
        <div>
            <Info allBooks={books} />
            <Modal />
            <Books allBooks={books} />
        </div>
    )
}

export default Home;