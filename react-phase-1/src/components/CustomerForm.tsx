import React, { useState, useEffect } from 'react';
import type { Customer } from '../App';

interface CustomerFormProps {
  mode: 'add' | 'update';
  customer?: Customer;
  customers: Customer[];
  onSave: (customer: Omit<Customer, 'id'>) => void;
  onDelete: () => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ mode, customer, customers, onSave, onDelete, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
//sets the form fields when the mode or customer changes
  useEffect(() => {
    if (mode === 'add') {
      setName('');
      setEmail('');
      setPassword('');
    } else if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPassword(customer.password);
    }
  }, [mode, customer]);

// Check for duplicate customer (by email)
  const isDuplicateCustomer = (email: string) => {
    return customers.some(
      c => c.email === email && (mode === 'add' || (customer && c.id !== customer.id))
    );
  };

//handles the save button click and checks the email before saving
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkEmail(email)) return;
    if (isDuplicateCustomer(email)) {
      alert('A customer with this email already exists.');
      return;
    }
    onSave({ name, email, password });
  };
  
  //check the email, to see if it is valid (means it contains @ and .)
  const checkEmail = (email: any) => {
    let mail = email as string;
    if (mail.includes('@') && mail.includes('.')) {
      return true;
    }else {
      alert("Please enter a valid email address."); 
    }
    return false;
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="mb-0">{mode === 'add' ? 'Add New Customer' : 'Update Customer'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSave} data-testid='customer-form'>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="customerName" className="form-label">Name</label>
              <input
          type="text"
          className="form-control"
          id="customerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter customer name"
          required
          minLength={1}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="customerEmail" className="form-label">Email</label>
              <input
          type="email"
          className="form-control"
          id="customerEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="customerPassword" className="form-label">Password</label>
              <input
          type="password"
          className="form-control"
          id="customerPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          minLength={1}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSave}>Save</button>
            {mode === 'update' && (
              <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
            )}
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;