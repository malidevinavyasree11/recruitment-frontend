import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Filter from './Component/Filter/Filter';
import Navbar from './Component/Navbar/Navbar';
import Table from './Component/Table/Table';
import Column from './Component/Column/Column';
import Action from './Component/Action/Action';
const initialColumns = [
  { header: 'Owner', accessorKey: 'owner' },
  { header: 'Account', accessorKey: 'account' },
  { header: 'Positions', accessorKey: 'positions' },
  { header: 'Requirement', accessorKey: 'requirement' },
  { header: 'Grade', accessorKey: 'grade' },
  { header: 'Date', accessorKey: 'date', },
  { header: 'CandidateId', accessorKey: 'candidateId' },
  { header: 'FullName', accessorKey: 'fullName'},
  { header: 'ContactNo', accessorKey: 'contactNo' },
  { header: 'MailId', accessorKey: 'mailId' },
  { header: 'Source', accessorKey: 'source' },
  { header: 'Skills', accessorKey: 'skills' },
  { header: 'TotalExpMonth', accessorKey: 'totalExpMonth' },
  { header: 'TotalExpYear', accessorKey: 'totalExpYear' },
  { header: 'RelevantExpMonth', accessorKey: 'relevantExpMonth' },
  { header: 'RelevantExpYears', accessorKey: 'relevantExpYears' },
  { header: 'CurrentLocation', accessorKey: 'currentLocation' },
  { header: 'PreferredJoiningLocation', accessorKey: 'preferredJoiningLocation' },
  { header: 'TeamSizeOftheProject', accessorKey: 'teamSizeOftheProject' },
  { header: 'ExpectedCTC', accessorKey: 'expectedCTC' },
  { header: 'BUARC', accessorKey: 'BUARC' },
  { header: 'Hike', accessorKey: 'hike' },
  { header: 'ARC', accessorKey: 'ARC' },
  { header: 'ARSSLAB', accessorKey: 'ARSSLAB' },
  { header: 'NoticePeriodDays', accessorKey: 'noticePeriodDays' },
  { header: 'NpRange', accessorKey: 'npRange' },
  { header: 'TentativeDoj', accessorKey: 'tentativeDoj' },
  { header: 'Lwd', accessorKey: 'lwd' },
  { header: 'TentativeJoiningMonth', accessorKey: 'tentativeJoiningMonth' },
  { header: 'ClientOrganization', accessorKey: 'clientorganization' },
  { header: 'Gender', accessorKey: 'gender' },
  { header: 'CurrentCompany', accessorKey: 'currentCompany' },
  { header: 'Currentproject', accessorKey: 'currentproject' },
  { header: 'Rehire', accessorKey: 'rehire' },
  { header: 'Recruiter', accessorKey: 'recruiter' },
  { header: 'TaLead', accessorKey: 'taLead' },
  { header: 'CgScreeningStatus', accessorKey: 'cgScreeningStatus' },
  { header: 'CgScreeningFeedbackDate', accessorKey: 'cgScreeningFeedbackDate' },
  { header: 'CgL1RoundDate', accessorKey: 'cgL1RoundDate' },
  { header: 'CgL1RoundPanel', accessorKey: 'cgL1RoundPanel' },
  { header: 'CgL1RoundResult', accessorKey: 'cgL1RoundResult' },
  { header: 'CgL2RoundDate', accessorKey: 'cgL2RoundDate' },
  { header: 'CgL2RoundPannel', accessorKey: 'cgL2RoundPannel' },
  { header: 'CgL2Roundresult', accessorKey: 'cgL2roundresult' },
  { header: 'ClientSubmissiontype', accessorKey: 'clientSubmissiontype' },
  {header:'ClientSubmissionDate',accessorKey:'clientSubmissionDate'},
  {header:'ClientL1InterviewDate',accessorKey:'clientL1InterviewDate'},
  { header: 'Clientl1interviewResult', accessorKey: 'clientl1InterviewResult' },
  { header: 'Clientl2InterviewDate', accessorKey: 'clientl2InterviewDate' },
  { header: 'Clientl2InterviewResult', accessorKey: 'clientl2InterviewResult' },
  { header: 'MrRoundDate', accessorKey: 'mrRoundDate' },
  { header: 'MrRoundResult', accessorKey: 'mrRoundResult' },
  { header: 'FinalStatus', accessorKey: 'finalStatus' },
  { header: 'Hm', accessorKey: 'hm' },
  { header: 'Project', accessorKey: 'project' },
  { header: 'Remarks', accessorKey: 'remarks' },
  { header: 'Wave', accessorKey: 'wave' },
  { header: '4', accessorKey: '4' },
  { header: '5', accessorKey: '5' },
  { header: '6', accessorKey: '6' },
  { header: 'Category', accessorKey: 'category' },
  { header: 'TentjoiningMonth', accessorKey: 'tentjoiningMonth' },
  {
    header: "Actions",
    accessorKey: 'Actions',
    cell: ({ row }) => (
      <div className="actions">
        <Action rowData={row.original}/>
      </div>
    ),
  },
];
const loadColumnVisibility = () => {
  const savedVisibility = localStorage.getItem('columnVisibility');
  if (savedVisibility) {
    return JSON.parse(savedVisibility);
  }
  return initialColumns.reduce((acc, column) => {
    acc[column.accessorKey] = true;
    return acc;
  }, {});
};
const App = () => {
  const [data, setData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState(loadColumnVisibility);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  useEffect(() => {
    fetch("https://recruitment-tracker-backend.vercel.app/candidates")
      .then(response => {
        console.log("sucessful",response)
        if (!response.ok) {
          console.log('Failed to fetch data');
        }
        return response.json();
      })
      .then(result => {
        const formattedData = result.map(item => ({
          ...item,
          date: new Date(item.date).toDateString(),
          tentativeDoj: new Date(item.tentativeDoj).toDateString(),
          cgL1RoundDate: new Date(item.cgL1RoundDate).toDateString(),
          clientL1InterviewDate:new Date(item.clientL1InterviewDate).toDateString(),
          clientSubmissionDate:new Date(item.clientSubmissionDate).toDateString()
        }));
        console.log("Result",result)
        setData(formattedData);
        console.log("Formatted data",formattedData)
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, []);
  const toggleColumnVisibility = useCallback((columnKey) => {
    setColumnVisibility((prevState) => {
      const newState = { ...prevState, [columnKey]: !prevState[columnKey] };
      localStorage.setItem('columnVisibility', JSON.stringify(newState));
      return newState;
    });
  }, []);
  const resetColumnVisibility = () => {
    const defaultVisibility = initialColumns.reduce((acc, column) => {
      acc[column.accessorKey] = true;
      return acc;
    }, {});
    setColumnVisibility(defaultVisibility);
    localStorage.setItem('columnVisibility', JSON.stringify(defaultVisibility));
  };
  const closeColumnDropdown = () => {
    setIsColumnDropdownOpen(false);
  };
  return (
    <div className="table">
      <Navbar />
      <div className="table-container">
        <div className="dropdown-container">
          <div className='filter-dropdown-wrapper'>
            <Filter closeColumnDropdown={closeColumnDropdown} />
            <button className='column' onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}>
              ...
            </button>
          </div>
          {isColumnDropdownOpen && (
            <Column
              initialColumns={initialColumns}
              columnVisibility={columnVisibility}
              toggleColumnVisibility={toggleColumnVisibility}
              resetColumnVisibility={resetColumnVisibility}
            />
          )}
        </div>
        <Table
          data={data}
          initialColumns={initialColumns}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      </div>
    </div>
  );
};
export default App;