import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'
import CustomerTable from './CustomerTable';
import CustomerForm from './CustomerForm';

export interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface DashboardFormProps {
  onLogin: (x: boolean) => void;
}

const Dashboard: React.FC<DashboardFormProps> = ({ onLogin }) => {

  //memdb data
  //var customers: Customer[] = getAll();
  // const NO_SELECTION = customers.length > 0 ? Math.min(...customers.map(c => c.id)) - 1 : -1;
  const [recordIsUpdated, setRecordIsUpdated] = useState(false);
  const [records, setRecords] = useState<Customer[]>([]);
  console.log("Records:", records);
  const NO_SELECTION = -1;
  const [selectedRecordId, setSelectedRecordId] = useState(NO_SELECTION);
  const [isAddMode, setIsAddMode] = useState(false);
  //const NO_SELECTION = records.length > 0 ? Math.min(...records.map(c => c.id)) - 1 : -1;



  // fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:4000/customers');
        const data = await response.json();
        // Update state with fetched data
        setRecords(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
    // Reset the recordIsUpdated flag after fetching so that future updates can trigger refetch
    setRecordIsUpdated(false);
  }, [recordIsUpdated]);

  // Handle Add Customer
  const handleAdd = () => {
    setSelectedRecordId(NO_SELECTION);
    setIsAddMode(true);
  };

  // Handle Save (for both Add and Update)
  const handleSave = async (customer: Omit<Customer, 'id'>) => {
    try {
      // Logic for adding a customer
      if (isAddMode) {
        if (!customer.name || !customer.email || !customer.password) {
          alert("Please fill in all fields.");
          return;
        }

        // POST request for adding a new customer
        const response = await fetch('http://localhost:4000/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Exit add mode and ensure no record is selected
        setIsAddMode(false);
        setSelectedRecordId(NO_SELECTION);

        // Logic for updating a customer
      } else if (selectedRecordId !== NO_SELECTION) {
        // PUT request for updating existing customer
        const response = await fetch(`http://localhost:4000/customers/${selectedRecordId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: selectedRecordId, ...customer }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Keep selection on updated record
        setSelectedRecordId(selectedRecordId);
        console.log("Updated customer with ID:", selectedRecordId);
      }

      // Refresh data after save
      setRecordIsUpdated(true);

    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Failed to save customer. Please check the server connection.');
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedRecordId !== NO_SELECTION) {
        // DELETE request to API
        const response = await fetch(`http://localhost:4000/customers/${selectedRecordId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Clear selection and ensure not in add mode
        setSelectedRecordId(NO_SELECTION);
        setIsAddMode(false);

        // Refresh data after delete
        setRecordIsUpdated(true);
        // console.log("no selection value" + NO_SELECTION)
        // console.log("length of the array" + records.length)

      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Please check the server connection.');
    }
  };

  // If the user clicks cancel, we clear the selection and exit add mode
  const handleCancel = () => {
    setSelectedRecordId(NO_SELECTION);
    setIsAddMode(false);
  };

  // Find the selected customer based on selectedRecordId
  const selectedCustomer = records.find(c => c.id === selectedRecordId);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4"></div>
          {/* If not in add mode and a record is selected, show a warning to clear selection before adding */}
          {!isAddMode && selectedRecordId !== NO_SELECTION && (
            <div className='error-message'>⚠️ Please remove the current selection to enable the add button</div>
          )}
          {/* Start of card holding customer table */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Customer List</h5>
              
              
              <div id="control-button-div" className='d-flex gap-2'>
                {/* Add Button */}
                <button
                  id="add-button"
                  className={`btn ${selectedRecordId !== NO_SELECTION ? 'btn-outline-primary' : 'btn-primary'}`}
                  disabled={selectedRecordId !== NO_SELECTION}
                  onClick={handleAdd}
                >
                  Add
                </button>
                {/* Logout Button */}
                <button
                  id="logout-button"
                  className="btn btn-danger"
                  onClick={() => onLogin(false)}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Body of card holding customer table */}
            <div className="card-body p-0">
              {/* Scrollable Table */}
              <div style={{ maxHeight: '300px', overflowY: 'auto' }} data-testid='customer-table'>
                <CustomerTable
                  customers={records}
                  selectedId={selectedRecordId}
                  onRowClick={(id) => {
                    // Toggle selection: if clicking on already selected row, deselect it
                    if (selectedRecordId === id) {
                      setSelectedRecordId(NO_SELECTION);
                    } else {
                      setSelectedRecordId(id);
                    }
                    setIsAddMode(false);
                  }}
                />
              </div>
            </div>
          </div>
          <br></br>
          {/* Display number of customers */}
          <p className="number-of-customers">Number of Customers: {records.length}</p>
          {/* Add/Update Form, shows if there is no selection and in add mode*/}
          {(selectedRecordId !== NO_SELECTION || isAddMode) && (
            <CustomerForm
              mode={isAddMode ? 'add' : 'update'}
              customer={isAddMode ? undefined : selectedCustomer}
              customers={records}
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
