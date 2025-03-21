import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Action.css';
const Action = ({ rowData }) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
  };
  const handleHistoryClick = () => {
    if (rowData) {
      console.log("rowdata",rowData)
      navigate('/history', { state: { rowData } }); 
    } 
  };
  return (
    <div className="action-container">
      <button className="history-button" onClick={handleDropdownToggle}>
        ...
      </button>
      {dropdown && (
        <div className="dropdown">
          <p className="showdetails">
            Show Details
          </p>
          <p className="history" onClick={handleHistoryClick}>History</p>
        </div>
      )}
    </div>
  );
};
export default Action;
