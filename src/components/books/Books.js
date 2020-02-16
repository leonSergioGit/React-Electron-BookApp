import React, { Fragment, useState, useContext, useEffect } from 'react';
import BookContext from '../context/bookContext';
import BookItem from './BookItem';
import BookModel from '../model/Book';

var app = window.require('electron').remote;
const fs = app.require('fs');

const Books = ({ allBooks }) => {

    const bookContext =  useContext(BookContext);
    const { books, getBooks, trying } = bookContext;

    
    const [listOfBooks, setListOfBooks] = useState(fs.readFileSync('books.txt','utf8').split('\n'));

    

    let p = allBooks;
    
    //Use effect hook. Runs everytime the value we pass in the array changes
    //So it runs everytime we add a new book. Reads the file, updates the local state and shows instantaneously the book added
    useEffect(() => {
        let bookData = fs.readFileSync('books.txt','utf8').split('\n');
        setListOfBooks(bookData); 
    }, [p]);

    


        let arr = [];
        listOfBooks.forEach(book => {
            let indexName = book.indexOf(";", 0);
            let firstIndexLanguage = book.indexOf(";") + 1;
            let secondIndexLanguage = book.indexOf(";", book.indexOf(";") + 2);
            let firstIndexAuthor = book.indexOf(";", secondIndexLanguage) + 1;
            let secondIndexAuthor = book.indexOf(";", firstIndexAuthor);
            let firstIndexDate = book.indexOf(";", secondIndexAuthor) + 1;
            let secondIndexDate = book.indexOf(";", firstIndexDate);
            let firstIndexCompleted = book.indexOf(";", secondIndexDate) + 1;
            let secondIndexCompleted = book.indexOf(";", firstIndexCompleted);
            let firstIndexId = book.indexOf(";", secondIndexCompleted) + 1;
            let secondIndexId = book.length;
      
    
            let name = book.substring(0, indexName);
            let language = book.substring(firstIndexLanguage, secondIndexLanguage);
            let author = book.substring( firstIndexAuthor, secondIndexAuthor);
            let date = book.substring(firstIndexDate, secondIndexDate);
            let completed = book.substring(firstIndexCompleted, secondIndexCompleted);
            let id = book.substring(firstIndexId, secondIndexId);
    
            
    
            arr.push(new BookModel(id, name, language, author, date, completed));   

        })


    return (
        <div className="bookContainer">
            <BookItem bookArr={arr} />
        </div>
    )
}

export default Books;