import {
    ADD_BOOK,
    GET_BOOKS,
    DELETE_BOOK,
    UPDATE_BOOK
} from './types';

export default (state, action) => {
    switch(action.type){
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload
            }
        case ADD_BOOK:
            return {
              ...state,
              books: [action.payload, ...state.books]
            };
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map(book => book.id === action.payload.id ? 
                    action.payload : book
                )
            }
        case DELETE_BOOK:
            return {
                ...state,
                bookss: state.books.filter(book => book.id !== action.payload)
            };
        default:
                return state;
    }
}