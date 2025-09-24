import React, { useState, useEffect } from 'react';
import type { Customer } from './Dashboard';

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
  const [showPassword, setShowPassword] = useState(false);

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
    if (isDuplicateCustomer(email) && mode === 'add') {
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
    } else {
      alert("Please enter a valid email address.");
    }
    return false;
  };

  return (
    // Start of form card
    <div className="card mt-4">
      {/*  Card Header */}
      <div className="card-header">
        <h5 className="mb-0">{mode === 'add' ? 'Add New Customer' : 'Update Customer'}</h5>
      </div>
      {/* Card Body */}
      <div className="card-body">
        <form onSubmit={handleSave} data-testid='customer-form'>
          <div className="row">
            {/* Name Label & Input */}
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
            {/* Email Label & Input */}
            <div className="col-md-4 mb-3">
              <label htmlFor="customerEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="customerEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
            {/* Password Label & Input */}
            <div className="col-md-4 mb-3">
              <label htmlFor="customerPassword" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="customerPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  minLength={1}
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(v => !v)} title={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? (
                    // eye-slash SVG
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M13.359 11.238l2.147 2.147a.5.5 0 0 1-.708.708l-2.147-2.147A7.027 7.027 0 0 1 8 13c-3.468 0-6.432-2.44-7.781-5.5a.5.5 0 0 1 0-.5A13.133 13.133 0 0 1 3.07 3.07L.854.854a.5.5 0 1 1 .708-.708l14 14a.5.5 0 0 1-.708.708l-2.147-2.147zm-1.06-1.06l-1.06-1.06A3 3 0 0 0 8 5a3 3 0 0 0-2.239 4.938l-1.06-1.06A4.978 4.978 0 0 1 8 4c2.21 0 4.21 1.343 5.359 3.238a.5.5 0 0 1 0 .524A12.978 12.978 0 0 1 12.3 10.177z"/></svg>
                  ) : (
                    // eye SVG
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
                  )}
                </span>
              </div>
            </div>
          </div>
          {/* Buttons: Save, Delete (if update), Cancel */}
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