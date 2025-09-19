import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
}

function App() {
  // Hard-coded customers list
  const customers: Customer[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      password: "password123"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      password: "securepass456"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      password: "mypassword789"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      password: "strongpass321"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      password: "userpass654"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      password: "password987"
    }
  ];

  // For storing the record data
  const [records, setRecords] = useState(customers);
  // For storing the selected record id
  const [selectedRecordId, setSelectedRecordId] = useState(0);
  
  // Add mode state
  const [isAddMode, setIsAddMode] = useState(false);
  
  // Form state variables
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  
  // Get selected customer data
  const selectedCustomer = customers.find(customer => customer.id === selectedRecordId);
  
  // Update form when selection changes
  useEffect(() => {
    if (isAddMode) {
      // In add mode, keep form empty for new entry
      setFormName('');
      setFormEmail('');
      setFormPassword('');
    } else if (selectedCustomer) {
      setFormName(selectedCustomer.name);
      setFormEmail(selectedCustomer.email);
      setFormPassword(selectedCustomer.password);
    } else {
      setFormName('');
      setFormEmail('');
      setFormPassword('');
    }
  }, [selectedRecordId, isAddMode]);

  let handleRowClick = function(customerId: number){
    // If the customer is already selected, deselect
    if (selectedRecordId === customerId) {
      setSelectedRecordId(0); // Change state to 0
    } else {
      setSelectedRecordId(customerId); // Change state to the clicked customer ID
    }
    // Exit add mode when a record is clicked
    setIsAddMode(false);
  }

  // Add button handler
  const handleAdd = () => {
    setSelectedRecordId(0); // Clear any selection
    setIsAddMode(true); // Enter add mode
  };

  // Form button handlers
  const handleCancel = () => {
    setSelectedRecordId(0); // Deselect the record
    setIsAddMode(false); // Exit add mode
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Save clicked:', { formName, formEmail, formPassword });
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete clicked for ID:', selectedRecordId);
  };


  return (

    // Bootstrap container
    <div className="container mt-5">
      {/* Bootstrap row */}
      <div className="row">
        {/* Bootstrap row */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Customer Database</h5>
              <div id="control-button-div" className='d-flex gap-2'>
                <button 
                  id="add-button" 
                  className={`btn ${selectedRecordId !== 0 ? 'btn-outline-primary' : 'btn-primary'}`}
                  disabled={selectedRecordId !== 0}
                  onClick={handleAdd}
                >
                  Add
                </button>
                <button 
                  id="update-button" 
                  className={`btn ${selectedRecordId === 0 ? 'btn-outline-secondary' : 'btn-secondary'}`}
                  disabled={selectedRecordId === 0}
                >
                  Update
                </button>
                <button 
                  id="delete-button" 
                  className={`btn ${selectedRecordId === 0 ? 'btn-outline-danger' : 'btn-danger'}`}
                  disabled={selectedRecordId === 0}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
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
                      <tr key={customer.id}
                                  className={customer.id==selectedRecordId?"selected":""}
                                  onClick = {(_)=>handleRowClick(customer.id)} style={{ 
                          cursor: 'pointer',
                          fontWeight: selectedRecordId === customer.id ? 'bold' : 'normal'
                        }}>
                        <th scope="row">{customer.id}</th>
                        <td>
                          <span>{customer.name}</span>
                        </td>
                        <td>
                          <span>{customer.email}</span>
                        </td>
                        <td>
                          <span>
                            {customer.password}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add-Update Form Section */}
          {(selectedRecordId !== 0 || isAddMode) && (
            <div className="card mt-4">
              <div className="card-header">
                <h5 className="mb-0">
                  {isAddMode ? 'Add New Customer' : 'Update Customer'}
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="customerName" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="customerEmail" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="customerEmail"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="customerPassword" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="customerPassword"
                        value={formPassword}
                        onChange={(e) => setFormPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    {!isAddMode && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )


}



export default App
