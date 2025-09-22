import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { getAll, deleteById, post, put } from './data/memdb.js'
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
  const [records, setRecords] = useState(getAll());
  console.log("Records:", records);
  const NO_SELECTION = records.length > 0 ? Math.min(...records.map(c => c.id)) - 1 : -1;
  const [selectedRecordId, setSelectedRecordId] = useState(NO_SELECTION);
  const [isAddMode, setIsAddMode] = useState(false);
  //const NO_SELECTION = records.length > 0 ? Math.min(...records.map(c => c.id)) - 1 : -1;

  useEffect(() => {
    setRecordIsUpdated(false);
    setRecords(getAll());
  }, [records, recordIsUpdated]);

  const handleTableSelect = (id: number) => {
    setSelectedRecordId(id);
    setIsAddMode(false);
  };

  const handleAdd = () => {
    setSelectedRecordId(NO_SELECTION);
    setIsAddMode(true);
  };

  const handleSave = (customer: Omit<Customer, 'id'>) => {
    if (isAddMode) {
      if (!customer.name || !customer.email || !customer.password) {
        alert("Please fill in all fields.");
        return;
      }
      post(customer);
      setRecords(getAll());
      setIsAddMode(false);
      setSelectedRecordId(NO_SELECTION);
      
    } else if (selectedRecordId !== NO_SELECTION) {
      put(selectedRecordId, { id: selectedRecordId, ...customer });
      setRecords(getAll());
      // Keep selection on updated record
      setSelectedRecordId(selectedRecordId);
      setRecordIsUpdated(true);
      console.log("Updated record:", records); 
    }
  };

  const handleDelete = () => {
    if (selectedRecordId !== NO_SELECTION) {
      deleteById(selectedRecordId);
      setRecords(getAll());
      setSelectedRecordId(NO_SELECTION);
      setIsAddMode(false);
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
              <div className="table-responsive">
                <CustomerTable
                  customers={records}
                  selectedId={selectedRecordId}
                  onRowClick={(id) => {
                    setSelectedRecordId(id);
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
