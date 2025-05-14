import React, { useState, useEffect } from 'react';
import './DaysDelta.css';
import { formatDatesInObject } from '../../utils/dateFormat';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
const DaysDelta = () => {
  const [uploads, setUploads] = useState([]);
  const [totalUploads, setTotalUploads] = useState(0);
  const [error, setError] = useState('');
  const [FileIndex, setFileIndex] = useState(null);
  const [CandidateIndex, setCandidateIndex] = useState(null);
  const [recentChanges, setRecentChanges] = useState("");
  const [uploadsLimit, setUploadsLimit] = useState(5);
  const fetchUploads = () => {
    fetch(`https://recruitment-tracker-backend-git-main-deepaks-projects-2ba67437.vercel.app/uploads/recent?limit=${uploadsLimit}`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        if (data && data.uploads) {
          const formattedData = formatDatesInObject(data.uploads);
          setUploads(formattedData);
          setTotalUploads(data.totalUploads || 0);
        }
      })
      .catch(err => {
        setError('Failed to fetch data');
        console.error(err);
      });
  };
  useEffect(() => {
    fetchUploads();
  }, [uploadsLimit]);
  const isRecentChange = (changeDate) => {
    const changeTime = new Date(changeDate);
    const now = new Date();
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(now.getDate() - 5);
    return changeTime >  fiveDaysAgo;
  };
  const toggleFile = (index) => {
    setFileIndex(FileIndex === index ? null : index);
  };
  const toggleCandidate= (index, candidates) => {
    setCandidateIndex(CandidateIndex === index ? null : index);
    if (CandidateIndex !== index) {
      const allChanges=candidates.changes || [];
      const recentChanges = allChanges.filter(change => {
        const dateToCheck = change.changedAt || candidates.fullDetails?.updatedAt;
        return dateToCheck && isRecentChange(dateToCheck);
      }) || [];
      const changesToshow=recentChanges.length >0 ? recentChanges :allChanges;
      setRecentChanges(changesToshow);
    }
  };
  const column = createColumnHelper();
  const columns = [
    column.accessor('field', {
      header: 'Field',
      cell: info => info.getValue(),
    }),
    column.accessor(row => `${row.oldValue} → ${row.newValue}`, {
      id: 'changes',
      header: 'Changes',
      cell: info => info.getValue(),
    }),
  ];
  const table = useReactTable({
    data: recentChanges,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="dashboard">
      <h3>Candidate Changes Dashboard</h3>
      <div className="total-uploads">
        <div><span>Total Uploads: {totalUploads}</span></div>
        <div>
          <select name="Recentuploads" value={uploadsLimit} onChange={(e) => setUploadsLimit(parseInt(e.target.value))}>
            <option value={5}>Last 5 uploads</option>
            <option value={10}>Last 10 uploads</option>
            <option value={15}>Last 15 uploads</option>
            <option value={20}>Last 20 uploads</option>
          </select>
          <button onClick={fetchUploads}>Apply</button>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {uploads.map((upload, fileIndex) => (
        <div className="upload-item" key={fileIndex}>
          <div className="upload-header" onClick={() => toggleFile(fileIndex)}>
            <p>{upload.fileName}</p>
            <p className="candidates">{upload.totalCandidates} candidates</p>
            <p className="changes">{upload.totalChanges} changes</p>
            <p className="date">{upload.uploadDate}</p>
            <div className="arrow">
              <span>{FileIndex === fileIndex ? 'v' : '^'}</span>
            </div>
          </div>
          {FileIndex === fileIndex && (
            <div>
              {upload.candidates && upload.candidates.length > 0 ? (
                upload.candidates.map((candidate, candidateIndex) => (
                  <div className="candidate-item" key={candidateIndex}>
                    <div className="candidate-header" onClick={() => toggleCandidate(candidateIndex, candidate)}>
                      <p>{candidate.candidateName}-{candidate.candidateId}</p>
                      <p className="length">{candidate.changes.length} changes</p>
                      <span className="arrow">{CandidateIndex === candidateIndex ? 'v' : '^'}</span>
                    </div>
                    {CandidateIndex === candidateIndex && (
                      <table className="changes-table">
                        <thead>
                          {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody>
                          {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                              {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {/* {recentChanges.length === 0 && !error && <p>no data available</p>} */}
                  </div>
                ))
              ) : (
                <p>No candidates found in this upload.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default DaysDelta;
