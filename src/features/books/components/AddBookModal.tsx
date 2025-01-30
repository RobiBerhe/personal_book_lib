import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { addBookReset, BookDetails } from '../booksSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { toast } from 'react-toastify';


interface AddBookModalProps {
    isOpen: boolean;
    bookDetails: BookDetails | null;
    // addBookStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
    isDetailsLoaading:boolean
    onClose: () => void;
    onIsbnSearch: (isbn: string) => void;
    onSubmit: (bookData: AddBookFormInputs) => void;
  }

  interface AddBookFormInputs {
    title: string;
    author: string;
    isbn: string;
    read: boolean;
    rating: number;
  }


const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  isbn: yup
    .string()
    .required("ISBN is required")
    .matches(/^\d{10}|\d{13}$/, "ISBN must be 10 or 13 digits"),
  read: yup.boolean().required("Read status is required"),
  rating: yup
    .number()
    .default(0)
    .transform((value,originalValue) => originalValue.trim() === "" ? 0 : value)
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot exceed 5")
});

const AddBookModal:React.FC<AddBookModalProps> = ({isOpen, onClose, onSubmit,onIsbnSearch,bookDetails,isDetailsLoaading}) => {

  const {addBookState,fetchBookDetailsStatus} = useSelector((state:RootState) => state.books);
  const dispatch = useDispatch<AppDispatch>();


    const {
        register,
        handleSubmit,
        formState: { errors },watch,setValue
      } = useForm<AddBookFormInputs>({
        resolver: yupResolver(schema),
      });

    const isbn = watch("isbn")

    const handleIsbnBlur = () => {
        if (isbn && (isbn.length === 10 || isbn.length === 13)) {
          onIsbnSearch(isbn);
        }
      };

      useEffect(() => {
        if (bookDetails) {
          setValue("title", bookDetails.title);
          setValue("author", bookDetails.author);
        }
      }, [bookDetails, setValue]);


      useEffect(() => {
        console.log("triggered addBookState",addBookState);
        
        if (addBookState.status === "succeeded") {
          dispatch(addBookReset());
          onClose();
          toast.success("Book added successfully!");
        }
      }, [addBookState]);
    

    const onFormSubmit = (data: AddBookFormInputs) => {
        onSubmit(data);
      };

    if(!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold">Add a New Book</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
          <div className='relative'>
          {isDetailsLoaading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-600 animate-pulse"></div>
        )}
          </div>
  
          {/* Modal Body */}
          <form onSubmit={handleSubmit(onFormSubmit)} className="p-4">
             {/* ISBN */}
             <div className="mb-4">
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                ISBN
              </label>
              <input
                id="isbn"
                {...register("isbn")}
                className={`block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                  errors.isbn ? "border-red-500" : ""
                }`}
                onBlur={handleIsbnBlur}
              />
              {errors.isbn && (
                <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
              )}
            </div>
            
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                className={`block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
  
            {/* Author */}
            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                id="author"
                {...register("author")}
                className={`block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                  errors.author ? "border-red-500" : ""
                }`}
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
              )}
            </div>
            {/* Read Status */}
            <div className="mb-4">
              <label htmlFor="read" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    id="read"
                    type="checkbox"
                    {...register("read")}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {watch("read") ? "Read" : "Unread"}
                </span>
              </label>
            </div>
  
            {/* Rating */}
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating (0-5)
              </label>
              <input
                id="rating"
                type="number"
                {...register("rating")}
                min="0"
                max="5"
                className={`block w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-3 -outline-offset-2 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                  errors.rating ? "border-red-500" : ""
                }`}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>
  
            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
               <button
                type="submit"
                disabled={addBookState.status === "loading"}
                className={`w-full rounded py-2 ${
                  addBookState.status === "loading"
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } flex items-center justify-center`}
              >
              {addBookState.status == 'loading' ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) :(
                "Add Book"
              ) }
              </button>
            </div>
              {
                addBookState.error && (
                  <p className="text-red-500 text-sm mt-1">{addBookState.error}</p>
                )
              }
               {
                fetchBookDetailsStatus.error && (
                  <p className="text-red-500 text-sm mt-1">{fetchBookDetailsStatus.error}</p>
                )
              }
          </form>
        </div>
      </div>
    )
}

export default AddBookModal;