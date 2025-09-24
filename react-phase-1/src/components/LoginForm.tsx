import React, { useState } from 'react';
import logo from '../assets/team_crochet_logo.png'; 


interface LoginFormProps {
  onLogin: (x: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="loginPassword"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
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
