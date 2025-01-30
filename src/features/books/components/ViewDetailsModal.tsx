import { Book } from "../booksSlice"


interface ViewBookDetailsModalProps{
    isOpen:boolean
    book:Book | null
    onClose:()=>void
}

const ViewBookDetailsModal:React.FC<ViewBookDetailsModalProps> = ({isOpen, book,onClose}) => {

    if(!isOpen) return null;


    return (
        <>
             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-2xl font-bold">Book Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        ✖
                    </button>
                    </div>

                    {/* Book Content */}
                    <div className="p-8 flex gap-6">
                    {/* Book Image */}
                    <img
                        src={book?.imgSrc ? book.imgSrc : "https://via.placeholder.com/150?text=No+Image"}
                        alt={book?.title}
                        className="w-56 h-72 object-cover rounded-lg shadow-lg"
                    />

                    {/* Book Details */}
                    <div className="flex flex-col w-full">
                        <h2 className="text-3xl font-bold">{book?.title}</h2>
                        <p className="text-gray-600 text-lg mt-1">by {book?.author}</p>

                        <div className="flex items-center gap-2 mt-4">
                        <span className="text-yellow-500 text-xl">⭐ {book?.rating}</span>
                        </div>

                        {/* <p className="text-gray-700 mt-6 text-lg">
                        <strong>Notes:</strong> {book?.notes || "No notes available."}
                        </p> */}
                       <div className="mt-6 w-full">
                            <h4 className="text-lg font-semibold">Notes:</h4>
                            <div className="mt-2 p-4 bg-gray-100 rounded-md max-h-40 overflow-y-auto w-[100%] mx-auto">
                                {/* {book?.notes && book.notes.length > 0 ? (
                                <ul className="list-disc list-inside space-y-2">
                                    {book.notes.map((note, index) => (
                                    <li key={index} className="text-gray-700">{note}</li>
                                    ))}
                                </ul>
                                ) : (
                                <p className="text-gray-500">No notes available.</p>
                                )} */}
                                 <p className="text-gray-700 mt-6 text-lg">
                                <strong>Notes:</strong> {book?.notes || "No notes available."}
                                </p>
                            </div>
                        </div>  
                    </div>
                    </div>

                    {/* Footer - Close Button */}
                    <div className="flex justify-end p-6 border-t">
                    <button className="p-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-md transition" onClick={onClose}>
                        Close
                    </button>
                    </div>
                </div>
                </div>
       
        </>
    )
}


export default ViewBookDetailsModal