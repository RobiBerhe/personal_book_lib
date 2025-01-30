

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }


const Pagination: React.FC<PaginationProps> = ({totalItems, itemsPerPage, currentPage, setCurrentPage})=>{

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    
    return (
        <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-4 py-2 border rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    )
}

export default  Pagination;