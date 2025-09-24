import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import { useState } from 'react';

function App() {
  // State for logged in, determines if to show login form or dashboard
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // Logic for determining whether to show login or dashboard
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={(x: boolean) => setIsLoggedIn(x)} />
      ) : (
        <Dashboard onLogin={(x: boolean) => setIsLoggedIn(x)} />
      )}
    </div>
  )
}

export default App
