import React, { useEffect, useState } from "react";
// import BooksList from "../ui/BooksList";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import BookCard from "../components/BookCard";
// import Pagination from "../components/Pagination";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddBookModal from "../components/AddBookModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addBook, Book, deleteBook, fetchBookByIsbn, fetchBooks, searchBooks, updateBook } from "../booksSlice";
import DeleteBookModal from "../components/DeleteBookModal";
import ReactPaginate from "react-paginate";
import Pagination from "../components/Pagination";
import ViewBookDetailsModal from "../components/ViewDetailsModal";
import EditBook from "../components/EditBook";
import EditBookModal from "../components/EditBook";
import BookSearchCard from "../components/BookSearchCard";


// export interface Book {
//     id: number;
//     title: string;
//     author: string;
//     isbn: string;
//     read: boolean;
//     rating: number;
//     notes: string;
//   }

const Books: React.FC = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const {books,error,status,olBookDetails,addBookState,isDetailsLoaading,page,limit,total} = useSelector((state:RootState) => state.books);
    // const [books, setBooks] = useState<Book[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen,setIsViewModalOpen] = useState(false);
    const [isEditModalOpen,setIsEditModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchStatus, setSearchStatus] = useState<boolean>(false);
    const [filter, setFilter] = useState<string | null>("");
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;




    // const indexOfLastBook = currentPage * booksPerPage;
    // const indexOfFirstBook = indexOfLastBook - booksPerPage;
    // const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);


    const handleAddBook = (bookData: {
        title: string;
        author: string;
        isbn: string;
        read: boolean;
        rating: number;
      }) => {
        console.log("Book Added:", bookData);
        dispatch(addBook({ ...bookData, _id: '' }));
      };

    const handleEditBook = (book: {
        title: string;
        author: string;
        isbn: string;
        read: boolean;
        rating: number;
        notes: string;
      }) => {
        console.log("Edit Book:", book);
        dispatch(updateBook({ ...book, _id: currentBook?._id || "" }))
      }

    
    const handleIsbnSearch = (isbn: string) => {
        console.log("about to search for isbn:",isbn);
        dispatch(fetchBookByIsbn(isbn));
    }


    const onDeleteConfirmed = (bookId: string) => {
        // Perform the delete operation here
        console.log("Delete confirmed",bookId);
        // You can make an API call or perform any other necessary actions here
        setIsDeleteModalOpen(false);
        // You can update the state or perform any other necessary actions here
    }

    const totalPages = Math.ceil(total / limit);

    // const handlePageChange = (selected: { selected: number }) => {
    //     const newPage = selected.selected + 1; // React Paginate uses 0-based indexing
    //     dispatch(fetchBooks({ page: newPage, limit }));
    // };

    const handlePageChange = (newPage: number) => {
        dispatch(fetchBooks({ page: newPage, limit }));
    };

    const handleSearch = ()=>{
        if(searchQuery == ""){
        setSearchStatus(false);
            dispatch(fetchBooks({page,limit}));
            return;
        }
        setSearchStatus(true);
        console.log("search query :>>>> ",searchQuery);
        dispatch(searchBooks(searchQuery));
    }

    //   useEffect(() => {
    //     dispatch(fetchBooks());
    //   }, [dispatch]);
    useEffect(() => {
        dispatch(fetchBooks({page,limit}));
    }, [dispatch]);


    useEffect(()=>{
        console.log("filter :>>>> ",filter);
        
        if(filter){
            // const filteredBooks = books.filter((book) => book.read === (filter === "read"));
            const filteredBooks = books.filter((book) => {
                if (filter === "read") {
                    return book.read;
                } else if (filter === "unread") {
                    return !book.read;
                } else if (filter === "high-rating") {
                    return book.rating >= 4;
                }
            });
            console.log("filteredBooks",filteredBooks);
            setFilteredBooks(filteredBooks);
        }
    },[filter])

      if (status === "loading") {
        return <div>Loading...</div>;
      }
      if (status === "failed" || error) {
        return <div>Error: {error ? error : ""}</div>;
      }

     


    return (
        <>
            {/* <div className="mt-[-20px]"> */}
            <div className="mt-[-20px]">
        {/* <h1 className="text-2xl font-bold">My Books</h1>
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <SearchBar setSearchQuery={setSearchQuery} />
            <FilterDropdown setFilter={setFilter} />
            <button className="bg-blue-700 text-white px-4 py-4 rounded-full flex items-center justify-center" title="Add a new book" onClick={()=> setIsAddModalOpen(true)}>
                <PlusIcon className="h-5 w-5" />
            </button>
        </div> */}
        {/* Header */}
{/* Header */}
<div className="p-4 bg-white shadow-md space-y-4 sticky top-[-25px] z-10 mb-8">
  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
    Books
  </h1>

  {/* Controls Section */}
  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Search Bar */}
    <div className="w-full md:flex-1">
      <SearchBar setSearchQuery={setSearchQuery} onSubmit={handleSearch}/>
    </div>

    {/* Filter Dropdown */}
    <div className="w-full md:w-auto">
      <FilterDropdown setFilter={setFilter} />
    </div>

    {/* Add Book Button */}
    <button
      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 rounded-full shadow transition duration-150 w-full md:w-auto"
      title="Add a new book"
      onClick={() => setIsAddModalOpen(true)}
    >
      <PlusIcon className="h-6 w-6" />
      <span className="ml-2 hidden sm:inline">Add New Book</span>
    </button>
  </div>
