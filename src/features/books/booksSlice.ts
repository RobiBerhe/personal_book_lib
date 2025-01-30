import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  read: boolean;
  notes?:string
  imgSrc?:string
  rating: number;
}


export interface BookDetails {
  title: string;
  author: string;
}


interface BooksState {
  books: Book[];
  olBookDetails:BookDetails | null, //open lib book details
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  addBookState: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  },
  editBookState: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  },
  fetchBookDetailsStatus:{
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null,
  },
  deleteBookState: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  },
  searchBooksState:{
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  isDetailsLoaading:boolean,
  error: string | null;
  page:number,
  limit:number,
  total:number
}

const initialState: BooksState = {
  books: [],
  olBookDetails:null,
  status: 'idle',
  addBookState: {
    status: 'idle',
    error: null,
  },
  editBookState: {
    status: 'idle',
    error: null,
  },
  fetchBookDetailsStatus:{
    status: 'idle',
    error: null,
  },
  deleteBookState: {
    status: 'idle',
    error: null,
  },
  searchBooksState:{
    status: 'idle',
    error: null,
  },
  isDetailsLoaading:false,
  error: null,
  page:1,
  limit:4,
  total:0
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooks: (state,action: PayloadAction<{page:number,limit:number}>) => {
      state.status = 'loading';
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.error = null;
    },
    fetchBookByIsbn: (state, action: PayloadAction<string>) => {
        state.isDetailsLoaading = true;
        state.fetchBookDetailsStatus.error = null;
        state.fetchBookDetailsStatus.status = "loading";
    },
    fetchBookByIsbnSuccess: (state, action: PayloadAction<BookDetails>) => {
      state.isDetailsLoaading = false;
      console.log("action.payload",action.payload);
      state.olBookDetails = action.payload;
    },
    fetchBookByIsbnFailure: (state, action: PayloadAction<string>) => {
        state.fetchBookDetailsStatus.error = action.payload;
    },
    fetchBooksSuccess: (state, action: PayloadAction<{books:Book[],total:number}>) => {
      state.status = 'succeeded';
      state.books = action.payload.books;
      state.total = action.payload.total;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
    state.addBookState.status = 'loading';
    state.addBookState.error = null;
    },
    addBookSuccess: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      state.addBookState.status = 'succeeded';
      state.addBookState.error = null;
    },
    addBookFailure: (state, action: PayloadAction<string>) => {
      state.addBookState.status = 'failed';
      state.addBookState.error = action.payload;
    },
    addBookReset: (state) => {
      state.addBookState.status = 'idle';
      state.addBookState.error = null;
    },
    editBookReset: (state) => {
      state.editBookState.status = 'idle';
      state.editBookState.error = null;
    },
    updateBook: (state, action: PayloadAction<Book>) => {
        state.editBookState.status = 'loading';
        state.editBookState.error = null;
    },
    updateBookSuccess: (state, action: PayloadAction<Book>) => {
        state.editBookState.status = 'succeeded';
        state.editBookState.error = null;
    },
    updateBookFailure: (state, action: PayloadAction<string>) => {
        state.editBookState.status = 'failed';
        state.editBookState.error = action.payload;
    },
    deleteBook: (state, action: PayloadAction<string>) => {
        state.deleteBookState.status = 'loading';
        state.deleteBookState.error = null;
    },
    deleteBookSuccess: (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
        console.log("payload for success :> ",action.payload);
        
        state.deleteBookState.status = 'succeeded';
    },
    deleteBookFailure: (state, action: PayloadAction<string>) => {
        state.deleteBookState.status = 'failed';
        state.deleteBookState.error = action.payload;
    }, 
    // reset the state of deleteBookState
    deleteBookReset: (state) => {
        state.deleteBookState.status = 'idle';
        state.deleteBookState.error = null;
    },
    searchBooks: (state, action: PayloadAction<string>) => {
        state.searchBooksState.status = 'loading';
        state.searchBooksState.error = null;
    },
    searchBooksSuccess: (state, action: PayloadAction<{books:Book[],total:number}>) => {
        state.searchBooksState.status = 'succeeded';
        state.books = action.payload.books;
        state.total = action.payload.total;
    },
    searchBooksFailure: (state, action: PayloadAction<string>) => {
        state.searchBooksState.status = 'failed';
        state.searchBooksState.error = action.payload;
    }
}
});
export const {
    fetchBooks,
    fetchBooksSuccess,
    fetchBooksFailure,
    addBook,
    updateBook,
    deleteBook,
    fetchBookByIsbnSuccess,
    fetchBookByIsbnFailure,
    fetchBookByIsbn,
    addBookFailure,
    addBookSuccess,
    deleteBookFailure,
    deleteBookSuccess,
    deleteBookReset,
    addBookReset,
    editBookReset,
    updateBookFailure,
    updateBookSuccess,
    searchBooks,
    searchBooksFailure,
    searchBooksSuccess
} = booksSlice.actions;

export default booksSlice.reducer;