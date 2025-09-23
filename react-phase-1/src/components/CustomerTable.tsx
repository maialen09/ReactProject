import React from 'react';
import type { Customer } from '../App';
import './CustomerTable.css';

interface CustomerTableProps {
  customers: Customer[];
  selectedId: number;
  onRowClick: (id: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, selectedId, onRowClick }) => {
  return (
    <table className="table table-striped table-hover mb-0 table-fixed-header">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr
            key={customer.id}
            className={customer.id === selectedId ? 'selected' : ''}
            onClick={() => onRowClick(customer.id)}
            style={{ cursor: 'pointer', fontWeight: selectedId === customer.id ? 'bold' : 'normal' }}
          >
            <th scope="row">{customer.id}</th>
            <td><span>{customer.name}</span></td>
            <td><span>{customer.email}</span></td>
            <td><span>{customer.password}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
