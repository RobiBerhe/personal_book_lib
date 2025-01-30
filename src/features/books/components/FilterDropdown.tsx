

interface FilterDropdownProps {
    setFilter: (filter: string | null) => void;
  }

const FilterDropdown:React.FC<FilterDropdownProps> = ({setFilter})=>{
    return (
        <select
        className="p-2 border rounded"
        onChange={(e) => setFilter(e.target.value || null)}
      >
        <option value="">All Books</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
        <option value="high-rating">High Rating (4+ stars)</option>
      </select>
    )
}


export default FilterDropdown;