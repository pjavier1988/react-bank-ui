import React, { useState } from 'react';
import useLoginForm from '../hooks/useLoginForm';

const Login = () => {
  const {
    username,
    password,
    handleChange,
    handleLogIn,
    successMessage,
    errors,
  } = useLoginForm((account) => {
    console.log('Form submitted:', account);
  });
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogIn}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
