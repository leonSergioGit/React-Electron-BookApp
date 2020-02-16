import React, { useEffect, useState, useContext } from 'react';
import BookContext from '../context/bookContext';
import BookModel from '../model/Book';



const Info = ({ allBooks }) => {

    const bookContext =  useContext(BookContext);
    const { books, getBooks } = bookContext;

    const [listOfBooks, setListOfBooks] = useState();

    //State to manage the information of all the books.
    
    

   
    useEffect(() => {
        console.log(arr)
    }, [allBooks]); 

    //Find a way to improve this part of the code
    let arr = [];
       allBooks.forEach(book => {
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
        <div className="info">
            {arr.length}
            
        </div>
    )
}

export default Info;
