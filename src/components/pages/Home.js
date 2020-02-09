import React, { useContext, useEffect } from 'react';
import Modal from './AddBookModal';
import Book from '../model/Book';
import BookContext from '../context/bookContext';

const Home = () => {
    const bookContext =  useContext(BookContext);


    const { addBooks, getBooks } = bookContext;

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line
    }, []);


    const onSubmit = (e) =>  {
        e.preventDefault();
        addBooks(new Book("23123", "Norwegian Wood", "Haruki Murakami", "Japanese", "June", false));
    }

    const checking = () => {
        getBooks();
    }

    return (
        <div>
            <h1>HOME</h1>
            <button onClick={onSubmit}>Show modal</button>
            <button onClick={checking}>Lol</button>
            <Modal />
        </div>
    )
}

export default Home;