import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './Filter.css';
const Filter = ({ closeColumnDropdown }) => {
  const Modal = ({ showModal, toggleModal, children }) => {
    return (
      showModal && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <button className="close-btn" onClick={toggleModal}>X</button>
            {children}
          </div>
        </div>
      )
    );
  };
  const [search, setSearch] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    joining: '', Account: '', Roundedselected: '', Grade: '', Skills: '',
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
    closeColumnDropdown();
  };
  const toggleFilterDropdown = () => { 
    setIsFilterDropdownOpen((prev) => !prev);
    if (!isFilterDropdownOpen) {
      toggleFilterModal();
    }
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitFilters = () => {
    console.log('Applied Filters:', selectedFilters);
    toggleFilterModal();
  };
  const handleResetFilters = () => {
    setSelectedFilters({ joining: '', Account: '', Roundedselected: '', Grade: '', Skills: '' });
    console.log('Filters Reset');
    toggleFilterModal();
  };
  return (
    <div className="search-filter-container">
      <div className="search-container">
        <div className="search-input-container">
          <input 
            type="text" 
            placeholder="Search...." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      </div>
      <div className="dropdown-container">
        <button className="filter" onClick={toggleFilterDropdown}>
          <FaFilter />
        </button>
        {isFilterDropdownOpen && (
          <div>
            <Modal showModal={isFilterModalOpen} toggleModal={toggleFilterModal}>
              <h1>Apply Filter</h1>
              <div className="filter-row">
                <select name="joining" value={selectedFilters.joining} onChange={handleFilterChange}>
                  <option value="">joining</option>
                  <option value="Recent joiners">Recent joiners</option>
                  <option value="15 before">15 days before</option>
                  <option value="before month">before Month</option>
                  <option value="2 months before">2 months before</option>
                </select>
                <select name="Account" value={selectedFilters.Account} onChange={handleFilterChange}>
                  <option value="">Account</option>
                  <option value="Ibm">Ibm</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>
              <div className="filter-row">
                <select name="Roundedselected" value={selectedFilters.Roundedselected} onChange={handleFilterChange}>
                  <option value="">Roundedselected</option>
                  <option value="Ibm">Ibm</option>
                  <option value="capgemini">capgemini</option>
                </select>
                <select name="Grade" value={selectedFilters.Grade} onChange={handleFilterChange}>
                  <option value="">Grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="filter-row">
                <select name="Skills" value={selectedFilters.Skills} onChange={handleFilterChange}>
                  <option value="">Skills</option>
                  <option value="PHP Java Developer">PHP Java Developer</option>
                  <option value="Cloud ISL DevOps">Cloud ISL DevOps</option>
                  <option value="Azure Data engineer">Azure Data engineer</option>
                  <option value="Reactjs">Reactjs</option>
                </select>
                <div className="filter-buttons">
                  <button onClick={handleSubmitFilters}>Apply</button>
                  <button onClick={handleResetFilters} className='reset'>Reset</button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};
export default Filter;
