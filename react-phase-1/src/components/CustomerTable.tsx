import React, { useState } from 'react';
import type { Customer } from './Dashboard';
import './CustomerTable.css';


interface CustomerTableProps {
  customers: Customer[];
  selectedId: number;
  onRowClick: (id: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, selectedId, onRowClick }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: number]: boolean }>({});

  const togglePassword = (id: number) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <table className="table table-striped table-hover mb-0 table-fixed-header">
      {/* Table Header */}
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {/* Render each customer row by mapping over the customers array and creating a table row for each customer */}
        {customers.map((customer) => (
          <tr
            key={customer.id}
            className={customer.id === selectedId ? 'selected' : ''}
            onClick={() => onRowClick(customer.id)}
            style={{ cursor: 'pointer', fontWeight: selectedId === customer.id ? 'bold' : 'normal' }}
          >
            <td>{customer.id}</td>
            <td><span>{customer.name}</span></td>
            <td><span>{customer.email}</span></td>
            <td style={{ userSelect: 'none' }}>
              <span
                style={{ marginRight: 8 }}
              >
                {visiblePasswords[customer.id] ? customer.password : '••••••••'}
              </span>
              <span
                onClick={e => { e.stopPropagation(); togglePassword(customer.id); }}
                style={{ cursor: 'pointer' }}
                title={visiblePasswords[customer.id] ? 'Hide password' : 'Show password'}
              >
                {visiblePasswords[customer.id] ? (
                  // eye-slash SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238l2.147 2.147a.5.5 0 0 1-.708.708l-2.147-2.147A7.027 7.027 0 0 1 8 13c-3.468 0-6.432-2.44-7.781-5.5a.5.5 0 0 1 0-.5A13.133 13.133 0 0 1 3.07 3.07L.854.854a.5.5 0 1 1 .708-.708l14 14a.5.5 0 0 1-.708.708l-2.147-2.147zm-1.06-1.06l-1.06-1.06A3 3 0 0 0 8 5a3 3 0 0 0-2.239 4.938l-1.06-1.06A4.978 4.978 0 0 1 8 4c2.21 0 4.21 1.343 5.359 3.238a.5.5 0 0 1 0 .524A12.978 12.978 0 0 1 12.3 10.177z"/></svg>
                ) : (
                  // eye SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
                )}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
