import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addBook, addBookFailure, addBookSuccess, Book, BookDetails, deleteBook, deleteBookFailure, deleteBookSuccess, fetchBookByIsbn, fetchBookByIsbnFailure, fetchBookByIsbnSuccess, fetchBooks, fetchBooksFailure, fetchBooksSuccess, fetchDashboardStats, fetchDashboardStatsFailure, fetchDashboardStatsSuccess, searchBooks, searchBooksFailure, searchBooksSuccess, updateBook, updateBookFailure, updateBookSuccess } from "./booksSlice";


const API_BASE_URL = "http://localhost:8081/api";
const API_BASE_OPEN_LIB = "https://openlibrary.org"


function* fetchBooksSaga(action: {payload:{page:number,limit:number},type:string}) {
    try {
        const token:string = yield select((state) => state.auth.token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response:{data:{books:{docs:Book[],totalDocs:number}}} =  yield call(axios.get<Book[]>, `${API_BASE_URL}/books?page=${action.payload.page}&limit=${action.payload.limit}`,config);
        yield put(fetchBooksSuccess({books:response.data.books.docs,total:response.data.books.totalDocs}));
    } catch (error:any) {
        console.log("[fetchBooksSaga]:",error);
        yield put(fetchBooksFailure(error.message));
    }
}


function* fetchBookByIsbnSaga(action:{payload:string,type:string}) {
    try {
        const details:{data:BookDetails} =  yield call(axios.get<Book>, `${API_BASE_OPEN_LIB}/isbn/${action.payload}.json`);
        const authRes: {data:{docs:[{author_name:string}]}} =  yield call(axios.get<any>, `${API_BASE_OPEN_LIB}/search.json?isbn=/${action.payload}.json`);
        details.data.author = authRes.data.docs[0].author_name[0];
        yield put(fetchBookByIsbnSuccess(details.data));
    } catch (error:any) {
        const {response} = error;
        console.log("err [fetchBooksSaga]:",response);
        if(response.status == 404){
            yield put(fetchBookByIsbnFailure("book with the specified isbn not found, please fill in the details"));
            return
        }
        yield put(fetchBookByIsbnFailure(error.message));
    }
}


function* addBookSaga(action:{payload:Book,type:string}) {
    try {
        const token:string = yield select((state) => state.auth.token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const {author,isbn,rating,read,title} = action.payload
        const response:{data:{book:Book}} =  yield call(axios.post<Book>, `${API_BASE_URL}/books`,{author,isbn,rating,read,title},config);
        yield put(addBookSuccess(response.data.book));
    } catch (error:any) {
        console.log("err [addbooksaga]:",error);
        const {response} = error;
        const data:{data:{error:{message:string}}} = response;
        console.log("err response [addbooksaga]:",data.data.error.message);
        yield put(addBookFailure(data.data.error.message));
    }
}

function *updateBookSaga(action:{payload:Book,type:string}) {
    try {
        const token:string = yield select((state) => state.auth.token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const {author,isbn,rating,read,title,notes,_id} = action.payload
        const response:{data:{book:Book}} =  yield call(axios.put<Book>, `${API_BASE_URL}/books/${_id}`,{author,isbn,rating,read,title,notes},config);
        yield put(updateBookSuccess(response.data.book));
    } catch (error:any) {
        console.log("err [updatebooksaga]:",error);
        const {response} = error;
        const data:{data:{error:{message:string}}} = response;
        console.log("err response [updatebooksaga]:",data.data.error.message);
        yield put(updateBookFailure(data.data.error.message));
    }
}


function* deleteBookSaga(action:{payload:string,type:string}) {
    try {
        const token:string = yield select((state) => state.auth.token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response:{data:{message:string}} =  yield call(axios.delete<Book>, `${API_BASE_URL}/books/${action.payload}`,config);
        yield put(deleteBookSuccess(response.data.message));
    } catch (error:any) {
        console.log("err [deletebooksaga]:",error);
        const {response} = error;
        const data:{data:{error:{message:string}}} = response;
        console.log("err response [deletebooksaga]:",data.data.error.message);
        yield put(deleteBookFailure(data.data.error.message));
    }
}


function * searchBooksSaga(action:{payload:string,type:string}) {
    try {
        const response: {data:{docs:[{author_name:string,title:string,cover_i:number}]}} =  yield call(axios.get<any>, `${API_BASE_OPEN_LIB}/search.json?q=${action.payload}`);
        const books:Book[] = response.data.docs.map((book,i)=>{
            return {
                title:book.title,
                author:book.author_name,
                isbn:"",
                read:false,
                rating:0,
                notes:"",
                imgSrc:`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
                _id:i.toString()
            }
        })
        yield put(searchBooksSuccess({books,total:books.length}));
    } catch (error:any) {
        console.log("err [searchBooksSaga]:",error);
        yield put(searchBooksFailure(error.message));
    }
}


function * fetchDashboardStatsSaga(action:{payload:string,type:string}) {
    try {
        const {token} = yield select((state) => state.auth);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const userId = localStorage.getItem("userId");
        const response:{data:{booksStats:[{totalBooks:number,totalRead:number,totalUnread:number}]}} =  yield call(axios.get<any>, `${API_BASE_URL}/books/stats/${userId}`,config);
        yield put(fetchDashboardStatsSuccess({totalBooks:response.data.booksStats[0].totalBooks,totalReadBooks:response.data.booksStats[0].totalRead,totalUnreadBooks:response.data.booksStats[0].totalUnread}));
    } catch (error:any) {
        console.log("err [fetchDashboardStatsSaga]:",error);
        yield put(fetchDashboardStatsFailure(error.message));
    }
}

export default function* booksSaga() {
    yield takeLatest(fetchBooks.type, fetchBooksSaga);
    yield takeLatest(fetchBookByIsbn.type, fetchBookByIsbnSaga);
    yield takeLatest(addBook.type, addBookSaga);
    yield takeLatest(deleteBook.type, deleteBookSaga);
    yield takeLatest(updateBook.type, updateBookSaga);
    yield takeLatest(searchBooks.type, searchBooksSaga);
    yield takeLatest(fetchDashboardStats.type, fetchDashboardStatsSaga);
}