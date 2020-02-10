import React, { Fragment, useState, useContext, useEffect } from 'react';
import Book from '../model/Book';
import Warning from "./Warning";
import BookContext from '../context/bookContext';
import { uuid } from 'uuidv4';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



import '../../index.css';

var app = window.require('electron').remote;
const fs = app.require('fs');

// Default material styles
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



// MODAL FUNCTION
const TransitionsModal = () => {

  // UseState hook. A way to manipulate state from a functional component
  const [books, setBook] = useState({
      id: '',
      name: '',
      language: '',
      author: '',
      date: '',
      finished: false 
  });

  //UseState hooks to check input validation
  const [validName, setValidName] = useState(false);
  const [validAuthor, setValidAuthor] = useState(false);
  const [validLanguage, setValidLanguage] = useState(false);
  const [validDate, setValidDate] = useState(false);


 
  // Context to access to the global state
  const bookContext =  useContext(BookContext);
  const { addBooks, getBooks } = bookContext;

  //Use effect runs after every render
  //We pass as array values the state that we want useEffect to check
  useEffect(() => {
    saveData();
  }, [validName, validAuthor, validLanguage, validDate]);

  // Submit function
  const onSubmit = e =>  {
    e.preventDefault();

      if(books.name.trim() == ""){
        setValidName(false);
      } else {
        setValidName(true);
      }

      if(books.author.trim() == ""){
        setValidAuthor(false);
      } else {
        setValidAuthor(true);
      }
      if(books.language.trim() == ""){
        setValidLanguage(false);
      } else {
        setValidLanguage(true);
      }

      if(books.date.trim() == ""){
        setValidDate(false);
      } else {
        setValidDate(true);
      }
    } 
  
    //Function that save our book in a file and updates our state
   const saveData = () => {
    if(validName == true && validAuthor == true && validLanguage == true && validDate == true){
      addBooks(new Book(uuid(), books.name, books.language, books.author, books.date, books.finished));
      setBook({
        id: '',
        name: '',
        language: '',
        author: '',
        date: '',
        finished: false
      })
  
      fs.appendFile('books.txt', `${books.name};${books.author};${books.language};${books.date};${books.finished}\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      handleClose();
    }
  }

  //On change function to update this component's state with the new book
  const onChange = e => {
    setBook({ ...books, [e.target.name]: e.target.value })
  };

  // Current date
  const date = new Date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const dateCompleted = `${year}-${month}-${day}`;


  // Material-UI functionality and MODAL
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <div className='inputText'>
                <Warning message={validName ? "" : "Add a book name"} />
                <TextField 
                  id="standard-basic" 
                  label="Book name"
                  className="inputText"
                  onChange={onChange}
                  name="name" 
                />
              </div>
              <div className='inputText'>
              <Warning message={validAuthor ? "" : "Add an author"} />
                <TextField 
                  id="standard-basic2" 
                  label="Language"
                  className="inputText"
                  onChange={onChange}
                  name="author"  
                />
              </div>
              <div className='inputText'>
              <Warning message={validLanguage ? "" : "Add a language"} />
                <TextField 
                  id="standard-basic3" 
                  label="name"
                  className="inputText"
                  onChange={onChange}
                  name="language"  
                />
              </div>
              <div>
              <Warning message={validDate ? "" : "Add a date"} />
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue={dateCompleted}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
                  name="date" 
                />
              </div>
              <div>
                <label htmlFor="">Yes</label>      
                <input type="radio" name="finished" value={true} onChange={onChange}/>
                <label htmlFor="">No</label>
                <input type="radio" name="finished" value={false} checked onChange={onChange}/>
              </div>
              <Button 
                variant="contained" 
                color="primary"
                id="button"
                onClick={onSubmit}
              >
                Add book
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;