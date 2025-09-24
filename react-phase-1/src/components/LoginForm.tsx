import React, { useState } from 'react';
import logo from '../assets/team_crochet_logo.png'; 


interface LoginFormProps {
  onLogin: (x: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error message state, to store type of error encountered

  // Hardcoded credentials for demo purposes, will be replaced with real auth later
  const VALID_EMAIL = 'admin@example.com';
  const VALID_PASSWORD = 'password123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setError('');
      onLogin(true); // Call the parent's (App.tsx) onLogin function to change state
    } else {
      // Set error message for invalid credentials
      setError('Invalid email or password');
    }
  };

  return (
    <div className="card mt-4" style={{ maxWidth: 400, margin: '0 auto' }}>
      <div className="card-header">
        <h5 className="mb-0">Login</h5>
      </div>
      <div className="card-body">
        {/* Error Alert */}
        {/* If there's an error, show a bootstrap alert */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} data-testid="login-form">
          <div className="mb-3 text-center">
            <img src={logo} alt="Team Crochet Logo" className="img-fluid mb-3" style={{ maxWidth: 100, display: 'inline-block' }} />
          </div>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        
        {/* Demo credentials */}
        <div className="text-center mt-3">
          <small className="text-muted">
            Demo: admin@example.com / password123
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
