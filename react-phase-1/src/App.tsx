import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';

export interface Customer {
  id: number;
  name: string;
  email: string;
  password: string;
}

function App() {

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

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:4000/customers');
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
    setRecordIsUpdated(false);
  }, [recordIsUpdated]);

  const handleAdd = () => {
    setSelectedRecordId(NO_SELECTION);
    setIsAddMode(true);
  };

  const handleSave = async (customer: Omit<Customer, 'id'>) => {
    try {
      if (isAddMode) {
        if (!customer.name || !customer.email || !customer.password) {
          alert("Please fill in all fields.");
          return;
        }
        
        // POST request for new customer
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
        
        setIsAddMode(false);
        setSelectedRecordId(NO_SELECTION);
        
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
        
        
        setSelectedRecordId(NO_SELECTION);
        setIsAddMode(false);
        
        // Refresh data after delete
        setRecordIsUpdated(true);
        console.log("no selection value" + NO_SELECTION)
        console.log("length of the erray" + records.length)

      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Please check the server connection.');
    }
  };

  const handleCancel = () => {
    setSelectedRecordId(NO_SELECTION);
    setIsAddMode(false);
  };

  const selectedCustomer = records.find(c => c.id === selectedRecordId);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4"></div>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Customer Database</h5>
              <div id="control-button-div" className='d-flex gap-2'>
                <button 
                  id="add-button" 
                  className={`btn ${selectedRecordId !== NO_SELECTION ? 'btn-outline-primary' : 'btn-primary'}`}
                  disabled={selectedRecordId !== NO_SELECTION}
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="card-body p-0">
  
              <div className="table-responsive" id='customer-table'>
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
          {(selectedRecordId !== NO_SELECTION || isAddMode) && (
            <CustomerForm
              mode={isAddMode ? 'add' : 'update'}
              customer={isAddMode ? undefined : selectedCustomer}
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

export default App
