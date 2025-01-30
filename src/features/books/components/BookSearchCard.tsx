import React, {  } from "react";
import { Book } from "../booksSlice";

interface BookCardProps {
  book: Book;
  imgSrc: string;
}

const BookSearchCard: React.FC<BookCardProps> = ({ book, imgSrc }) => {
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";



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
  
      </div>
    </div>
  </div>
  
  );
};

export default BookSearchCard;