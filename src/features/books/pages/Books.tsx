import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import BookCard from "../components/BookCard";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddBookModal from "../components/AddBookModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addBook, Book, deleteBook, fetchBookByIsbn, fetchBooks, searchBooks, updateBook } from "../booksSlice";
import DeleteBookModal from "../components/DeleteBookModal";
import ViewBookDetailsModal from "../components/ViewDetailsModal";
import EditBookModal from "../components/EditBook";
import BookSearchCard from "../components/BookSearchCard";

const Books: React.FC = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const {books,error,status,olBookDetails,isDetailsLoaading,page,limit,total} = useSelector((state:RootState) => state.books);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen,setIsViewModalOpen] = useState(false);
    const [isEditModalOpen,setIsEditModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchStatus, setSearchStatus] = useState<boolean>(false);
    const [filter, setFilter] = useState<string | null>("");
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    const handleAddBook = (bookData: {
        title: string;
        author: string;
        isbn: string;
        read: boolean;
        rating: number;
      }) => {
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
        dispatch(updateBook({ ...book, _id: currentBook?._id || "" }))
      }

    
    const handleIsbnSearch = (isbn: string) => {
        dispatch(fetchBookByIsbn(isbn));
    }


    const totalPages = Math.ceil(total / limit);

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
        dispatch(searchBooks(searchQuery));
    }

    useEffect(() => {
        dispatch(fetchBooks({page,limit}));
    }, [dispatch]);


    useEffect(()=>{
        
        if(filter){
            const filteredBooks = books.filter((book) => {
                if (filter === "read") {
                    return book.read;
                } else if (filter === "unread") {
                    return !book.read;
                } else if (filter === "high-rating") {
                    return book.rating >= 4;
                }
            });
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
            <div className="mt-[-20px]">
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

        </div>
        <AddBookModal isDetailsLoaading={isDetailsLoaading} onIsbnSearch={handleIsbnSearch} bookDetails={olBookDetails} isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddBook}/>
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