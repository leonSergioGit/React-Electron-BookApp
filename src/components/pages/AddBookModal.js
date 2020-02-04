import React, { useState, useContext, useEffect } from 'react';
import Book from '../model/Book';
import BookContext from '../context/bookContext';
import { uuid } from 'uuidv4';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import '../../index.css';



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

  // Use state hook. A way to manipulate state from a functional component
  const [books, setBook] = useState({
      id: '',
      name: '',
      language: '',
      author: '',
      date: '' 
  });

  // Context to access to the global state
  const bookContext =  useContext(BookContext);
  const { addBooks, getBooks } = bookContext;

 
  // Submit function
  const onSubmit = e =>  {
    e.preventDefault();
    addBooks(new Book(uuid(), books.name, books.language, books.author, books.date));
  }

  //On change function to update this component's state with the new book
  const onChange = e => setBook({ ...books, [e.target.name]: e.target.value });

  // Current date
  const date = new Date;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const dateCompleted = `${year}-${month}-${day}`;


  // Material-UI functionality
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
                <TextField 
                  id="standard-basic" 
                  label="Book name"
                  className="inputText"
                  onChange={onChange}
                  name="name" 
                />
              </div>
              <div className='inputText'>
                <TextField 
                  id="standard-basic2" 
                  label="Language"
                  className="inputText"
                  onChange={onChange}
                  name="author"  
                />
              </div>
              <div className='inputText'>
                <TextField 
                  id="standard-basic3" 
                  label="name"
                  className="inputText"
                  onChange={onChange}
                  name="language"  
                />
              </div>
              <div>
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