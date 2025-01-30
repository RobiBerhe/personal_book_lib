import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Book, deleteBookReset, fetchBooks } from "../booksSlice";
import {TrashIcon} from '@heroicons/react/24/solid'
import { useEffect } from "react";
import { toast } from "react-toastify";

interface DeleteBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    book: Book | null
  }




const DeleteBookModal:React.FC<DeleteBookModalProps> = ({isOpen, onClose, onDelete}) => {

    const dispatch = useDispatch<AppDispatch>();
    const {deleteBookState,limit,page} = useSelector((state:RootState) => state.books);

    useEffect(()=>{
        if(deleteBookState.status === "succeeded"){
            dispatch(deleteBookReset());
            dispatch(fetchBooks({page,limit}));
            toast.success("Book deleted successfully");
            console.log("deleteBookState.status",deleteBookState.status);
        }
      },[deleteBookState])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold">Delete Book</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
          {/* Modal Body */}
          <div className="p-4">
            <p>Are you sure you want to delete the book </p>
          </div>
          {/* Modal Footer */}
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-500 hover:text-gray-700">Cancel
              </button>
              <button
              onClick={onDelete}
              className="flex items-center gap-1 p-2 text-white rounded-full transition-colors bg-red-500 hover:bg-red-600">
                <TrashIcon className="h5 w-5"/>
                <span className="ml-2 hidden sm:inline">Delete</span>
              </button>
            </div>
            </div>
            </div>
    )
}


export default DeleteBookModal;