import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import './History.css';
const History = () => {
  const location = useLocation();
  const [historyData, setHistoryData] = useState([]);
  const { rowData } = location.state;
  const fullName = rowData?.fullName;
  useEffect(() => {
    if (rowData) {
      console.log("rowData", rowData);
      fetch(`https://recruitment-tracker-backend.vercel.app/candidates/${rowData.cId}/history`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length) {
            const formattedData = data.map(item => ({
              ...item,
              uploadId: {
                ...item.uploadId,
                uploadDate: new Date(item.uploadId.uploadDate).toDateString(),
              },
            }));
            setHistoryData(formattedData);
            console.log("Formatted data", formattedData);
          } 
        })
        .catch((error) => {
          console.error('Error fetching history data:', error);
        });
    }
    }, [rowData]);
    const columns = useMemo(() => {
    const dynamicColumns = [
      {
        header: 'Upload Date',
        accessorKey: 'uploadId.uploadDate',
      },
      {
        header: 'Changes',
        accessorKey: 'changes',
        columns: [],
      },
    ];
    const uniqueFields = [];
    historyData.forEach(item => {
      item.changes.forEach(change => {
        if (!uniqueFields.includes(change.field)) {
          uniqueFields.push(change.field);
        }
      });
    });
    uniqueFields.forEach(field => {
      dynamicColumns[1].columns.push({
        header: field,
        accessorKey: field,
        cell: ({ row }) => {
          const change = row.original.changes.find(change => change.field === field);
          return change ? `${change.oldValue} => ${change.newValue}` : '';
        },
      });
    });
    return dynamicColumns;
  },[historyData]);
  const table = useReactTable({
    data: historyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="history-container">
      <h4>Candidate History for {fullName}</h4>
      <table className="history-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th colSpan={header.colSpan} key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getCoreRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default History;
