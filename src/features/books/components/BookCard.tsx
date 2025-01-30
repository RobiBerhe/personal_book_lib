import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Book } from "../booksSlice";

interface BookCardProps {
  book: Book;
  imgSrc: string;
  onDelete: (book: Book) => void;
  onView: (book: Book) => void;
  onEdit: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, imgSrc,onDelete,onView,onEdit }) => {
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

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
        <h3 className="text-lg font-semibold text-gray-800 truncate" onClick={()=> onView({...book,imgSrc,notes:"hello \n world \n"})}>{book.title}</h3>
  
        {/* Author */}
        <p className="text-sm text-gray-500 truncate mb-2">by {book.author}</p>
  
        {/* Read Status Badge */}
        <div
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
            book.read
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {book.read ? "Read" : "Unread"}
        </div>
  
        {/* Rating */}
        <div className="mt-3 flex items-center">
          {renderStars(Math.round(book.rating))}
          <span className="ml-2 text-sm text-gray-600">({book.rating}/5)</span>
        </div>
  
        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={()=> onEdit({...book})}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
            title="Edit Book"
          >
            <PencilIcon className="h-5 w-5" />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={() =>onDelete(book) }
            className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default BookCard;