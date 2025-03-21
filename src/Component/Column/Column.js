import React, { useState, useRef, useEffect } from 'react';
import './Column.css';
const Column = ({ initialColumns, columnVisibility, toggleColumnVisibility, resetColumnVisibility }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div>
      {isDropdownVisible && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <button className="reset" onClick={resetColumnVisibility}>Reset</button>
          {Array.isArray(initialColumns) && initialColumns.length > 0 ? (
            initialColumns.map((column) => column.accessorKey && (
              <p key={column.accessorKey}>
                {columnVisibility[column.accessorKey] !== undefined && (
                  <input
                    type="checkbox"
                    checked={columnVisibility[column.accessorKey] || false}
                    onChange={() => toggleColumnVisibility(column.accessorKey)}
                  />
                )}
                {column.header}
              </p>
            ))
          ) : (
            <p>No columns available</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Column;
