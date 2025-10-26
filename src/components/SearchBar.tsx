import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar tarea por título..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;