import React, { useEffect, useState } from "react";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Book, deleteBook, deleteBookReset } from "../booksSlice";
import DeleteBookModal from "./DeleteBookModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

interface BookCardProps {
  book: Book;
  imgSrc: string;
  // onDelete: (bookId: string) => void;
  // onDelete: (book: Book) => void;
  // onView: (book: Book) => void;
  // onEdit: (book: Book) => void;
  // onAdd: (book: Book) => void;
}

const BookSearchCard: React.FC<BookCardProps> = ({ book, imgSrc }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {deleteBookState} = useSelector((state:RootState)=> state.books);
  // const {deleteBookState} = useSelector((state:RootState)=> state.books);
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  // Function to generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= rating ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-4 w-4 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      );
    }
    return stars;
  };



  const onDeleteConfirmed = () => {
    setIsDeleteModalOpen(false);
    console.log("delete confirmed for :> ",book._id);
    dispatch(deleteBook(book._id));
    
  };


  // useEffect(()=>{
  //   console.log("deleteBookState",deleteBookState);
    
  //   if(deleteBookState.status === 'succeeded'){
  //     toast.success("Book deleted successfully");
  //     dispatch(deleteBookReset());
  //   }
  //   // if(deleteBookState.status === 'failed'){
  //   //   toast.error("Failed to delete book");
  //   // }
  // },[])




  return (
    <div className="flex justify-center items-center w-full p-4">
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer">
      {/* Book Cover */}
      <img
        src={imgSrc}
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackImage;
        }}
        alt={`${book.title} cover`}
        className="w-full h-52 object-cover"
      />
  
      {/* Card Content */}
      <div className="p-4">
        {/* Book Title */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
  
        {/* Author */}
        <p className="text-sm text-gray-500 truncate mb-2">by {book.author}</p>
  
        {/* Read Status Badge */}
        {/* <div
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            book.read
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {book.read ? "Read" : "Unread"}
        </div> */}
  
        {/* Rating */}
        {/* <div className="mt-3 flex items-center">
          {renderStars(Math.round(book.rating))}
          <span className="ml-2 text-sm text-gray-600">({book.rating}/5)</span>
        </div> */}
  
        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          {/* <button
            onClick={()=> onView({...book,imgSrc,notes:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]})}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
            title="View Details"
          >
            <EyeIcon className="h-5 w-5" />
            <span className="text-sm">View</span>
          </button> */}
          {/* <button
            onClick={()=> onEdit({...book})}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
            title="Edit Book"
          >
            <PencilIcon className="h-5 w-5" />
            <span className="text-sm">Edit</span>
          </button> */}
          <p></p>
          {/* <button
            // onClick={() => onDelete(book._id)}
            // onClick={() => setIsDeleteModalOpen(true)}
            onClick={() =>onAdd(book) }
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
            title="Delete"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="text-sm">Add Book</span>
          </button> */}
        </div>
      </div>
    </div>
    {/* <DeleteBookModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} book={book} onDelete={(bookId:string)=> {console.log("deleting :> ",bookId); onDeleteConfirmed("")}}  /> */}
    {/* <DeleteBookModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} book={book} onDelete={onDeleteConfirmed}  /> */}
  </div>
  
  );
};

export default BookSearchCard;