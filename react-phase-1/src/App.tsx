import { useState } from 'react'
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

  const [showPasswords, setShowPasswords] = useState(false);

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
            <div className="card-header">
              <h5 className="mb-0">Customer Database</h5>
              <div>
                <button id="add-button" className="btn btn-primary">Add</button>
                <button id="update-button" className="btn btn-secondary">Update</button>
                <button id="delete-button" className="btn btn-danger">Delete</button>
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
                      <tr key={customer.id}>
                        <th scope="row">{customer.id}</th>
                        <td>
                          <strong>{customer.name}</strong>
                        </td>
                        <td>
                          <span className="text-muted">{customer.email}</span>
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

        </div>
      </div>
    </div>
  )
}

export default App