</div>


        {books.length == 0 ? (
            <div className="flex items-center justify-center h-screen">
                <div className="text-gray-500 text-lg">No books found. Please add some books</div>
            </div>
        ) : (

            <>
            {
                !searchStatus ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                        {filter == '' || filter == null ?  books.map((book) => (
                        <BookCard key={book._id} book={book} imgSrc={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} onDelete={(book)=> {setCurrentBook(book); setIsDeleteModalOpen(true)}} onView={(book)=> {setCurrentBook(book); setIsViewModalOpen(true)}} onEdit={(book)=> {setCurrentBook(book); setIsEditModalOpen(true)}} />
                        )) : 
                            filteredBooks.map((book) => (
                                <BookCard key={book._id} book={book} imgSrc={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} onDelete={(book)=> {setCurrentBook(book); setIsDeleteModalOpen(true)}} onView={(book)=> {setCurrentBook(book); setIsViewModalOpen(true)}} onEdit={(book)=> {setCurrentBook(book); setIsEditModalOpen(true)}} />
                            ))
                        }



                        </div>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                        >
                            Previous
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                            Page {page} of {totalPages || 1}
                        </span>
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            disabled={page === totalPages}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Next
                        </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {books.map((book) => (
                                <BookSearchCard key={book._id} book={book} imgSrc={book.imgSrc? book.imgSrc : ""}/>
                            ))}
                        </div>
                    </>
                )}

                
            </>
        )}
        
        {/* <Pagination
            totalItems={filteredBooks.length}
            itemsPerPage={booksPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        /> */}
         {/* <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
            /> */}
        </div>
        {/* <AddBookModal isDetailsLoaading={isDetailsLoaading} addBookStatus={addBook.status} onIsbnSearch={handleIsbnSearch} bookDetails={olBookDetails} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddBook}/> */}
        <AddBookModal isDetailsLoaading={isDetailsLoaading} onIsbnSearch={handleIsbnSearch} bookDetails={olBookDetails} isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddBook}/>
        {/* <DeleteBookModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} book={null} onDelete={onDeleteConfirmed}  /> */}
        <DeleteBookModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} book={currentBook} onDelete={()=> {
                if(currentBook){
                    dispatch(deleteBook(currentBook._id));
                    setCurrentBook(null);
                }
                 setIsDeleteModalOpen(false)
            }}  />
        <ViewBookDetailsModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} book={currentBook} />
        <EditBookModal isOpen={isEditModalOpen} onClose={() => {setIsEditModalOpen(false); dispatch(fetchBooks({page,limit}))}} book={currentBook} onSubmit={handleEditBook} />
        </>
    )
}

export default Books;