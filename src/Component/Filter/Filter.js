import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './Filter.css';
import { formatDatesInObject } from '../../utils/dateFormat';
const Filter = ({ closeColumnDropdown, setFilteredData }) => {
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
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    joining: '',
    Account: '',
    Roundedselected: '',
    Grade: '',
    Skills: '',
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const toggleFilterModal = () => {
    setIsFilterModalOpen(prev => !prev);
    closeColumnDropdown();
  };
  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(prev => !prev);
    if (!isFilterDropdownOpen) {
      toggleFilterModal();
    }
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters(prev => ({ ...prev, [name]: value }));
  };
  const filterKeyMap = {
    joining: 'joining',
    Account: 'account',
    Roundedselected: 'roundSelected',
    Grade: 'grade',
    Skills: 'skills'
  };
  const handleSubmitFilters = async () => {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(selectedFilters).forEach(key => {
        const value = selectedFilters[key];
        if (value) {
          const backend = filterKeyMap[key] || key;
          queryParams.append(backend, value);
        }
      });
      console.log("selected",selectedFilters)
      const url = `https://recruitment-tracker-backend-git-main-deepaks-projects-2ba67437.vercel.app/candidates?${queryParams.toString()}`;
      const response = await fetch(url);
      const result = await response.json();
      if (Array.isArray(result.candidates)) {
        const formattedCandidates = result.candidates.map(candidate =>
          formatDatesInObject(candidate)
        );
        setData(formattedCandidates);
        setFilteredData(formattedCandidates);
        const filtered = formattedCandidates.filter(item => {
          return (
            (selectedFilters.joining === '' || item.joining === selectedFilters.joining) &&
            (selectedFilters.Account === '' || item.account === selectedFilters.Account) &&
            (selectedFilters.Roundedselected === '' || item.roundSelected === selectedFilters.Roundedselected) &&
            (selectedFilters.Grade === '' || item.grade === selectedFilters.Grade) &&
            (selectedFilters.Skills === '' || item.skills.includes(selectedFilters.Skills))
          );
        });
        console.log('Filtered Data:', filtered);
        setFilteredData(filtered);
      } else {
        console.log('error', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    toggleFilterModal();
  };
  const handleResetFilters = () => {
    setSelectedFilters({ joining: '', Account: '', Roundedselected: '', Grade: '', Skills: '' });
    setFilteredData(datas);
    toggleFilterModal();
  };
  return (
    <div className="search-filter-container">
      <div className="search-container">
        <div className="search-input-container">
          <input type="text" placeholder="Search...." value={search} onChange={(e) => setSearch(e.target.value)} />
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
                  <option value="">Joining</option>
                  <option value="1">1</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                <select name="Account" value={selectedFilters.Account} onChange={handleFilterChange}>
                  <option value="">Account</option>
                  <option value="IBM">IBM</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>
              <div className="filter-row">
                <select name="Roundedselected" value={selectedFilters.Roundedselected} onChange={handleFilterChange}>
                  <option value="">Roundedselected</option>
                  <option value="IBM">IBM</option>
                  <option value="capgemini">Capgemini</option>
                </select>
                <select name="Grade" value={selectedFilters.Grade} onChange={handleFilterChange}>
                  <option value="">Grade</option>
                  <option value="A">A</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
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
                  <button onClick={handleResetFilters} className="reset">Reset</button>
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
