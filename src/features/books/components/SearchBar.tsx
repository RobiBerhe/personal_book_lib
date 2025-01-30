



interface SearchBarProps {
    setSearchQuery: (query: string) => void;
    onSubmit: () => void;
  }


const SearchBar:React.FC<SearchBarProps> = ({setSearchQuery,onSubmit})=>{
    return (
        <form className="flex items-center" onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
          <input
            type="text"
            placeholder="Search books..."
            className="p-2 border rounded w-full md:w-1/2"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
  
    )
}


export default SearchBar;